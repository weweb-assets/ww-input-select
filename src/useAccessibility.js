import { ref, provide } from 'vue';

export default function useAccessibility({ options, isOpen, toggleDropdown, openDropdown, closeDropdown }) {
    const dropdownId = `ww-select-dropdown-${wwLib.wwUtils.getUid()}`;
    const activeDescendant = ref('');
    const focusedOptionIndex = ref(0);

    const handleTriggerKeydown = event => {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                if (!isOpen.value) {
                    openDropdown();
                } else {
                    navigateOptions(event.key === 'ArrowDown' ? 1 : -1);
                }
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                toggleDropdown();
                break;
            case 'Escape':
                if (isOpen.value) {
                    event.preventDefault();
                    closeDropdown();
                }
                break;
        }
    };

    const navigateOptions = direction => {
        const optionsCount = options.value.length;
        if (optionsCount === 0) return;
        focusedOptionIndex.value = (focusedOptionIndex.value + direction + optionsCount) % optionsCount;
        const focusedOption = options.value[focusedOptionIndex.value];
        activeDescendant.value = `ww-select-option-${focusedOption.value}`;
    };

    const resetFocus = () => {
        activeDescendant.value = '';
        focusedOptionIndex.value = 0;
    };

    provide('_wwSelectActiveDescendant', activeDescendant);
    provide('_wwSelectFocusedOptionIndex', focusedOptionIndex);

    return {
        dropdownId,
        handleTriggerKeydown,
        resetFocus,
    };
}
