import { ref } from 'vue';

export default function useSearch(optionsFilter, { updateSearch }) {
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
            updateSearch({ ...optionsFilter, value: '' });
        }
    }

    return { hasSearch, updateHasSearch, updateSearchElement, resetSearch };
}
