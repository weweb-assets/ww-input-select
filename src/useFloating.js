import { ref, computed, watch, provide, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useFloating, autoUpdate, flip, offset, shift } from '@floating-ui/vue';

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default function useDropdownFloating(triggerElement, dropdownElement) {
    const dropdownConfig = ref({});
    const virtualElement = ref(null);
    const lastKnownRect = ref(null);

    const placement = computed(() => {
        const { side = 'bottom', align = 'start' } = dropdownConfig.value;
        return `${side}-${align}`;
    });

    const middleware = computed(() => [
        offset({
            mainAxis: parseFloat(dropdownConfig.value.offsetY) || 0,
            crossAxis: parseFloat(dropdownConfig.value.offsetX) || 0,
        }),
        flip({ padding: 16 }),
        shift({ padding: parseFloat(dropdownConfig.value.boundOffset) || 0 }),
    ]);

    const updateVirtualElement = () => {
        if (triggerElement.value) {
            const rect = triggerElement.value.getBoundingClientRect();
            virtualElement.value = {
                getBoundingClientRect() {
                    return rect;
                },
                contextElement: triggerElement.value,
            };
            lastKnownRect.value = rect;
        }
    };

    const { floatingStyles, update } = useFloating(virtualElement, dropdownElement, {
        placement,
        middleware,
        strategy: 'fixed',
    });

    function updateDropdownConfig(config) {
        dropdownConfig.value = config;
    }

    const syncFloating = debounce(() => {
        updateVirtualElement();
        update();
    }, 16); // roughly 60fps

    const cleanup = ref(null);
    const resizeObserver = ref(null);
    const mutationObserver = ref(null);
    const parentMutationObserver = ref(null);
    const intervalCheck = ref(null);

    const checkForChanges = () => {
        if (triggerElement.value) {
            const newRect = triggerElement.value.getBoundingClientRect();
            if (
                !lastKnownRect.value ||
                newRect.top !== lastKnownRect.value.top ||
                newRect.left !== lastKnownRect.value.left ||
                newRect.width !== lastKnownRect.value.width ||
                newRect.height !== lastKnownRect.value.height
            ) {
                syncFloating();
            }
        }
    };

    const observeReferenceElement = () => {
        if (!triggerElement.value) return;

        resizeObserver.value = new ResizeObserver(syncFloating);
        resizeObserver.value.observe(triggerElement.value);

        mutationObserver.value = new MutationObserver(syncFloating);
        mutationObserver.value.observe(triggerElement.value, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        });

        if (triggerElement.value.parentElement) {
            parentMutationObserver.value = new MutationObserver(() => {
                syncFloating();
                checkForChanges();
            });
            parentMutationObserver.value.observe(triggerElement.value.parentElement, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            });
        }

        /* wwEditor:start */
        wwLib.getEditorWindow().addEventListener('scroll', syncFloating, true);
        wwLib.getEditorWindow().addEventListener('resize', syncFloating);
        /* wwEditor:end */
        /* wwFront:start */
        wwLib.getFrontWindow().addEventListener('scroll', syncFloating, true);
        wwLib.getFrontWindow().addEventListener('resize', syncFloating);
        /* wwFront:end */

        intervalCheck.value = setInterval(checkForChanges, 500); // TODO find a better way to check for changes

        syncFloating();
    };

    onMounted(() => {
        updateVirtualElement();
        cleanup.value = autoUpdate(triggerElement.value, dropdownElement.value, syncFloating);
        observeReferenceElement();

        nextTick(syncFloating);
    });

    onBeforeUnmount(() => {
        if (cleanup.value) cleanup.value();
        if (resizeObserver.value) resizeObserver.value.disconnect();
        if (mutationObserver.value) mutationObserver.value.disconnect();
        if (parentMutationObserver.value) parentMutationObserver.value.disconnect();
        if (intervalCheck.value) clearInterval(intervalCheck.value);

        /* wwEditor:start */
        wwLib.getEditorWindow().removeEventListener('scroll', syncFloating, true);
        wwLib.getEditorWindow().removeEventListener('resize', syncFloating);
        /* wwEditor:end */
        /* wwFront:start */
        wwLib.getFrontWindow().removeEventListener('scroll', syncFloating, true);
        wwLib.getFrontWindow().removeEventListener('resize', syncFloating);
        /* wwFront:end */
    });

    watch(dropdownConfig, syncFloating, { deep: true, immediate: true });

    provide('_wwSelectUpdateDropdownConfig', updateDropdownConfig);

    return {
        floatingStyles,
        syncFloating,
    };
}
