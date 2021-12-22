<template v-if="content">
    <select
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="content.name"
        :required="content.required"
        :multiple="content.multiple"
        :style="style"
        @input="handleInput"
    >
        <option value selected disabled>{{ wwLang.getText(content.placeholder) }}</option>
        <option v-for="(option, index) in options" :key="index" :value="getLabel(option)">
            {{ getLabel(option) }}
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
        isCollectionId() {
            return typeof this.content.collection === 'string';
        },
        isObjectsCollection() {
            if (this.options && this.options[0]) {
                const itemType = typeof this.options[0];
                if (itemType === 'object') return true;
            }

            return false;
        },
        options() {
            if (!this.content.options) return;
            let data = this.content.options;
            if (data && !Array.isArray(data) && typeof data === 'object') {
                return new Array(data);
            } else if ((data && !Array.isArray(data)) || typeof data !== 'object') {
                return [{}];
            }
            console.log('test !');
            return data.filter(item => !!item);
        },
        style() {
            return {
                color: this.content.color,
                fontSize: `${this.content.fontSize}`,
            };
        },
    },
    watch: {
        'content.options'(data) {
            if (data && data[0]) {
                if (typeof data[0] !== 'object') return;
                this.$emit('update:content:effect', { itemsProperties: Object.keys(data[0]) });
                setTimeout(() => {
                    if (this.content.itemsProperties && this.content.itemsProperties[0]) {
                        this.$emit('update:content:effect', { displayField: this.content.itemsProperties[0] });
                        this.$emit('update:content:effect', { valueField: this.content.itemsProperties[0] });
                    }
                }, 200);
            }
        },
        /* wwEditor:start */
        isObjectsCollection: {
            handler(value) {
                this.$emit('update:sidepanel-content', { path: 'isObjectsCollection', value });
            },
            imediate: true,
        },
        'content.initialValue'(value) {
            if (value !== undefined && !this.content.variableId) {
                this.value = value[this.content.valueField || this.content.displayField] || value;
                this.$el.selectedIndex = this.options.indexOf(value) + 1;
            }
        },
        /* wwEditor:end */
    },
    mounted() {
        if (this.content.initialValue !== undefined && !this.content.variableId) {
            this.value = this.content.initialValue;
        }
    },
    methods: {
        getLabel(item) {
            if (typeof item === 'object' && 'value_ww' in item) return wwLib.wwLang.getText(item.name);
            if (!this.isObjectsCollection && !this.isCollectionId) return item;
            if (this.content.displayField === 'none') return '';
            if (item && item[this.content.displayField]) return item[this.content.displayField];
            return item;
        },
        handleInput(event) {
            if (this.content.options && typeof this.content.options[0] !== 'object') {
                this.value = event.target.value;
            } else {
                if ('value_ww' in this.content.options[0]) {
                    this.value = this.options[event.target.selectedIndex - 1]['value_ww'];
                } else if (this.options && this.options.length && this.content.displayField) {
                    this.value =
                        this.options[event.target.selectedIndex - 1][
                            this.content.valueField && this.content.valueField !== 'none'
                                ? this.content.valueField
                                : this.content.displayField
                        ];
                }
            }
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
