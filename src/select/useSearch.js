import { ref, nextTick } from 'vue';

export default function useSearch(searchState, { updateSearch }) {
    const hasSearch = ref(false);
    const searchElement = ref(null);
    const autoFocusSearch = ref(false);

    function updateHasSearch(value) {
        hasSearch.value = value;
    }

    function updateSearchElement(value) {
        console.log('updateSearchElement', value);
        searchElement.value = value;
    }

    function focusSearch() {
        console.log('focusSearch', searchElement.value);
        if (searchElement.value) {
            nextTick(() => {
                searchElement.value.focus();
            });
        }
    }

    function updateAutoFocusSearch(value) {
        autoFocusSearch.value = value;
    }

    function resetSearch() {
        if (searchElement.value) {
            searchElement.value.value = '';
            updateSearch({ ...searchState, value: '' });
        }
    }

    return {
        hasSearch,
        autoFocusSearch,
        updateHasSearch,
        updateSearchElement,
        resetSearch,
        updateAutoFocusSearch,
        focusSearch,
    };
}
