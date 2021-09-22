<template>
    <select
        class="ww-form-dropdown"
        :class="{ editing: isEditing }"
        :name="content.name"
        :required="content.required"
        :multiple="content.multiple"
        :style="style"
    >
        <option value selected disabled>{{ content.placeholder }}</option>
        <option v-for="option in content.options" :key="option.value" :value="option.value">
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
    },
    data() {
        return {
            wwLang: wwLib.wwLang,
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
        style() {
            return {
                color: this.content.color,
                fontSize: `${this.content.fontSize}`,
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
