<template v-if="content">
    <select
        v-model="value"
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="content.name"
        :required="content.required"
        :multiple="content.multiple"
        :style="style"
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
import { computed } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
    },
    emits: ['trigger-event', 'update:content:effect', 'update:sidepanel-content'],
    setup(props) {
        const internalVariableId = computed(() => props.content.variableId);
        const variableId = wwLib.wwVariable.useComponentVariable(props.uid, 'value', '', internalVariableId);

        return { variableId };
    },
    data() {
        return {
            internalValue: '',
        };
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
                if (this.variableId) return wwLib.wwVariable.getValue(this.variableId);
                return this.internalValue;
            },
            set(value) {
                this.$emit('trigger-event', { name: 'change', event: { value } });
                this.internalValue = value;
                if (this.variableId) wwLib.wwVariable.updateValue(this.variableId, value);
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
        'content.initialValue'(value) {
            if (value !== undefined && !this.content.variableId) {
                this.value = value[this.content.valueField || this.content.displayField] || value;
            }
        },
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind) this.$emit('update:content:effect', { displayField: null, valueField: null });
        },
        /* wwEditor:end */
    },
    mounted() {
        if (this.content.initialValue !== undefined && !this.content.variableId) {
            this.value = this.content.initialValue;
        }
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
