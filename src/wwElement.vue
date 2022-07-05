<template>
    <Multiselect
        ref="select"
        v-model="internalValue"
        class="input-multiselect"
        :style="cssVariables"
        :class="{ editing: isEditing }"
        :options="options"
        :close-on-select="content.closeOnSelect"
        :searchable="content.searchable"
        mode="single"
        :disabled="content.disabled"
        :hideSelected="content.hideSelected"
        :placeholder="placeholder"
        :create-option="content.allowCreation"
        :canClear="content.clearIcon"
        :caret="content.caretIcon"
    >
        <!-- Placeholder -->
        <template v-slot:placeholder v-if="placeholder.length">
            <wwElement
                class="multiselect-placeholder-el"
                v-bind="content.placeholderElement"
                :wwProps="{ text: placeholder }"
            />
        </template>

        <!-- Tag selected with remove icon -->
        <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label" :style="value.style || defaultOptionStyle">
                <wwLayoutItemContext :index="value" :item="{}" is-repeat :data="value">
                    <wwElement
                        class="multiselect-single-label-el"
                        v-bind="content.optionElementSelected"
                        :wwProps="{ text: value.label }"
                    />
                </wwLayoutItemContext>
            </div>
        </template>

        <!-- Tag unselected in list -->
        <template v-slot:option="{ option }">
            <wwLayoutItemContext :index="option" :item="{}" is-repeat :data="option">
                <wwElement
                    class="multiselect-single-label-el"
                    v-bind="content.optionElement"
                    :wwProps="{ text: option.label }"
                />
            </wwLayoutItemContext>
        </template>

        <!-- Small triangle displayed on the right of the input -->
        <template v-slot:caret>
            <wwElement v-bind="content.caretIconElement" />
        </template>

        <!-- Clear icon shown when the input has at least one selected options -->
        <template v-slot:clear="{ clear }">
            <wwElement v-bind="content.clearIconElement" @mousedown.prevent="isEditing ? null : clear($event)" />
        </template>
    </Multiselect>
</template>

<script>
import Multiselect from '@vueform/multiselect';

const DEFAULT_LABEL_FIELD = 'label';
const DEFAULT_VALUE_FIELD = 'value';

export default {
    components: { Multiselect },
    emits: ['trigger-event', 'update:content:effect'],
    props: {
        uid: { type: String, required: true },
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    setup(props) {
        const { value: currentSelection, setValue: setCurrentSelection } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'currentSelection',
            type: 'string',
            defaultValue: props.content.initialValue ? props.content.initialValue : '',
        });

        return { currentSelection, setCurrentSelection };
    },
    data: () => ({
        options: [],
    }),
    created() {
        this.init();
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        internalValue: {
            get() {
                if (this.content.allowCreation) {
                    // we need to make available custom options before using them
                    for (const selection of this.currentSelection) {
                        if (!this.options.some(option => option.value === selection)) {
                            this.options.push(this.formatOption(selection));
                        }
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
                '--ms-option-bg-pointed': this.content.optionBackgroundPointed,
                '--ms-option-bg-selected': this.content.optionBackgroundPointed,
                '--ms-option-bg-selected-pointed': this.content.optionBackgroundPointed,
            };
        },
    },
    watch: {
        isEditing() {
            this.handleOpening(this.content.isOpen);
        },
        'content.initialValue'() {
            this.init();
        },
        'content.options'() {
            this.init();
        },
        currentSelection(value) {
            this.$emit('trigger-event', { name: 'change', event: { domEvent: {}, value } });
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
        'content.isOpen'(value) {
            this.handleOpening(value);
        },
        /* wwEditor:end */
    },
    methods: {
        async init() {
            // reset selection and option to avoid mismatch
            this.internalValue = '';
            this.options = [];
            const initialOptions = Array.isArray(this.content.options) ? this.content.options : [];
            const initialValue = this.content.initialValue ? this.content.initialValue : '';
            this.options.push(...initialOptions.map(option => this.formatOption(option)));

            // add initial values as custom options if not already included
            if (this.options.includes(this.internalValue) || Object.values(this.options).includes(this.internalValue))
                this.options.push(initialValue);

            // await to avoid mismatch (multiselect not rendering custom tags)
            await this.$nextTick();
            this.internalValue = initialValue;
        },
        formatOption(option) {
            const labelField = this.content.labelField || DEFAULT_LABEL_FIELD;
            const valueField = this.content.valueField || DEFAULT_VALUE_FIELD;

            return typeof option === 'object'
                ? {
                      label: wwLib.wwLang.getText(wwLib.resolveObjectPropertyPath(option, labelField) || ''),
                      value: wwLib.resolveObjectPropertyPath(option, valueField),
                      style: {
                          backgroundColor:
                              wwLib.resolveObjectPropertyPath(option, 'bgColor') || this.content.optionsDefaultBgColor,
                          color:
                              wwLib.resolveObjectPropertyPath(option, 'textColor') ||
                              this.content.optionsDefaultTextColor,
                      },
                  }
                : {
                      // to allow flat array / option
                      label: option,
                      value: option,
                  };
        },
        handleOpening(value) {
            if (value) this.$refs.select.open();
            else this.$refs.select.close();
        },
    },
    mounted() {
        this.handleOpening(this.content.isOpen);
    },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style type="scss">
.input-multiselect {
    --ms-border-width: 0px;
    position: relative;
    min-height: calc(var(--font-size) + 20px);
    /* wwEditor:start */
    &.editing {
        pointer-events: none;
    }
    /* wwEditor:end */
}
.multiselect-single-label {
    padding: 4px;
    border-radius: 4px;
    width: 100%;
}
.multiselect.is-active {
    box-shadow: unset;
}
.multiselect-caret {
    margin-top: 10px;
    margin-bottom: 10px;
}
.multiselect-dropdown {
    max-height: unset;
}
.multiselect-placeholder-el {
    position: absolute !important;
    top: 50% !important;
    left: 0px !important;
    transform: translateY(-50%);
}
</style>
