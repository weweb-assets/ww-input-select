import { ref, computed, watch, provide, onMounted, onBeforeUnmount } from 'vue';
import { useFloating, autoUpdate, flip, offset, shift } from '@floating-ui/vue';

export default function useDropdownFloating(triggerElement, dropdownElement) {
    const dropdownConfig = ref({});
    const virtualElement = ref(null);

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
        }
    };

    const { floatingStyles, update } = useFloating(virtualElement, dropdownElement, {
        placement,
        middleware,
        strategy: 'fixed',
    });

    const cleanup = ref(null);

    onMounted(() => {
        updateVirtualElement();
        cleanup.value = autoUpdate(triggerElement.value, dropdownElement.value, () => {
            updateVirtualElement();
            update();
        });
    });

    onBeforeUnmount(() => {
        if (cleanup.value) {
            cleanup.value();
        }
    });

    watch(dropdownConfig, () => update(), { deep: true, immediate: true });

    function updateDropdownConfig(config) {
        dropdownConfig.value = config;
    }

    function syncFloating() {
        updateVirtualElement();
        update();
    }

    provide('_wwSelectUpdateDropdownConfig', updateDropdownConfig);

    return {
        floatingStyles,
        syncFloating,
    };
}
