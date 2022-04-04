<template v-if="content">
    <select
        ref="input"
        :value="value"
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="wwElementState.name"
        :required="content.required"
        :style="style"
        @input="handleManualInput($event.target.value)"
    >
        <option value selected disabled>
            {{ wwLang.getText(content.placeholder) }}
        </option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">
            {{ option.name }}
        </option>
    </select>
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
    emits: ['trigger-event', 'update:content:effect'],
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
        value() {
            if (!this.options.some(option => option.value === this.variableValue)) return null;
            return this.variableValue;
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
        style() {
            return {
                color: this.content.color,
                fontSize: `${this.content.fontSize}`,
            };
        },
    },
    watch: {
        /* wwEditor:start */
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind) this.$emit('update:content:effect', { labelField: null, valueField: null });
        },
        /* wwEditor:end */
        'content.value'(newValue) {
            newValue = `${newValue}`;
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
    methods: {
        handleManualInput(value) {
            if (value === this.value) return;
            this.setValue(value);
            this.$emit('trigger-event', { name: 'change', event: { value } });
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
