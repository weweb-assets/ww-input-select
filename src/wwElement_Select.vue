<template>
    <div class="ww-select" :key="componentKey" data-ww-flag="ww-select">
        <div
            class="ww-select__trigger"
            ref="triggerElement"
            @click="toggleDropdown"
            @keydown="handleKeydown"
            role="combobox"
            :aria-haspopup="selectType === 'single' ? 'listbox' : 'true'"
            :aria-expanded="isOpen"
            :aria-controls="dropdownId"
            :aria-activedescendant="activeDescendant"
            :tabindex="isDisabled ? -1 : 0"
            :aria-disabled="isDisabled"
        >
            <SelectTriger :content="content" />
        </div>
        <div
            class="ww-select__dropdown"
            ref="dropdownElement"
            :style="[floatingStyles, dropdownStyles]"
            v-show="isOpen"
            :id="dropdownId"
            :role="selectType === 'single' ? 'listbox' : 'group'"
            :aria-multiselectable="selectType === 'multiple'"
            :aria-label="'Select options'"
            inherit-component-style
        >
            <SelectDropdown :content="content" :wwEditorState="wwEditorState">
                <SelectSearch v-if="showSearch" :content="content" :wwEditorState="wwEditorState" />
                <!-- List mode -->
                <SelectOptionList :content="content" :wwEditorState="wwEditorState" />
            </SelectDropdown>
        </div>

        <input type="input" :name="content.fieldName" :value="variableValue" :required="content.required" tabindex="-1" class="fake-input"/>
    </div>
</template>

<script>
import InputSelectTrigger from './wwElement_Trigger.vue';
import InputSelectDropdown from './wwElement_Dropdown.vue';
import InputSelectOption from './wwElement_Option.vue';
import InputSelectOptionList from './wwElement_OptionsList.vue';
import InputSelectSearch from './wwElement_Search.vue';
import { ref, computed, provide, watch, inject, nextTick, onMounted, onBeforeUnmount } from 'vue';
import useDropdownFloating from './select/useFloating';
import useAccessibility from './select/useAccessibility';
import useSearch from './select/useSearch';
import { debounce } from './utils';
/* wwEditor:start */
import useEditorHint from './editor/useEditorHint';
/* wwEditor:end */

export default {
    components: {
        SelectTriger: InputSelectTrigger,
        SelectDropdown: InputSelectDropdown,
        SelectOption: InputSelectOption,
        SelectOptionList: InputSelectOptionList,
        SelectSearch: InputSelectSearch,
    },
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        /* wwEditor:start */
        useEditorHint();
        /* wwEditor:end */
        /* wwEditor:start */
        const selectForm = inject('_wwForm:selectForm', () => {});
        /* wwEditor:end */

        const componentKey = ref(0);
        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });
        const forceOpenInEditor = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.sidepanelContent.forceOpenInEditor;
            /* wwEditor:end */
            return false;
        });

        const selectType = computed(() => props.content.selectType);
        const initValue = computed(() =>
            selectType.value === 'single' ? props.content.initValueSingle || null : props.content.initValueMulti || []
        );
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: selectType.value === 'single' ? 'any' : 'array',
            defaultValue: initValue,
        });

        const fieldName = computed(() => props.content.fieldName || props.wwElementState.name);
        const validation = computed(() => props.content.validation);
        const customValidation = computed(() => props.content.customValidation);

        const useForm = inject('_wwForm:useForm', () => {});
        useForm(
            variableValue,
            { fieldName, validation, customValidation },
            { elementState: props.wwElementState, emit, sidepanelFormPath: 'form' }
        );

        const triggerElement = ref(null);
        const dropdownElement = ref(null);
        const { floatingStyles, syncFloating } = useDropdownFloating(triggerElement, dropdownElement);
        const optionsMap = ref(new Map());
        const options = computed(() => Array.from(optionsMap.value.values()));
        const isOpen = ref(false);
        const rawData = computed(() => props.content.choices || []);
        const isDisabled = computed(() => props.content.disabled || false);
        const isReadonly = computed(() => props.content.readonly || false);
        const canUnselect = computed(() => props.content.unselectOnClick || false);
        const initialState = computed(() => props.content.initialState || 'closed');
        const closeOnClickOutside = computed(() => props.content.closeOnClickOutside || false);
        const manualToggle = computed(() => props.content.manualToggle || false);
        const searchState = ref(null);
        const optionProperties = ref({});
        const resizeObserver = ref(null);
        const triggerWidth = ref(0);
        const triggerHeight = ref(0);
        const shouldCloseDropdown = ref(true);
        const mappingLabel = computed(() => props.content.mappingLabel);
        const mappingValue = computed(() => props.content.mappingValue);
        const showSearch = computed(() => props.content.showSearch);

        const registerOption = (id, option) => {
            optionsMap.value.set(id, option);
        };

        const unregisterOption = id => {
            optionsMap.value.delete(id);
        };

        const registerOptionProperties = object => {
            if (object) optionProperties.value = object;
        };

        const updateSearch = filter => {
            searchState.value = filter;
        };

        const updateValue = value => {
            if (selectType.value === 'single') {
                setValue(value);
                emit('trigger-event', { name: 'change', event: { value } });
            } else {
                const currentValue = Array.isArray(variableValue.value) ? [...variableValue.value] : [];
                const valueIndex = currentValue.indexOf(value);

                if (valueIndex === -1) {
                    if (!props.content.limit || currentValue.length < props.content.limit) currentValue.push(value);
                } else {
                    currentValue.splice(valueIndex, 1);
                }

                setValue(currentValue);
                emit('trigger-event', { name: 'change', event: { value } });
            }

            if (props.content.closeOnSelect) closeDropdown();
        };

        function removeSpecificValue(valueToRemove) {
            if (selectType.value !== 'multiple') return;

            /* This is a workaround to prevent the dropdown from closing when removing a value.
             * The issue is that the click event that triggers this function also bubbles up
             * and triggers closeDropdown (through handleClickOutside).
             * Since we can't access the event object to call stopPropagation(),
             * we use this flag + timeout pattern to temporarily prevent the dropdown from closing.
             * If a better solution is found (like being able to pass the event), this should be refactored.
             */
            shouldCloseDropdown.value = false;

            const currentValue = Array.isArray(variableValue.value) ? [...variableValue.value] : [];
            const valueIndex = currentValue.indexOf(valueToRemove);

            if (valueIndex !== -1) {
                currentValue.splice(valueIndex, 1);
                setValue(currentValue);
            }

            setTimeout(() => {
                shouldCloseDropdown.value = true;
            }, 200);
        }

        const {
            hasSearch,
            updateHasSearch,
            updateSearchElement,
            resetSearch,
            autoFocusSearch,
            updateAutoFocusSearch,
            focusSearch,
        } = useSearch(searchState, {
            updateSearch,
        });

        function openDropdown() {
            if (isDisabled.value || isReadonly.value) return;

            isOpen.value = true;
            nextTick(syncFloating);
            if (autoFocusSearch.value) focusSearch();
        }

        function closeDropdown() {
            if (!shouldCloseDropdown.value) return;
            if (isDisabled.value || isReadonly.value) return;

            resetSearch();
            resetFocus();
            isOpen.value = false;
        }

        function toggleDropdown() {
            if (isEditing.value || manualToggle.value) return;
            if (isOpen.value) closeDropdown();
            else openDropdown();
        }

        function handleClickOutside(event) {
            if (
                closeOnClickOutside.value &&
                isOpen.value &&
                !triggerElement.value.contains(event.target) &&
                !dropdownElement.value.contains(event.target) &&
                !isEditing.value
            ) {
                closeDropdown();
            }
        }

        const { dropdownId, activeDescendant, handleKeydown, resetFocus, setInitialFocus } = useAccessibility({
            elementRef: triggerElement,
            options,
            isOpen,
            methods: { openDropdown, closeDropdown, toggleDropdown, updateValue },
        });

        function handleInitialFocus() {
            if (!variableValue.value) return;
            if (selectType.value === 'single') {
                setInitialFocus(variableValue.value);
            } else if (Array.isArray(variableValue.value) && variableValue.value.length) {
                setInitialFocus(variableValue.value[0]);
            }
        }

        const observeTriggerSize = () => {
            if (!triggerElement.value) return;

            if (resizeObserver.value) {
                resizeObserver.value.disconnect();
                resizeObserver.value = null;
            }

            resizeObserver.value = new ResizeObserver(
                debounce(entries => {
                    if (entries[0]) {
                        const rect = triggerElement.value.getBoundingClientRect();
                        triggerWidth.value = rect.width;
                        triggerHeight.value = rect.height;
                    }
                }, 16)
            );

            resizeObserver.value.observe(triggerElement.value);
        };

        const selectionDetails = computed(() => {
            const _optionsMap = new Map(rawData.value.map(({...option }) => [option.value, option])); // Hide optionId
            const obj = opt => ({
                value: opt.value,
                label: opt.label,
                disabled: opt.disabled || false,
                data: opt || {},
            });

            if (selectType.value === 'single') {
                const option = _optionsMap.get(variableValue.value);
                if (!option) return null;
                return obj(option);
            } else {
                const selectedValues = Array.isArray(variableValue.value) ? variableValue.value : [];
                return selectedValues.map(value => {
                    const option = _optionsMap.get(value);
                    if (!option)
                        return {
                            value,
                            isInOptions: false,
                            info: 'This value is not in the defined options',
                        };
                    return obj(option);
                });
            }
        });

        const _options = computed(() => options.value?.map(({ optionId, ...option }) => option) || ref([])); // Hide optionId

        const data = ref({
            options: _options,
            active: { value: variableValue, details: selectionDetails },
            utils: { type: selectType, isOpen, triggerWidth, triggerHeight },
        });

        const methods = {
            openDropdown: {
                method: openDropdown,
                /* wwEditor:start */
                editor: { label: 'Open', group: 'Select', description: 'Open the dropdown', icon: 'select' },
                /* wwEditor:end */
            },
            closeDropdown: {
                method: closeDropdown,
                /* wwEditor:start */
                editor: { label: 'Close', group: 'Select', description: 'Close the dropdown', icon: 'select' },
                /* wwEditor:end */
            },
            toggleDropdown: {
                method: toggleDropdown,
                /* wwEditor:start */
                editor: { label: 'Toggle', group: 'Select', description: 'Toggle the dropdown', icon: 'select' },
                /* wwEditor:end */
            },
            setValue: {
                method: updateValue,
                /* wwEditor:start */
                editor: {
                    label: 'Set value',
                    group: 'Select',
                    description: 'Set the value',
                    icon: 'select',
                    args: [
                        {
                            name: 'Value',
                            type: 'any',
                            required: true,
                        },
                    ],
                },
                /* wwEditor:end */
            },
            resetValue: {
                method: () => setValue(initValue.value || null),
                /* wwEditor:start */
                editor: { label: 'Reset value', group: 'Select', description: 'Reset the value', icon: 'select' },
                /* wwEditor:end */
            },
            removeSpecificValue: {
                method: removeSpecificValue,
                /* wwEditor:start */
                editor: {
                    label: 'Remove specific value',
                    keywords: ['Multiple'],
                    group: 'Select',
                    description: 'Remove a specific value from the multiple select',
                    icon: 'select',
                    args: [
                        {
                            name: 'Value to remove',
                            type: 'any',
                            required: true,
                        },
                    ],
                },
                /* wwEditor:end */
            },
            resetSearch: {
                method: resetSearch,
                /* wwEditor:start */
                editor: {
                    label: 'Reset search',
                    group: 'Select search',
                    description: 'Reset the search input value',
                    icon: 'select',
                },
                /* wwEditor:end */
            },
        };

        watch(
            hasSearch,
            newHasSearch => {
                if (newHasSearch) {
                    data.value.search = {
                        value: computed(() => searchState.value?.value || ''),
                        searchBy: computed(() => searchState.value?.searchBy || []),
                        searchMatches: computed(() => searchState.value?.searchMatches || []),
                    };
                } else {
                    delete data.value.search;
                }
            },
            { immediate: true }
        );

        watch(showSearch, () => {
            updateHasSearch(showSearch);
        });

        watch(isOpen, () => {
            nextTick(syncFloating);
            handleInitialFocus();
        });

        watch(
            variableValue,
            () => {
                nextTick(syncFloating);
            },
            { deep: true }
        );

        watch(
            [initValue, selectType],
            () => {
                if (initValue.value || (Array.isArray(initValue.value) && initValue.value.length)) {
                    setValue(initValue.value);
                    nextTick(debounce(handleInitialFocus, 300));
                    emit('trigger-event', { name: 'initValueChange', event: { value: initValue.value } });
                } else {
                    setValue(null);
                    emit('trigger-event', { name: 'initValueChange', event: { value: initValue.value } });
                }
            },
            { immediate: true },
            { deep: true }
        );

        watch(
            initialState,
            () => {
                if (initialState.value && initialState.value === 'open') openDropdown();
                else if (!forceOpenInEditor.value) closeDropdown();
            },
            { immediate: true }
        );

        /* wwEditor:start */
        watch(isEditing, () => {
            componentKey.value++;
            nextTick(debounce(syncFloating, 300));
        });

        watch(forceOpenInEditor, () => {
            if (forceOpenInEditor.value) openDropdown();
            else closeDropdown();
        });

        watch(triggerElement, () => { // Observe trigger element size when updated
            observeTriggerSize();
        });
        /* wwEditor:end */

        // Local context is an object with select and selectTrigger keys
        const currentLocalContext = ref({});
        const registerLocalContext = (key) => ({ data, methods, markdown }) => {
            const selectLocalContext = currentLocalContext.value;
            const newLocalContext = {
                data: {
                    ...selectLocalContext.data,
                    [key]: data,
                },
                methods: {
                    ...selectLocalContext.methods,
                    ...methods,
                },
                markdown: {
                    ...selectLocalContext.markdown,
                    [key]: markdown,
                },
            }
            wwLib.wwElement.useRegisterElementLocalContext(
                'select',
                newLocalContext.data,
                newLocalContext.methods,
                newLocalContext.markdown
            );
            currentLocalContext.value = newLocalContext;
        };
        const registerTriggerLocalContext = registerLocalContext('selectTrigger');
        const registerSelectLocalContext = registerLocalContext('select');

        provide('_wwSelect:mappingLabel', mappingLabel);
        provide('_wwSelect:mappingValue', mappingValue);
        provide('_wwSelect:rawData', rawData);
        provide('_wwSelect:options', options);
        provide('_wwSelect:type', selectType);
        provide('_wwSelect:value', variableValue);
        provide('_wwSelect:setValue', setValue);
        provide('_wwSelect:isDisabled', isDisabled);
        provide('_wwSelect:isReadonly', isReadonly);
        provide('_wwSelect:canUnselect', canUnselect);
        provide('_wwSelect:searchState', searchState);
        provide('_wwSelect:optionProperties', optionProperties);
        provide('_wwSelect:updateValue', updateValue);
        provide('_wwSelect:registerOption', registerOption);
        provide('_wwSelect:unregisterOption', unregisterOption);
        provide('_wwSelect:registerOptionProperties', registerOptionProperties);
        provide('_wwSelect:registerTriggerLocalContext', registerTriggerLocalContext);
        provide('_wwSelect:dropdownMethods', { closeDropdown });
        provide('_wwSelect:useSearch', { updateHasSearch, updateSearchElement, updateSearch, updateAutoFocusSearch });

        const markdown = `### Select local informations

#### options
Array of all available options in the dropdown. Each option contains:
- \`value\`: Option's value
- \`label\`: Display text
- \`disabled\`: Boolean indicating if option is disabled
- \`isSelected\`: Boolean indicating if option is selected
- \`data\`: Data from the repeat context (optional)

#### active
Information about currently selected option(s):
- \`value\`: Current selection (single value or array for multiple select)
- \`details\`: Detailed information about selected option(s)

#### utils
Component state information:
- \`type\`: Select type ('single' or 'multiple')
- \`isOpen\`: Boolean indicating if dropdown is open
- \`triggerWidth\`: Width of trigger element
- \`triggerHeight\`: Height of trigger element

#### search (optional)
Present when search is enabled:
- \`value\`: Current search input value
- \`searchBy\`: Fields to search by
- \`searchMatches\`: Options matching search criteria`;

        registerSelectLocalContext({
            data,
            methods,
            markdown,
        });

        // Styles
        const dropdownStyles = computed(() => {
            // Border
            let border = {}
            if(props.content.dropdownBorder) {
                border = {
                    'border-top': props.content.dropdownBorderTop,
                    'border-right': props.content.dropdownBorderRight,
                    'border-bottom': props.content.dropdownBorderBottom,
                    'border-left': props.content.dropdownBorderLeft,
                }
            } else {
                border = {'border': props.content.dropdownBorderAll}
            }
            
            return {
                'padding': props.content.dropdownPadding || 0,
                'box-shadow': props.content.dropdownShadow || 'none',
                'border-radius': props.content.dropdownBorderRadius || 0,
                'max-height': props.content.dropdownMaxHeight || 'auto',
                'z-index': props.content.dropdownZIndex || 2,
                'overflow-y': 'auto',
                'width': props.content.dropdownWidth || 'auto',
                'background-color': props.content.dropdownBgColor || 'transparent',

                ...border,
            };
        });

        onMounted(() => {
            nextTick(() => {
                debounce(syncFloating, 300);
                observeTriggerSize();
            });
            wwLib.getFrontDocument().addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            if (resizeObserver.value) {
                resizeObserver.value.disconnect();
                resizeObserver.value = null;
            }
            wwLib.getFrontDocument().removeEventListener('click', handleClickOutside);
        });

        watch(
            optionProperties,
            value => {
                emit('update:sidepanel-content', { path: 'optionProperties', value });
            },
            { immediate: true, deep: true }
        );

        return {
            showSearch,
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
            handleKeydown,
            toggleDropdown,
            dropdownStyles,
            resizeObserver,
            options,
            currentLocalContext,
            variableValue,
            /* wwEditor:start */
            selectForm,
            /* wwEditor:end */
        };
    },
};
</script>

<style lang="scss" scoped>
// dropdown width is

.ww-select {
    position: relative;
}

.ww-select__trigger {
    width: 100%;
}

.ww-select__dropdown {
    overflow: hidden;
}

.fake-input {
    background: rgba(0, 0, 0, 0);
    border: 0;
    bottom: -1px;
    font-size: 0;
    height: 1px;
    left: 0;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0;
    width: 100%;
}
</style>