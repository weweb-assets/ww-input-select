<template>
    <Multiselect
        v-if="!isReadonly"
        ref="select"
        :key="componentKey"
        v-model="internalValue"
        class="ww-input-select"
        mode="single"
        :style="cssVariables"
        :class="{ editing: isEditing }"
        :classes="{ containerOpen: 'is-open', containerOpenTop: 'is-open-top' }"
        v-bind="selectProps"
        @close="checkIsOpen"
    >
        <!-- Placeholder -->
        <template v-if="placeholder.length" #placeholder>
            <wwElement
                class="multiselect-placeholder-el"
                v-bind="content.placeholderElement"
                :ww-props="{ text: placeholder || '' }"
            />
        </template>

        <!-- Tag selected with remove icon -->
        <template #singlelabel="{ value }">
            <div class="multiselect-single-label" :style="value.style || defaultOptionStyle">
                <wwLayoutItemContext :index="value => getValueIndex(value)" :item="{}" is-repeat :data="value">
                    <wwText class="multiselect-single-label-el" :text="getLabel(value)"></wwText>
                </wwLayoutItemContext>
            </div>
        </template>

        <!-- Tag unselected in list -->
        <template #option="{ option }">
            <wwLayoutItemContext :index="option => getOptionIndex(option)" :item="{}" is-repeat :data="option">
                <OptionItem
                    :option="option"
                    :layoutType="content.layoutType"
                    :flexboxElement="content.flexboxElement"
                    :imageElement="content.imageElement"
                    :textElement="content.textElement"
                />
            </wwLayoutItemContext>
        </template>

        <!-- Small triangle displayed on the right of the input -->
        <template #caret>
            <wwElement v-bind="content.caretIconElement" />
        </template>

        <!-- Clear icon shown when the input has at least one selected options -->
        <template #clear="{ clear }">
            <wwElement v-bind="content.clearIconElement" @mousedown.prevent="isEditing ? null : clear($event)" />
        </template>
    </Multiselect>
    <wwText v-else :text="valueLabel"></wwText>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import OptionItem from './OptionItem.vue';

const DEFAULT_LABEL_FIELD = 'label';
const DEFAULT_VALUE_FIELD = 'value';

export default {
    components: { Multiselect, OptionItem },
    props: {
        uid: { type: String, required: true },
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event', 'update:content', 'update:content:effect', 'add-state', 'remove-state'],
    setup(props) {
        const { value: currentSelection, setValue: setCurrentSelection } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'string',
            defaultValue: props.content.initialValue ? props.content.initialValue : '',
        });

        return { currentSelection, setCurrentSelection };
    },
    data: () => ({
        options: [],
        resizeObserver: null,
        adaptivePadding: '12px',
        componentKey: 0,
    }),
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        selectProps() {
            return {
                closeOnSelect: this.content.closeOnSelect,
                searchable: this.content.searchable,
                required: this.content.required,
                disabled: this.content.disabled,
                placeholder: 'placeholder',
                canClear: this.content.clearIcon,
                canDeselect: this.content.canDeselect,
                caret: this.content.caretIcon,
                name: this.wwElementState.name,
                options: this.options,
                infinite: this.content.infiniteScroll,
                limit: this.content.limitedOptions ? this.content.limit : -1,
                resolveOnLoad: false,
            };
        },
        internalValue: {
            get() {
                if (this.content.allowCreation) {
                    // we need to make available custom options before using them
                    if (this.currentSelection && !this.options.some(option => option.value === this.currentSelection)) {
                        this.options.push(this.formatOption(this.currentSelection));
                    }
                }

                return this.currentSelection;
            },
            set(value) {
                this.setCurrentSelection(value);
            },
        },
        placeholder() {
            return wwLib.wwLang.getText(this.content.placeholder);
        },
        valueLabel() {
            const _option = this.options.find(option => option.value == this.internalValue);
            return _option ? _option.label : this.internalValue;
        },
        defaultOptionStyle() {
            return {
                backgroundColor: this.content.optionsDefaultBgColor,
                color: this.content.optionsDefaultTextColor,
            };
        },
        cssVariables() {
            return {
                '--ms-dropdown-bg': this.content.dropdownBackgroundColor,
                '--ms-dropdown-border-width': this.content.dropdownBorderWidth,
                '--ms-dropdown-border-color': this.content.dropdownBorderColor,
                '--ms-dropdown-radius': this.content.dropdownBorderRadius,
                '--ms-max-height': this.content.dropdownMaxHeight || '10rem',
                '--ms-option-bg-pointed': 'transparent',
                '--ms-option-bg-selected': 'transparent',
                '--ms-option-bg-selected-pointed': 'transparent',
                '--ms-option-color-pointed': '#000000',
                '--ms-option-color-selected': '#000000',
                '--ms-option-color-selected-pointed': '#000000',
                '--ms-ring-width': '0px',
                '--ms-ring-color': 'transparent',
                '--adaptive-padding': this.adaptivePadding,
                // '--ms-spinner-color': this.content.LoadingSpinnerColor, TBD
            };
        },
        isReadonly() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('readonly');
            }
            /* wwEditor:end */
            return this.wwElementState.props.readonly === undefined
                ? this.content.readonly
                : this.wwElementState.props.readonly;
        },
    },
    watch: {
        /* wwEditor:start */
        isEditing() {
            this.handleOpening(!this.isEditing ? false : this.wwEditorState.sidepanelContent.openInEditor);
        },
        /* wwEditor:end */
        currentSelection(value) {
            this.$emit('trigger-event', { name: 'change', event: { domEvent: {}, value } });
        },
        textStyle() {
            return wwLib.getTextStyleFromContent(this.content);
        },
        async 'content.initialValue'() {
            this.init();

            // await to avoid mismatch (multiselect not rendering custom tags)
            await this.$nextTick();
            this.internalValue = this.content.initialValue;
        },
        'content.options'() {
            this.init();
        },
        'content.layoutType'() {
            this.init();
        },
        'content.labelField'() {
            this.init();
        },
        'content.valueField'() {
            this.init();
        },
        isReadonly: {
            immediate: true,
            handler(value) {
                if (value) {
                    if (this.resizeObserver) this.resizeObserver.disconnect();
                    this.$emit('add-state', 'readonly');
                } else {
                    this.$emit('remove-state', 'readonly');
                    this.$nextTick(() => {
                        this.handleObserver();
                    });
                }
            },
        },
        /* wwEditor:start */
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind)
                this.$emit('update:content:effect', {
                    labelField: null,
                    valueField: null,
                    bgColorField: null,
                    textColorField: null,
                });
        },
        'wwEditorState.sidepanelContent.openInEditor'(value) {
            this.handleOpening(value);
        },
        'content.infiniteScroll'(value) {
            if (value) {
                this.$emit('update:content', { limitedOptions: true });
            }

            this.componentKey += 1;
            this.$nextTick(() => {
                this.init();
            });
        },
        'content.limitedOptions'(value) {
            if (!value) {
                this.$emit('update:content', { infiniteScroll: false });
            }

            this.componentKey += 1;
            this.$nextTick(() => {
                this.init();
            });
        },
        /* wwEditor:end */
    },
    created() {
        this.init();
    },
    mounted() {
        this.handleObserver();
    },
    methods: {
        async init() {
            // reset selection and option to avoid mismatch
            this.options = [];
            const initialOptions = Array.isArray(this.content.options) ? [...this.content.options] : [];
            this.options.push(...initialOptions.map(option => this.formatOption(option)));

            // add initial values as custom options if not already included
            if (
                this.content.initialValue !== undefined &&
                this.content.allowCreation &&
                !this.options.some(
                    option => option === this.content.initialValue || option.value === this.content.initialValue
                )
            ) {
                this.options.push(this.formatOption(this.content.initialValue));
            }
        },
        getValueIndex(value) {
            return this.options.findIndex(option => option.value === value.value);
        },
        getOptionIndex(option) {
            return this.options.indexOf(option);
        },
        formatOption(option) {
            const labelField = this.content.labelField || DEFAULT_LABEL_FIELD;
            const valueField = this.content.valueField || DEFAULT_VALUE_FIELD;

            if (this.content.layoutType === 'free')
                return {
                    label: wwLib.wwLang.getText(wwLib.resolveObjectPropertyPath(option, labelField)),
                    value: wwLib.resolveObjectPropertyPath(option, valueField),
                    data: option,
                };

            return typeof option === 'object'
                ? {
                      label: wwLib.wwLang.getText(wwLib.resolveObjectPropertyPath(option, labelField)),
                      value: wwLib.resolveObjectPropertyPath(option, valueField),
                      image: wwLib.resolveObjectPropertyPath(option, 'image'),
                      style: {
                          backgroundColor: wwLib.resolveObjectPropertyPath(option, 'bgColor') || '#FFFFFF00',
                          color: wwLib.resolveObjectPropertyPath(option, 'textColor') || '#000000',
                      },
                  }
                : {
                      // to allow flat array / option
                      label: option,
                      value: option,
                  };
        },
        getLabel(option) {
            if (!option || option.label === undefined || option.label === null) return '';
            return `${option.label}`;
        },
        handleOpening(value) {
            if (!this.$refs.select) return;

            if (value) this.$refs.select.open();
            else this.$refs.select.close();
        },
        handleObserver() {
            if (!this.$refs.select) return;
            if (this.resizeObserver) this.resizeObserver.disconnect();

            const el = this.$refs.select.el;
            this.adaptivePadding = el && el.style && el.style.padding ? el.style.padding : this.adaptivePadding;
            this.resizeObserver = new ResizeObserver(() => {
                this.adaptivePadding =
                    el && el.style && el.style.padding ? this.$el.style.padding : this.adaptivePadding;
            });
            this.resizeObserver.observe(this.$el, { box: 'device-pixel-content-box' });
        },
        checkIsOpen() {
            /* wwEditor:start */
            if (!this.isEditing) return;
            this.handleOpening(this.wwEditorState.sidepanelContent.openInEditor);
            /* wwEditor:end */
        },
    },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style type="scss" scoped>
/* We need to use multiselect classname  */
.ww-input-select {
    --ms-bg: transparent;

    --ms-border-width: 0px;
    position: relative;

    &.is-active {
        box-shadow: unset;
    }

    /* wwEditor:start */
    &.editing {
        pointer-events: none;
    }
    /* wwEditor:end */
}
.ww-input-select::v-deep .multiselect-search {
    padding: var(--adaptive-padding);
}
.ww-input-select::v-deep .multiselect-single-label {
    position: relative !important;
    line-height: inherit !important;
    padding: 0px !important;
    width: 100%;
}
.ww-input-select::v-deep .multiselect-option {
    padding: 0px !important;
    width: 100%;
}
.ww-input-select::v-deep .multiselect-placeholder-el {
    flex-grow: 1;
    width: 100%;
}
.ww-input-select::v-deep .image-text-layout {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.ww-input-select::v-deep .free-layout {
    width: 100%;
}
</style>
