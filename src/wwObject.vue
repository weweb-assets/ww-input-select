<template>
    <select
        v-if="content.globalSettings"
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
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        globalStyle: {
            fontSize: '15px',
            color: 'black',
        },
        globalSettings: {
            name: '',
            required: true,
            multiple: false,
            placeholder: {
                en: 'Select',
            },
            options: [
                {
                    value: 'option',
                    name: { en: 'option - 1', fr: 'option - 1' },
                },
                {
                    value: 'option2',
                    name: { en: 'option - 2', fr: 'option - 2' },
                },
            ],
        },
    },
    /* wwEditor:start */
    wwEditorConfiguration() {
        return {
            settingsOptions: {
                name: {
                    path: 'globalSettings.name',
                    label: { en: 'Name', fr: 'fr' },
                    type: 'Text',
                    options: {
                        placeholder: 'Name',
                    },
                },
                required: {
                    path: 'globalSettings.required',
                    label: { en: 'Required', fr: 'Requis' },
                    type: 'OnOff',
                },
                multiple: {
                    path: 'globalSettings.multiple',
                    label: { en: 'Multiple', fr: 'Multiple' },
                    type: 'OnOff',
                },
                ...(function () {
                    const placeholders = {};
                    for (const lang of wwLib.$store.getters['websiteData/getPage'].langs) {
                        placeholders[`placeholder_${lang}`] = {
                            path: `globalSettings.placeholder.${lang}`,
                            label: { en: `placeholder (${lang})`, fr: 'fr' },
                            type: 'Text',
                            options: {
                                placeholder: 'firstname',
                            },
                        };
                    }
                    return placeholders;
                })(),
                options: {
                    path: 'globalSettings.options',
                    label: { en: 'Options', fr: 'fr' },
                    type: 'List',
                    options: {
                        options: [
                            {
                                path: 'value',
                                type: 'Text',
                                options: {
                                    placeholder: 'Value',
                                },
                            },
                            ...(function () {
                                const options = [];
                                for (const lang of wwLib.$store.getters['websiteData/getPage'].langs) {
                                    options.push({
                                        path: `name.${lang}`,
                                        type: 'Text',
                                        options: {
                                            placeholder: `value ${lang}`,
                                        },
                                    });
                                }
                                return options;
                            })(),
                        ],
                    },
                },
            },
        };
    },
    /* wwEditor:end */
    data() {
        return {
            wwLang: wwLib.wwLang,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwSectionHelper.EDIT_MODES.CONTENT;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        style() {
            if (!this.content || !this.content.globalStyle) return {};
            return {
                color: this.content.globalStyle.color || 'black',
                fontSize: `${this.content.globalStyle.fontSize || '15px'}`,
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
