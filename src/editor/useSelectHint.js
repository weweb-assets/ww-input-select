import { reactive, computed, watch, provide } from 'vue';

export default function useRadiogroupHint(emit) {
    const radioValues = reactive({});

    function registerItem(id, refValue) {
        radioValues[id] = refValue;
    }

    function unregisterItem(id) {
        delete radioValues[id];
    }

    const duplicateIds = computed(() => {
        const ids = [];

        for (const id of Object.keys(radioValues)) {
            if (Object.entries(radioValues).some(([key, value]) => key !== id && value === radioValues[id])) {
                ids.push(id);
            }
        }

        return ids;
    });

    const hasDuplicateValues = computed(() => duplicateIds.value.length > 0);

    watch(
        hasDuplicateValues,
        hasDuplicate => {
            emit('update:sidepanel-content', {
                path: 'hasDuplicateValues',
                value: hasDuplicate,
            });
        },
        { immediate: true }
    );

    provide('_wwRadiogroupDuplicateIds', duplicateIds);
    provide('_wwRadiogroupDebugMethods', { registerItem, unregisterItem });

    return {};
}
