import { ref } from 'vue';

export default function useSearch(searchState, { updateSearch }) {
    const hasSearch = ref(false);
    const searchElement = ref(null);

    function updateHasSearch(value) {
        hasSearch.value = value;
    }

    function updateSearchElement(value) {
        searchElement.value = value;
    }

    function resetSearch() {
        if (searchElement.value) {
            searchElement.value.value = '';
            updateSearch({ ...searchState, value: '' });
        }
    }

    return { hasSearch, updateHasSearch, updateSearchElement, resetSearch };
}
