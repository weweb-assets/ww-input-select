<template v-if="content">
    <select
        ref="input"
        v-model="value"
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="wwElementState.name"
        :required="content.required"
        :multiple="content.multiple"
        :style="style"
        @input="handleManualInput"
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
    emits: ['trigger-event', 'update:content:effect', 'update:sidepanel-content'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable(props.uid, 'value', '');
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
        value: {
            get() {
                return this.variableValue.toString();
            },
            set(value) {
                if (value !== this.variableValue) {
                    this.setValue(value);
                }
            },
        },
        options() {
            if (!this.content.options) return;
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
                    return {
                        name: wwLib.wwLang.getText(item[this.content.displayField || 'name'] || ''),
                        value: item[this.content.valueField || 'value'],
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
        'content.options': {
            immediate: true,
            handler(options) {
                const objectOptions = (options || []).filter(option => option && typeof option === 'object');
                if (objectOptions[0]) {
                    this.$emit('update:sidepanel-content', {
                        path: 'itemsProperties',
                        value: Object.keys(objectOptions[0]),
                    });
                } else {
                    this.$emit('update:sidepanel-content', { path: 'itemsProperties', value: [] });
                }
            },
        },
        'wwEditorState.sidepanelContent.itemsProperties'(newProperties, oldProperties) {
            if (_.isEqual(newProperties, oldProperties)) return;
            if (this.wwEditorState.boundProps.options && newProperties && newProperties[0]) {
                this.$emit('update:content:effect', { displayField: newProperties[0], valueField: newProperties[0] });
            } else {
                this.$emit('update:content:effect', { displayField: null, valueField: null });
            }
        },
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind) this.$emit('update:content:effect', { displayField: null, valueField: null });
        },
        'content.value'(newValue, OldValue) {
            if (newValue === OldValue) return;
            this.value = newValue;
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
            if (!this.options) return;

            const match = this.options.find(
                item => item.value.toString().toLowerCase() === newValue.toString().toLowerCase()
            );
            if (match && match.name) this.$refs.input.value = match.name;
        },
        /* wwEditor:end */
    },
    methods: {
        handleManualInput(event) {
            this.$emit('trigger-event', { name: 'change', event: { value: event.target.value } });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-form-dropdown {
    appearance: none;
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
