<template>
    <div class="ww-input-select__trigger">
        <div :style="triggerStyle">
            <span v-if="isOptionSelected" :style="selectedValueStyle">{{selectedLabel}}</span>
            <span v-else :style="placeholderStyle">{{ data.placeholder }}</span>
            <div
                :class="[isOpen ? content.triggerIconOpen : content.triggerIconClose]"
                :style="triggerIconStyle"
                aria-hidden="true"
            ></div>
        </div>
        <!-- <wwElement class="ww-select-trigger" v-bind="content.triggerContainer" /> -->
    </div>
</template>

<script>
import { provide, computed, inject, ref } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    setup(props) {
        const registerTriggerLocalContext = inject('_wwSelect:registerTriggerLocalContext');
        const localContext = inject('_wwSelect:localContext');

        const placeholder = computed(() => wwLib.wwLang.getText(props.content.placeholder));
        const selectedLabel = computed(() => {
            return localContext.value?.data?.select?.active?.details?.label;
        });
        const isOptionSelected = computed(() => !!localContext.value?.data?.select?.active?.details?.label);
        const isOpen = computed(() => localContext.value?.data?.select?.utils?.isOpen);
        const data = ref({
            placeholder,
        });

        const markdown = `### Select Trigger local informations

- \`placeholder\`: The placeholder text for the select trigger.`;

        registerTriggerLocalContext({ data, methods: {}, markdown });

        const triggerStyle = computed(() => {
            const borderCss = !props.content.triggerBorder
                ? {
                      border: props.content.triggerBorderAll,
                  }
                : {
                      'border-top': props.content.triggerBorderTop,
                      'border-right': props.content.triggerBorderRight,
                      'border-bottom': props.content.triggerBorderBottom,
                      'border-left': props.content.triggerBorderLeft,
                  };

            return {
                padding: props.content.triggerPadding,
                margin: props.content.triggerMargin,
                'background-color': props.content.triggerBgColor,
                width: props.content.triggerWidth,
                height: props.content.triggerHeight,
                'border-radius': props.content.triggerBorderRadius,
                'box-shadow': props.content.triggerShadows,
                cursor: 'pointer',

                display: 'flex',
                'flex-direction': 'row',
                'align-items': 'center',
                'justify-content': 'space-between',

                ...borderCss,
            };
        });

        const triggerIconStyle = computed(() => {
            return {
                'font-size': props.content.triggerIconSize,
                color: props.content.triggerIconColor,
            };
        });

        const selectedValueStyle = computed(() => {
            return {
                'font-size': props.content.selectedFontSize,
                color: props.content.selectedFontColor,
                'font-weight': props.content.selectedFontWeight,
                'text-align': props.content.selectedTextAlign,
                width: '100%',
            };
        });

        const placeholderStyle = computed(() => {
            return {
                'font-size': props.content.placeholderFontSize,
                color: props.content.placeholderFontColor,
                'font-weight': props.content.placeholderFontWeight,
            };
        });

        return {
            data,
            selectedLabel,
            isOptionSelected,
            localContext,
            triggerStyle,
            triggerIconStyle,
            selectedValueStyle,
            placeholderStyle,
            isOpen,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-input-select__trigger {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.ww-select-trigger {
    width: 100%;
}
</style>