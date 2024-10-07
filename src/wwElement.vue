<template>
    <div class="ww-select" :key="componentKey">
        <div
            class="ww-select__trigger"
            ref="triggerElement"
            @click="toggleDropdown"
            @keydown="handleTriggerKeydown"
            role="combobox"
            :aria-haspopup="selectType === 'single' ? 'listbox' : 'true'"
            :aria-expanded="isOpen"
            :aria-controls="dropdownId"
            :aria-activedescendant="activeDescendant"
            :tabindex="isDisabled ? -1 : 0"
            :aria-disabled="isDisabled"
        >
            <wwElement v-bind="content.trigger" />
        </div>
        <div
            class="ww-select__dropdown"
            ref="dropdownElement"
            :style="floatingStyles"
            v-show="isOpen"
            :id="dropdownId"
            :role="selectType === 'single' ? 'listbox' : 'group'"
            :aria-multiselectable="selectType === 'multiple'"
            :aria-label="'Select options'"
        >
            <wwElement v-bind="content.dropdown" />
        </div>
    </div>
</template>

<script>
import { ref, computed, provide, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import useDropdownFloating from './useFloating';
import useAccessibility from './useAccessibility';

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
        const componentKey = ref(0);

        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const triggerElement = ref(null);
        const dropdownElement = ref(null);
        const { floatingStyles, syncFloating } = useDropdownFloating(triggerElement, dropdownElement);

        const selectType = computed(() => props.content.selectType);
        const initValue = computed(() =>
            selectType.value === 'single' ? props.content.initValueSingle || null : props.content.initValueMulti || []
        );

        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: initValue,
        });

        const isOpen = ref(false);
        const choices = computed(() => props.content.choices);
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
            if (!isDisabled.value && !isReadonly.value) {
                isOpen.value = true;
                nextTick(() => {
                    syncFloating();
                });
            }
        }

        function closeDropdown() {
            if (!isDisabled.value && !isReadonly.value) {
                isOpen.value = false;
                resetFocus();
            }
        }

        const { dropdownId, handleTriggerKeydown, activeDescendant, resetFocus } = useAccessibility({
            options,
            isOpen,
            toggleDropdown,
            openDropdown,
            closeDropdown,
        });

        const data = ref({
            choices,
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
        watch(
            props.content,
            () => {
                componentKey.value++;
                nextTick(() => {
                    syncFloating();
                });
            },
            { deep: true }
        );
        watch(isOpen, newValue => {
            if (newValue) {
                nextTick(() => {
                    syncFloating();
                });
            }
        });
        watch(
            variableValue,
            () => {
                componentKey.value++;
                nextTick(() => {
                    syncFloating();
                });
            },
            { deep: true }
        );

        const forceOpenInEditor = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.sidepanelContent.forceOpenInEditor;
            /* wwEditor:end */
            return false;
        });

        /* wwEditor:start */
        watch(isEditing, () => {
            componentKey.value++;
            nextTick(() => {
                syncFloating();
            });
        });
        watch(
            forceOpenInEditor,
            forceOpenInEditor => {
                if (forceOpenInEditor) openDropdown();
                else closeDropdown();
            },
            { immediate: true }
        );
        /* wwEditor:end */

        const initialState = computed(() => props.content.initialState);
        watch(
            initialState,
            () => {
                if (initialState.value && initialState.value === 'open') openDropdown();
                else if (!forceOpenInEditor.value) closeDropdown();
            },
            { immediate: true }
        );

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

        onMounted(() => {
            nextTick(() => {
                syncFloating();
            });
        });

        onBeforeUnmount(() => {
            // Any cleanup if needed
        });

        return {
            componentKey,
            isEditing,
            isOpen,
            triggerElement,
            dropdownElement,
            floatingStyles,
            dropdownId,
            activeDescendant,
            handleTriggerKeydown,
            isDisabled,
            selectType,
        };
    },
};
</script>
