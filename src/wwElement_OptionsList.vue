<template>
    <DynamicScroller
        v-if="virtualScroll && filteredOptions.length > 0"
        :items="dynamicScrollerItems"
        :min-item-size="virtualScrollMinItemSize"
        :buffer="virtualScrollBuffer"
        :key="filteredOptions.length"
    >
        <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="JSON.stringify(item)"
                :data-index="index"
            >
                <wwLayoutItemContext :key="index" is-repeat :index="index" :data="item">
                    <ww-element-option :local-data="item" :content="content" :wwEditorState="wwEditorState" />
                </wwLayoutItemContext>
            </DynamicScrollerItem>
        </template>
    </DynamicScroller>

    <wwLayoutItemContext
        v-else-if="!virtualScroll && filteredOptions.length > 0"
        v-for="(item, index) in filteredOptions"
        :key="index"
        is-repeat
        :index="index"
        :data="item"
    >
        <ww-element-option :local-data="item" :content="content" :wwEditorState="wwEditorState" />
    </wwLayoutItemContext>

    <div v-show="filteredOptions.length === 0 || showEmptyStateInEditor">
        <wwElement v-bind="content.emptyStateContainer" />
    </div>
</template>

<script>
import InputSelectOption from './wwElement_Option.vue';
import { ref, inject, computed, watch } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { useMemoize } from '@vueuse/core';
/* wwEditor:start */
import useEditorHint from './editor/useEditorHint';
/* wwEditor:end */

export default {
    components: {
        DynamicScroller,
        DynamicScrollerItem,
        'ww-element-option': InputSelectOption,
    },
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['update:sidepanel-content'],
    setup(props, { emit }) {
        /* wwEditor:start */
        useEditorHint(emit);
        /* wwEditor:end */

        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const showEmptyStateInEditor = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.sidepanelContent.showEmptyStateInEditor;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const rawData = inject('_wwSelect:rawData', ref([]));
        const searchState = inject('_wwSelect:searchState', ref(null));
        const { updateSearch } = inject('_wwSelect:useSearch', {});
        const registerOptionProperties = inject('_wwSelect:registerOptionProperties', () => {});
        const virtualScroll = computed(() => props.content.virtualScroll);
        const virtualScrollSizeDependencies = computed(() => props.content.virtualScrollSizeDependencies);
        const virtualScrollMinItemSize = computed(() => props.content.virtualScrollMinItemSize || 40);
        const virtualScrollBuffer = computed(() => props.content.virtualScrollBuffer || 400);

        const options = computed(() => {
            const items = rawData.value;
            return Array.isArray(items) ? items : [];
        });

        const optionProperties = computed(() => {
            if (!options.value || options.value.length === 0) return {};
            return options.value[0];
        });

        const memoizedFilter = useMemoize((options, filterValue) => {
            console.log('memoizedFilter', options, filterValue, searchState.value);
            const searchBy = searchState.value?.searchBy?.length
                ? searchState.value?.searchBy
                : Object.keys(options[0]);
            return options.filter(option => {
                return searchBy.some(key => {
                    const optionValue = option[key];
                    if (!optionValue) return false;
                    const normalizedOption = optionValue
                        .toString()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();
                    const normalizedFilter = filterValue
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();

                    return normalizedOption.includes(normalizedFilter);
                });
            });
        });

        const filteredOptions = computed(() => {
            if (!searchState.value || !searchState.value.value) return options.value;
            let filtered = memoizedFilter(options.value, searchState.value.value);
            return filtered;
        });

        const dynamicScrollerItems = computed(() => {
            return filteredOptions.value.map((item, index) => ({ ...item, id: item.id ?? `id_${index}` }));
        });

        watch(filteredOptions, () => {
            if (updateSearch) {
                const searchMatches = searchState.value && searchState.value.value ? filteredOptions.value : [];
                updateSearch({ ...searchState.value, searchMatches });
            }
        });

        watch(
            optionProperties,
            value => {
                emit('update:sidepanel-content', { path: 'optionProperties', value });
                if (registerOptionProperties) registerOptionProperties(value);
            },
            { immediate: true }
        );

        /* wwEditor:start */
        watch(
            isEditing,
            () => {
                emit('update:sidepanel-content', { path: 'showEmptyStateInEditor', value: false });
            },
            { immediate: true, deep: true }
        );
        /* wwEditor:end */

        return {
            filteredOptions,
            virtualScroll,
            virtualScrollSizeDependencies,
            virtualScrollMinItemSize,
            virtualScrollBuffer,
            showEmptyStateInEditor,
            dynamicScrollerItems,
        };
    },
};
</script>

<style>
@import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
</style>
