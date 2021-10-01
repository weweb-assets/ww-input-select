<template v-if="content.globalSettings">
    <select
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
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        style() {
            return {
                color: this.content.globalStyle.color,
                fontSize: `${this.content.globalStyle.fontSize}`,
            };
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
