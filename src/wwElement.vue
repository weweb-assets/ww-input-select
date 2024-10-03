<template>
    <div class="ww-select">
        <wwElement class="ww-select__trigger" v-bind="content.trigger" />
        <div class="ww-select__dropdown">
            <wwElement v-bind="content.dropdown" v-if="isOpen" />
        </div>
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

        function toggleDropdown() {
            if (!isDisabled.value && !isReadonly.value) isOpen.value = !isOpen.value;
        }

        function openDropdown() {
            if (!isDisabled.value && !isReadonly.value) isOpen.value = true;
        }

        function closeDropdown() {
            if (!isDisabled.value && !isReadonly.value) isOpen.value = false;
        }

        const data = ref({
            selectValue: variableValue,
            selectValueDetails,
            selectType,
            isOpen,
            selectOptions: options,
        });

        const methods = {
            toggleDropdown: {
                description: 'Toggle the dropdown',
                method: toggleDropdown,
                editor: { label: 'Toggle', elementName: 'Select', icon: 'select' },
            },
            openDropdown: {
                description: 'Open the dropdown',
                method: openDropdown,
                editor: { label: 'Open', elementName: 'Select', icon: 'select' },
            },
            closeDropdown: {
                description: 'Close the dropdown',
                method: closeDropdown,
                editor: { label: 'Close', elementName: 'Select', icon: 'select' },
            },
        };

        watch(selectType, () => setValue(initValue.value));
        /* wwEditor:start */
        const forceOpenInEditor = computed(() => props.wwEditorState.sidepanelContent.forceOpenInEditor);
        watch(
            forceOpenInEditor,
            forceOpenInEditor => {
                if (forceOpenInEditor) openDropdown();
                else closeDropdown();
            },
            { immediate: true }
        );
        /* wwEditor:end */

        provide('_wwSelectType', selectType);
        provide('_wwSelectValue', variableValue);
        provide('_wwSelectSetValue', setValue);
        provide('_wwSelectIsDisabled', isDisabled);
        provide('_wwSelectIsReadonly', isReadonly);
        provide('_wwSelectCanUnselect', canUnselect);
        provide('_wwRegisterOption', registerOption);
        provide('_wwUnregisterOption', unregisterOption);
        provide('_wwSelectDropdownMethods', { closeDropdown });

        wwLib.wwElement.useRegisterElementLocalContext('select', data, methods);

        return { isOpen };
    },
};
</script>

<style lang="scss" scoped>
.ww-select {
    position: relative;
}

.ww-select__trigger {
}

.ww-select__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
}
</style>
