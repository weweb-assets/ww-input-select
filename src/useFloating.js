import { ref, computed, watch, provide, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useFloating, autoUpdate, flip, offset, shift } from '@floating-ui/vue';

export default function useDropdownFloating(triggerElement, dropdownElement) {
    const dropdownConfig = ref({});

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

    const { floatingStyles, update } = useFloating(triggerElement, dropdownElement, {
        placement,
        middleware,
        strategy: 'fixed',
    });

    function updateDropdownConfig(config) {
        console.log('updateDropdownConfig', config);
        dropdownConfig.value = config;
    }

    watch(dropdownConfig, update, { deep: true, immediate: true });

    provide('_wwSelect:updateDropdownConfig', updateDropdownConfig);

    let cleanup = null;
    let resizeObserver = null;
    let mutationObserver = null;

    const syncFloating = () => {
        nextTick(() => {
            if (triggerElement.value && dropdownElement.value) update();
        });
    };

    onMounted(() => {
        if (triggerElement.value && dropdownElement.value) {
            cleanup = autoUpdate(triggerElement.value, dropdownElement.value, syncFloating);

            resizeObserver = new ResizeObserver(syncFloating);
            resizeObserver.observe(triggerElement.value);

            mutationObserver = new MutationObserver(syncFloating);
            mutationObserver.observe(triggerElement.value, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            });
        }
    });

    onBeforeUnmount(() => {
        if (cleanup) cleanup();
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
        if (mutationObserver) {
            mutationObserver.disconnect();
        }
    });

    return {
        floatingStyles,
        syncFloating,
    };
}
