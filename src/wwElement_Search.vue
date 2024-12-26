<template>
    <div class="ww-select-search" data-ww-flag="ww-select-search">
        <wwElement
            ref="searchElementRef"
            v-bind="content.inputElement"
            name="select-search"
            @element-event="handleInputChange"
            data-skip-validation
            :parent-selection="{
                allow: true,
                info: {
                    header: 'You are on the input element',
                    text: 'If you want to configure the Search element, you can select it here.',
                    button: 'Select Search element',
                    args: ['ww-select-search'],
                },
            }"
        />
    </div>
</template>

<script>
import { inject, onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
/* wwEditor:start */
import useEditorHint from './editor/useEditorHint';
/* wwEditor:end */
import { debounce } from './utils';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['element-event', 'trigger-event', 'update:sidepanel-content'],
    setup(props, { emit }) {
        /* wwEditor:start */
        useEditorHint(emit);
        /* wwEditor:end */
        console.log('search props', props);
        const optionProperties = inject('_wwSelect:optionProperties', ref({}));
        const { updateHasSearch, updateSearchElement, updateSearch, updateAutoFocusSearch } = inject(
            '_wwSelect:useSearch',
            {}
        );
        const searchElementRef = ref(null);
        const searchElement = computed(() => searchElementRef.value?.componentRef?.$el);
        const searchBy = computed(() => {
            return (props.content.searchBy || [])
                .filter(item => item && item.filter)
                .map(item => JSON.parse(item.filter.replace(/'/g, '"')))
                .flat();
        });
        const autoFocus = computed(() => props.content.autoFocus);
        const debouncedUpdateSearch = debounce((value, searchBy) => {
            if (updateSearch) updateSearch({ value, searchBy });
        }, 300);

        // This event come from ww-input-basic => https://github.com/weweb-assets/ww-input-basic
        const handleInputChange = event => {
            console.log('search event', event);
            if (event.type === 'change' && debounce) debouncedUpdateSearch(event?.value?.value, searchBy);
        };

        function focusInput() {
            searchElement.value?.focus();
        }

        watch(searchElement, value => {
            if (updateSearchElement) updateSearchElement(value);
        });

        watch(autoFocus, value => {
            if (updateAutoFocusSearch) updateAutoFocusSearch(value);
        });

        onMounted(() => {
            if (updateHasSearch) updateHasSearch(true);
            if (updateSearch) updateSearch({ value: '', searchBy, searchMatches: [] });
        });

        onBeforeUnmount(() => {
            if (updateHasSearch) updateHasSearch(false);
        });

        return {
            searchElementRef,
            handleInputChange,
            focusInput,
        };
    },
};
</script>
