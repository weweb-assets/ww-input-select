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
import useSearch from './useSearch';
import { debounce } from './utils';

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
        const forceOpenInEditor = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.sidepanelContent.forceOpenInEditor;
            /* wwEditor:end */
            return false;
        });
        const initValue = computed(() =>
            selectType.value === 'single' ? props.content.initValueSingle || null : props.content.initValueMulti || []
        );
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: initValue,
        });
        const triggerElement = ref(null);
        const dropdownElement = ref(null);
        const { floatingStyles, syncFloating } = useDropdownFloating(triggerElement, dropdownElement);
        const selectType = computed(() => props.content.selectType);
        const options = ref([]);
        const isOpen = ref(false);
        const rawData = computed(() => props.content.choices || []);
        const isDisabled = computed(() => props.content.disabled || false);
        const isReadonly = computed(() => props.content.readonly || false);
        const canUnselect = computed(() => props.content.canUnselect || false);
        const initialState = computed(() => props.content.initialState || 'closed');
        const closeOnClickOutside = computed(() => props.content.closeOnClickOutside || false);
        const optionsFilter = ref(null);
        const optionProperties = ref({});

        const registerOption = option => {
            if (option.value) options.value.push(option);
        };

        const unregisterOption = option => {
            options.value = options.value.filter(opt => opt.value !== option.value);
        };

        const registerOptionProperties = object => {
            if (object) optionProperties.value = object;
        };

        const updateSearch = filter => {
            optionsFilter.value = filter;
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

        function handleClickOutside(event) {
            if (
                closeOnClickOutside.value &&
                isOpen.value &&
                !triggerElement.value.contains(event.target) &&
                !dropdownElement.value.contains(event.target)
            ) {
                closeDropdown();
            }
        }

        const { dropdownId, handleTriggerKeydown, activeDescendant, resetFocus } = useAccessibility({
            options,
            isOpen,
            methods: { openDropdown, closeDropdown, toggleDropdown, updateValue },
        });

        const { hasSearch, updateHasSearch, updateSearchElement, resetSearch } = useSearch(optionsFilter, {
            updateSearch,
        });

        const selectedOptionDetails = computed(() => {
            const optionsMap = new Map(options.value.map(option => [option.value, option]));

            if (selectType.value === 'single') {
                return optionsMap.get(variableValue.value) || null;
            } else {
                const selectedValues = Array.isArray(variableValue.value) ? variableValue.value : [];
                return selectedValues.map(value => optionsMap.get(value)).filter(Boolean);
            }
        });

        const data = ref({
            type: selectType,
            options,
            value: variableValue,
            valueDetails: selectedOptionDetails,
            isOpen,
        });

        const methods = {
            openDropdown: {
                method: openDropdown,
                /* wwEditor:start */
                editor: { label: 'Open', elementName: 'Select', description: 'Open the dropdown', icon: 'select' },
                /* wwEditor:end */
            },
            closeDropdown: {
                method: closeDropdown,
                /* wwEditor:start */
                editor: { label: 'Close', elementName: 'Select', description: 'Close the dropdown', icon: 'select' },
                /* wwEditor:end */
            },
            toggleDropdown: {
                method: toggleDropdown,
                /* wwEditor:start */
                editor: { label: 'Toggle', elementName: 'Select', description: 'Toggle the dropdown', icon: 'select' },
                /* wwEditor:end */
            },
            resetSearch: {
                method: resetSearch,
                /* wwEditor:start */
                editor: {
                    label: 'Reset search',
                    elementName: 'Select search',
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
                        value: computed(() => optionsFilter.value?.value || ''),
                        searchBy: computed(() => optionsFilter.value?.searchBy || []),
                    };
                } else {
                    delete data.value.search;
                }
            },
            { immediate: true }
        );

        watch(selectType, () => setValue(initValue.value));

        watch(
            [isOpen, variableValue, () => props.content],
            () => {
                nextTick(debounce(syncFloating, 300));
            },
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
        /* wwEditor:end */

        provide('_wwRawData', rawData);
        provide('_wwSelectOptions', options);
        provide('_wwSelectType', selectType);
        provide('_wwSelectValue', variableValue);
        provide('_wwSelectSetValue', setValue);
        provide('_wwSelectIsDisabled', isDisabled);
        provide('_wwSelectIsReadonly', isReadonly);
        provide('_wwSelectCanUnselect', canUnselect);
        provide('_wwSelectOptionsFilter', optionsFilter);
        provide('_wwSelectOptionProperties', optionProperties);
        provide('_wwSelectUpdateValue', updateValue);
        provide('_wwRegisterOption', registerOption);
        provide('_wwUnregisterOption', unregisterOption);
        provide('_wwRegisterOptionProperties', registerOptionProperties);
        provide('_wwSelectDropdownMethods', { closeDropdown });
        provide('_wwSelectUseSearch', { updateHasSearch, updateSearchElement, updateSearch });
        provide('_wwUtils', { debounce });

        wwLib.wwElement.useRegisterElementLocalContext('select', data, methods);

        onMounted(() => {
            nextTick(debounce(syncFloating, 300));
            wwLib.getFrontDocument().addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            wwLib.getFrontDocument().removeEventListener('click', handleClickOutside);
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
