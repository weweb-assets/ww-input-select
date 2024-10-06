import { ref, computed, watch, provide } from 'vue';
import { useFloating, autoUpdate, flip, offset, shift } from '@floating-ui/vue';

export default function useDropdownFloating(reference, floating) {
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

    const { floatingStyles, update } = useFloating(reference, floating, {
        placement,
        middleware,
        whileElementsMounted: autoUpdate,
        strategy: 'fixed',
    });

    watch(dropdownConfig, () => update, { deep: true, immediate: true });

    function updateDropdownConfig(config) {
        dropdownConfig.value = config;
    }

    provide('_wwSelectUpdateDropdownConfig', updateDropdownConfig);

    watch(floatingStyles, styles => {
        console.log('styles', styles);
    });

    return {
        floatingStyles,
        syncFloating: update,
    };
}
