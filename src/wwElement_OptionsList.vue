<template>
    <!-- Heavy Mode: RecycleScroller for better performance with large lists -->
    <RecycleScroller
        v-if="heavyMode && filteredOptions.length > 0"
        class="scroller"
        :style="scrollerStyle"
        :items="dynamicScrollerItems"
        :item-size="itemSize"
        :buffer="virtualScrollBuffer"
        :key="'heavy-' + filteredOptions.length"
        key-field="id"
    >
        <template v-slot="{ item, index }">
            <wwLayoutItemContext :key="index" is-repeat :index="index" :data="item">
                <div :style="index != filteredOptions.length - 1 ? { paddingBottom: content.optionSpacing } : {}">
                    <ww-element-option :local-data="item" :content="content" :wwEditorState="wwEditorState" />
                </div>
            </wwLayoutItemContext>
        </template>
    </RecycleScroller>

    <!-- Normal Mode: DynamicScroller with automatic size detection -->
    <DynamicScroller
        v-else-if="!heavyMode && filteredOptions.length > 0"
        class="scroller"
        :style="scrollerStyle"
        :items="dynamicScrollerItems"
        :min-item-size="virtualScrollMinItemSize"
        :buffer="virtualScrollBuffer"
        :key="'dynamic-' + filteredOptions.length"
    >
        <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="JSON.stringify(item)"
                :data-index="index"
            >
                <wwLayoutItemContext :key="index" is-repeat :index="index" :data="item">
                    <div :style="index != filteredOptions.length - 1 ? { paddingBottom: content.optionSpacing } : {}">
                        <ww-element-option :local-data="item" :content="content" :wwEditorState="wwEditorState" />
                    </div>
                </wwLayoutItemContext>
            </DynamicScrollerItem>
        </template>
    </DynamicScroller>

    <div v-show="filteredOptions.length === 0 || showEmptyStateInEditor" :style="emptyStateStyle">
        <span>{{ emptyStateText }}</span>
    </div>
</template>

<script>
import InputSelectOption from './wwElement_Option.vue';
import { ref, inject, computed, watch, toValue } from 'vue';
import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller';
import { useMemoize } from '@vueuse/core';
import { areValuesEqual } from './utils';
/* wwEditor:start */
import useEditorHint from './editor/useEditorHint';
/* wwEditor:end */

export default {
    components: {
        DynamicScroller,
        DynamicScrollerItem,
        RecycleScroller,
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
            return props.wwEditorState.sidepanelContent.showEmptyStateInEditor && props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const rawData = inject('_wwSelect:rawData', ref([]));
        const searchState = inject('_wwSelect:searchState', ref(null));
        const { updateSearch } = inject('_wwSelect:useSearch', {});
        const registerOptionProperties = inject('_wwSelect:registerOptionProperties', () => {});
        const selectedValue = inject('_wwSelect:value', ref(null));
        const mappingValue = inject('_wwSelect:mappingValue', ref(null));
        const isSorting = inject('_wwSelect:isSorting', ref(false));
        const virtualScrollMinItemSize = computed(() => props.content.virtualScrollMinItemSize);
        const virtualScrollBuffer = computed(() => props.content.virtualScrollBuffer);
        const heavyMode = computed(() => props.content.heavyMode);
        const itemSize = computed(() => props.content.itemSize);

        const emptyStateText = computed(() => wwLib.wwLang.getText(props.content.emptyStateText));

        const options = computed(() => {
            const items = rawData.value;
            return Array.isArray(items) ? items : [];
        });

        const optionProperties = computed(() => {
            if (!options.value || options.value.length === 0) return {};
            return options.value[0];
        });

        const memoizedFilter = useMemoize((options, filterValue) => {
            return options.filter(option => {
                // Handle primitive values directly
                const isPrimitive = typeof option !== 'object' || option === null;
                if (isPrimitive) {
                    const normalizedOption = option
                        .toString()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();
                    const normalizedFilter = filterValue
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();
                    return normalizedOption.includes(normalizedFilter);
                } else {
                    // For objects, use the existing search logic
                    const searchBy = searchState.value?.searchBy?.length
                        ? searchState.value?.searchBy
                        : Object.keys(option);
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
                }
            });
        });

        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const filteredOptions = computed(() => {
            let filtered = options.value;
            
            // Apply search filter if active
            if (searchState.value && searchState.value.value) {
                filtered = memoizedFilter(options.value, searchState.value.value);
            }
            
            // Apply sorting if sortSelectedToTop is enabled
            if (props.content.sortSelectedToTop && selectedValue.value != null) {
                try {
                    isSorting.value = true;
                    
                    // Create a map of option values to avoid recalculating during sort
                    const optionValueMap = new Map();
                    filtered.forEach((option) => {
                        const isPrimitive = typeof option !== 'object' || option === null;
                        const value = isPrimitive 
                            ? option 
                            : resolveMappingFormula(toValue(mappingValue.value), option) ?? option;
                        optionValueMap.set(option, value);
                    });
                    
                    filtered = [...filtered].sort((a, b) => {
                        const aValue = optionValueMap.get(a);
                        const bValue = optionValueMap.get(b);
                        
                        // Check if each option is selected
                        let aIsSelected, bIsSelected;
                        
                        if (Array.isArray(selectedValue.value)) {
                            // Multiple selection mode
                            aIsSelected = selectedValue.value.some(v => areValuesEqual(v, aValue));
                            bIsSelected = selectedValue.value.some(v => areValuesEqual(v, bValue));
                        } else {
                            // Single selection mode
                            aIsSelected = areValuesEqual(selectedValue.value, aValue);
                            bIsSelected = areValuesEqual(selectedValue.value, bValue);
                        }
                        
                        // Sort selected items to top
                        if (aIsSelected && !bIsSelected) return -1;
                        if (!aIsSelected && bIsSelected) return 1;
                        return 0; // Keep original order for items with same selection status
                    });
                    
                    // Reset the flag after a brief delay to allow DOM to update
                    setTimeout(() => {
                        isSorting.value = false;
                    }, 100);
                } catch (error) {
                    console.error('[OptionsList] Error during sorting:', error);
                    isSorting.value = false;
                    // Return unsorted on error
                    filtered = [...filtered];
                }
            }
            
            return filtered;
        });

        const dynamicScrollerItems = computed(() => {
            return filteredOptions.value.map((item, index) => {
                // Handle primitive values properly - don't spread them as they become indexed objects
                const isPrimitive = typeof item !== 'object' || item === null;
                if (isPrimitive) {
                    // For primitives, create a simple object wrapper with stable ID based on value
                    const stableId = `primitive_${JSON.stringify(item)}`;
                    return { value: item, id: stableId };
                } else {
                    // For objects, use existing id or create stable ID based on the object's value
                    const existingId = item.id;
                    if (existingId != null) {
                        return { ...item, id: existingId };
                    }
                    // Create stable ID based on object content to survive re-sorting
                    try {
                        const stableId = `obj_${JSON.stringify(item)}`;
                        return { ...item, id: stableId };
                    } catch {
                        // Fallback to index-based if JSON.stringify fails (circular refs, etc.)
                        return { ...item, id: `id_${index}` };
                    }
                }
            });
        });

        // searchFilteredCount is NOT used anymore - removed to prevent infinite loop
        // The Search component handles updating searchMatches directly

        // Styles
        const scrollerStyle = computed(() => {
            // Use flex: 1 to take all available space in the flex container
            // This ensures the scroller has a definite height for virtual scrolling
            return {
                flex: '1',
                'min-height': '0', // Important for flex children to shrink below content size
            };
        });

        const emptyStateStyle = computed(() => {
            return {
                'font-family': props.content.emptyStateFontFamily,
                'font-size': props.content.emptyStateFontSize,
                'font-weight': props.content.emptyStateFontWeight,
                color: props.content.emptyStateFontColor,
                padding: props.content.emptyStatePadding,
                'text-align': props.content.emptyStateTextAlign,
                width: '100%',
            };
        });

        // Watch
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
            emptyStateText,
            filteredOptions,
            virtualScrollMinItemSize,
            virtualScrollBuffer,
            heavyMode,
            itemSize,
            showEmptyStateInEditor,
            dynamicScrollerItems,
            scrollerStyle,
            emptyStateStyle,
        };
    },
};
</script>

<style>
@import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
</style>
