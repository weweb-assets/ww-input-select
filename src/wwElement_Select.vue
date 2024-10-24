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
import { ref, computed, provide, watch, nextTick, onMounted } from 'vue';
import useDropdownFloating from './useFloating';
import useAccessibility from './useAccessibility';
import useSearch from './useSearch';

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

        const options = ref([]);
        const isOpen = ref(false);
        const rawData = computed(() => props.content.choices || []);
        const isDisabled = computed(() => props.content.disabled || false);
        const isReadonly = computed(() => props.content.readonly || false);
        const canUnselect = computed(() => props.content.canUnselect || false);
        const optionsFilter = ref(null);

        const updateFilter = filter => {
            optionsFilter.value = filter;
        };

        const registerOption = option => {
            if (option.value) options.value.push(option);
        };
        const unregisterOption = option => {
            options.value = options.value.filter(opt => opt.value !== option.value);
        };

        const updateValue = value => {
            if (selectType.value === 'single') {
                setValue(value);
            } else {
                const currentValue = Array.isArray(variableValue.value) ? [...variableValue.value] : [];
                const valueIndex = currentValue.indexOf(value);

                if (valueIndex === -1 && currentValue.length < (props.content.limit || 0)) currentValue.push(value);
                else currentValue.splice(valueIndex, 1);

                setValue(currentValue);
            }

            if (props.content.closeOnSelect) closeDropdown();
        };

        function openDropdown() {
            if (isDisabled.value || isReadonly.value) return;

            isOpen.value = true;
            nextTick(() => {
                syncFloating();
            });
        }

        function closeDropdown() {
            if (isDisabled.value || isReadonly.value) return;

            resetSearch();
            resetFocus();
            isOpen.value = false;
        }

        function toggleDropdown() {
            if (isOpen.value) closeDropdown();
            else openDropdown();
        }

        const { dropdownId, handleTriggerKeydown, activeDescendant, resetFocus } = useAccessibility({
            options,
            isOpen,
            methods: { openDropdown, closeDropdown, toggleDropdown, updateValue },
        });

        const { hasSearch, updateHasSearch, updateSearchElement, resetSearch } = useSearch();

        const selectValueDetails = computed(() => {
            if (selectType.value === 'single') {
                return options.value.find(option => option.value === variableValue.value) || variableValue.value;
            } else {
                const selectedValues = Array.isArray(variableValue.value) ? variableValue.value : [];
                return options.value.filter(option => selectedValues.includes(option.value)) || variableValue.value;
            }
        });

        const mergedOptions = computed(() => {
            return (rawData.value || []).map((item, index) => {
                return { ...item, wewebOption: options.value[index] };
            });
        });

        const data = ref({
            options: mergedOptions,
            value: variableValue,
            valueDetails: selectValueDetails,
            type: selectType,
            isOpen,
            search: {
                hasSearch,
                filter: optionsFilter.value,
            },
        });

        const methods = {
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
            toggleDropdown: {
                description: 'Toggle the dropdown',
                method: toggleDropdown,
                editor: { label: 'Toggle', elementName: 'Select', icon: 'select' },
            },
            resetSearch: {
                description: 'Reset the search input value',
                method: resetSearch,
                editor: { label: 'Reset search', elementName: 'Select search', icon: 'select' },
            },
        };

        watch(selectType, () => setValue(initValue.value));
        watch(
            props.content,
            () => {
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

        provide('_wwSelectOptions', mergedOptions);
        provide('_wwSelectType', selectType);
        provide('_wwSelectValue', variableValue);
        provide('_wwSelectSetValue', setValue);
        provide('_wwSelectIsDisabled', isDisabled);
        provide('_wwSelectIsReadonly', isReadonly);
        provide('_wwSelectCanUnselect', canUnselect);
        provide('_wwSelectOptionsFilter', optionsFilter);
        provide('_wwSelectUpdateValue', updateValue);
        provide('_wwSelectUpdateFilter', updateFilter);
        provide('_wwRegisterOption', registerOption);
        provide('_wwUnregisterOption', unregisterOption);
        provide('_wwSelectDropdownMethods', { closeDropdown });
        provide('_wwSelectUseSearch', { updateHasSearch, updateSearchElement });

        wwLib.wwElement.useRegisterElementLocalContext('select', data, methods);

        onMounted(() => {
            nextTick(() => {
                syncFloating();
            });
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
            isDisabled,
            selectType,
            handleTriggerKeydown,
        };
    },
};
</script>
