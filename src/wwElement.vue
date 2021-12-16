<template v-if="content.globalSettings">
    <select
        v-model="value"
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="content.globalSettings.name"
        :required="content.globalSettings.required"
        :multiple="content.globalSettings.multiple"
        :style="style"
    >
        <option value selected disabled>{{ wwLang.getText(content.globalSettings.placeholder) }}</option>
        <option v-for="option in content.globalSettings.options" :key="option.value" :value="option.value">
            {{ wwLang.getText(option.name) }}
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
    emits: ['trigger-event'],
    setup(props) {
        const internalVariableId = computed(() => props.content.globalSettings.variableId);
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
        style() {
            return {
                color: this.content.globalStyle.color,
                fontSize: `${this.content.globalStyle.fontSize}`,
            };
        },
    },
    mounted() {
        if (this.content.initialValue !== undefined && !this.content.globalSettings.variableId)
            this.value = this.content.initialValue;
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
