<template>
    <select
        class="ww-form-dropdown"
        :class="{ 'ww-editing': isEditing }"
        :name="content.config.name"
        :required="content.config.required"
        :multiple="content.config.multiple"
        :style="style"
    >
        <option value selected disabled>{{ wwLang.getText(content.config.placeholder) }}</option>
        <option class="option" v-for="option in content.config.options" :key="option.value" :value="option.value">
            {{ wwLang.getText(option.name) }}
        </option>
    </select>
</template>

<script>
/* wwEditor:start */
import openPopup from './popups';
/* wwEditor:end */

export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        config: {
            name: 'name',
            required: true,
            multiple: false,
            placeholder: {
                en: 'Name',
                fr: 'Nom',
            },
            options: [
                {
                    value: 'option',
                    name: { en: 'option en', fr: 'option fr' },
                },
                {
                    value: 'option2',
                    name: { en: 'option2 en', fr: 'option2 fr' },
                },
            ],
        },
        style: {
            fontSize: 1,
            color: 'black',
        },
    },
    data() {
        return {
            wwLang: wwLib.wwLang,
        };
    },
    computed: {
        isEditing() {
            return this.wwEditorState.editMode === wwLib.wwSectionHelper.EDIT_MODES.CONTENT;
        },
        style() {
            return {
                color: this.content.style.color || 'black',
                fontSize: `${this.content.style.fontSize || 1}rem`,
            };
        },
    },
    /* wwEditor:start */
    methods: {
        async setOptions() {
            const result = await openPopup(this.content);
            if (result) this.$emit('update', result);
        },
    },
    /* wwEditor:end */
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
    &.ww-editing {
        pointer-events: none;
    }
    /* wwEditor:end */
}
</style>
