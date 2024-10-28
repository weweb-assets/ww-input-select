import { ref, provide } from 'vue';

export default function useAccessibility({
    options,
    isOpen,
    methods /* toggleDropdown, openDropdown, closeDropdown, updateValue */,
}) {
    const dropdownId = `ww-select-dropdown-${wwLib.wwUtils.getUid()}`;
    const activeDescendant = ref('');
    const focusedOptionIndex = ref(0);
    const activeOptionValue = ref('');

    const handleTriggerKeydown = event => {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                if (!isOpen.value) methods.openDropdown();
                else navigateOptions(event.key === 'ArrowDown' ? 1 : -1);
                break;
            case 'Enter':
                event.preventDefault();
                if (isOpen.value) {
                    if (activeOptionValue.value) methods.updateValue(activeOptionValue.value);
                } else {
                    methods.openDropdown();
                }
                break;
            case 'Escape':
                event.preventDefault();
                if (isOpen.value) {
                    methods.closeDropdown();
                    resetFocus();
                }
                break;
        }
    };

    const navigateOptions = direction => {
        const optionsCount = options.value.length;
        if (optionsCount === 0) return;
        focusedOptionIndex.value = (focusedOptionIndex.value + direction + optionsCount) % optionsCount;
        const focusedOption = options.value[focusedOptionIndex.value];
        activeOptionValue.value = focusedOption.value;
        activeDescendant.value = `ww-select-option-${focusedOption.value}`;
    };

    const resetFocus = () => {
        activeDescendant.value = '';
        focusedOptionIndex.value = 0;
    };

    const setInitialFocus = value => {
        const selectedIndex = options.value.findIndex(option => option.value === value);
        if (selectedIndex !== -1) {
            focusedOptionIndex.value = selectedIndex;
            const focusedOption = options.value[selectedIndex];
            activeOptionValue.value = focusedOption.value;
            activeDescendant.value = `ww-select-option-${focusedOption.value}`;
        }
    };

    provide('_wwSelectActiveDescendant', activeDescendant);
    provide('_wwSelectFocusedOptionIndex', focusedOptionIndex);
    provide('_wwSelectSetInitialFocus', setInitialFocus);

    return {
        dropdownId,
        activeDescendant,
        handleTriggerKeydown,
        resetFocus,
        setInitialFocus,
    };
}
