import { ref, provide, watch } from 'vue';

export default function useAccessibility({ options, isOpen, methods: { openDropdown, closeDropdown, updateValue } }) {
    const dropdownId = `ww-select-dropdown-${wwLib.wwUtils.getUid()}`;

    const activeDescendant = ref('');
    const focusedOptionIndex = ref(0);
    const activeOptionValue = ref('');

    const updateFocusedOption = index => {
        const focusedOption = options.value[index];
        focusedOptionIndex.value = index;
        activeOptionValue.value = focusedOption.value;
        activeDescendant.value = focusedOption.optionId;
    };

    const resetFocus = () => {
        activeDescendant.value = '';
        focusedOptionIndex.value = 0;
        activeOptionValue.value = '';
    };

    watch(
        options,
        () => {
            resetFocus();

            if (options.value.length > 0) {
                const selectedOption = options.value.find(option => option.isSelected);
                if (selectedOption) {
                    const selectedIndex = options.value.findIndex(option => option.value === selectedOption.value);
                    updateFocusedOption(selectedIndex);
                }
            }
        },
        { immediate: true, deep: true }
    );

    const navigateOptions = direction => {
        const optionsCount = options.value.length;
        if (optionsCount === 0) return;

        let newIndex;
        if (!isOpen.value) {
            newIndex = 0;
        } else if (activeDescendant.value === '') {
            newIndex = direction > 0 ? 0 : optionsCount - 1;
        } else {
            newIndex = (focusedOptionIndex.value + direction + optionsCount) % optionsCount;
        }

        updateFocusedOption(newIndex);
    };

    const handleKeydown = event => {
        const keyHandlers = {
            ArrowDown: () => {
                event.preventDefault();
                !isOpen.value ? openDropdown() : navigateOptions(1);
            },
            ArrowUp: () => {
                event.preventDefault();
                !isOpen.value ? openDropdown() : navigateOptions(-1);
            },
            Enter: () => {
                event.preventDefault();
                if (isOpen.value && activeOptionValue.value) {
                    updateValue(activeOptionValue.value);
                } else if (!isOpen.value) {
                    openDropdown();
                }
            },
            Escape: () => {
                event.preventDefault();
                if (isOpen.value) {
                    closeDropdown();
                    resetFocus();
                }
            },
        };

        const handler = keyHandlers[event.key];
        if (handler) handler();
    };

    const setInitialFocus = value => {
        const selectedIndex = options.value.findIndex(option => option.value === value);
        if (selectedIndex !== -1) {
            updateFocusedOption(selectedIndex);
        }
    };

    provide('_wwSelectActiveDescendant', activeDescendant);
    provide('_wwSelectFocusedOptionIndex', focusedOptionIndex);
    provide('_wwSelectSetInitialFocus', setInitialFocus);
    provide('_wwHandleKeydown', handleKeydown);

    return {
        dropdownId,
        activeDescendant,
        handleKeydown,
        resetFocus,
        setInitialFocus,
    };
}
