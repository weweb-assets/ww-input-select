<template>
    <div class="ww-select">
        <wwLayout class="ww-select__trigger" path="_trigger" />
        <wwLayout class="ww-select__dropdown" path="_dropdown" />
    </div>
</template>

<script>
import { ref, computed, provide, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    setup(props) {
        const selectType = computed(() => props.content.selectType);
        const initValue = computed(() =>
            selectType.value === 'single' ? props.content.initValueSingle || null : props.content.initValueMulti || []
        );

        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: initValue,
        });

        const isOpen = ref(true);
        const isDisabled = computed(() => props.content.disabled);
        const isReadonly = computed(() => props.content.readonly);
        const canUnselect = computed(() => props.content.canUnselect);
        const options = ref([]);

        const registerOption = option => options.value.push(option);
        const unregisterOption = optionValue => {
            options.value = options.value.filter(opt => opt.value !== optionValue);
        };

        const selectValueDetails = computed(() => {
            if (selectType.value === 'single') {
                return options.value.find(option => option.value === variableValue.value) || null;
            } else {
                const selectedValues = Array.isArray(variableValue.value) ? variableValue.value : [];
                return options.value.filter(option => selectedValues.includes(option.value));
            }
        });

        const data = ref({
            selectValue: variableValue,
            selectValueDetails,
            selectType,
            isOpen,
            selectOptions: options,
        });

        const toggleDropdown = () => {
            if (!isDisabled.value && !isReadonly.value) isOpen.value = !isOpen.value;
        };

        watch(selectType, () => setValue(initValue.value));

        provide('_wwSelectType', selectType);
        provide('_wwSelectValue', variableValue);
        provide('_wwSelectSetValue', setValue);
        provide('_wwSelectIsDisabled', isDisabled);
        provide('_wwSelectIsReadonly', isReadonly);
        provide('_wwSelectCanUnselect', canUnselect);
        provide('_wwRegisterOption', registerOption);
        provide('_wwUnregisterOption', unregisterOption);

        wwLib.wwElement.useRegisterElementLocalContext('select', data, {});

        return { toggleDropdown };
    },
};
</script>

<style lang="scss" scoped>
.ww-select {
    position: relative;
    // Add more styles as needed
}

.ww-select__trigger {
    cursor: pointer;
    // Add more styles as needed
}

.ww-select__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    // Add more styles as needed
}
</style>
