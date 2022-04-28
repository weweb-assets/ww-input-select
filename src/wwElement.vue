<template v-if="content">
    <select
        v-if="!isReadonly"
        ref="input"
        v-model="internalValue"
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="wwElementState.name"
        :required="content.required"
        :style="textStyle"
    >
        <option value selected disabled>
            {{ wwLang.getText(content.placeholder) }}
        </option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">
            {{ option.name }}
        </option>
    </select>
    <wwText v-else :text="selectedOption ? selectedOption.name : ''"></wwText>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event', 'update:content:effect', 'add-state', 'remove-state'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: props.content.value === undefined ? '' : props.content.value,
        });

        return { variableValue, setValue };
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
                if (!this.options.some(option => option.value === this.variableValue)) return '';
                return this.variableValue;
            },
            set(value) {
                const rawOption = this.options.find(option => option.value == value);
                if (rawOption.value === this.internalValue) return;
                this.setValue(rawOption.value);
                this.$emit('trigger-event', { name: 'change', event: { value: rawOption.value } });
            },
        },
        options() {
            if (!this.content.options) return [];
            let data = this.content.options;
            if (data && !Array.isArray(data) && typeof data === 'object') {
                data = new Array(data);
            } else if ((data && !Array.isArray(data)) || typeof data !== 'object') {
                return [];
            }

            return data
                .filter(item => !!item)
                .map(item => {
                    if (typeof item !== 'object') return { name: item, value: item };
                    const labelField = this.content.labelField || 'name';
                    const valueField = this.content.valueField || 'value';
                    return {
                        name: wwLib.wwLang.getText(wwLib.resolveObjectPropertyPath(item, labelField) || ''),
                        value: wwLib.resolveObjectPropertyPath(item, valueField),
                    };
                });
        },
        selectedOption() {
            return this.options.find(({ value }) => value === this.internalValue);
        },
        textStyle() {
            const style = {
                ...(this.content['_ww-text_font']
                    ? {
                          fontSize: 'unset',
                          fontFamily: 'unset',
                          lineHeight: 'unset',
                          fontWeight: 'unset',
                          font: this.content['_ww-text_font'],
                      }
                    : {
                          fontSize: this.content['_ww-text_fontSize'],
                          fontFamily: this.content['_ww-text_fontFamily'],
                          lineHeight: this.content['_ww-text_lineHeight'],
                          fontWeight: this.content['_ww-text_fontWeight'],
                      }),
                textAlign: this.content['_ww-text_textAlign'],
                color: this.content['_ww-text_color'],
                textTransform: this.content['_ww-text_textTransform'],
                textShadow: this.content['_ww-text_textShadow'],
                letterSpacing: this.content['_ww-text_letterSpacing'],
                wordSpacing: this.content['_ww-text_wordSpacing'],
                textDecoration: this.content['_ww-text_textDecoration'],
                textDecorationStyle: this.content['_ww-text_textDecorationStyle'],
                textDecorationColor: this.content['_ww-text_textDecorationColor'],
            };
            return style;
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
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind) this.$emit('update:content:effect', { labelField: null, valueField: null });
        },
        /* wwEditor:end */
        'content.value'(newValue) {
            if (newValue === this.internalValue) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
        'content.readonly'(value) {
            if (value) {
                this.$emit('add-state', 'readonly');
            } else {
                this.$emit('remove-state', 'readonly');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-form-dropdown {
    outline: none;
    width: 100%;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    /* wwEditor:start */
    &.editing {
        pointer-events: none;
    }
    /* wwEditor:end */
}
</style>
