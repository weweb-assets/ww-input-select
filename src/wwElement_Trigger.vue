<template>
    <div class="ww-input-select__trigger">
        <wwElement class="ww-select-trigger" v-bind="content.triggerContainer" />
    </div>
</template>

<script>
import { provide, computed, inject, ref } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    setup(props) {
        const registerTriggerLocalContext = inject('_wwSelect:registerTriggerLocalContext');

        const options = inject('_wwSelect:options', ref(''));
        const selectValue = inject('_wwSelect:value', ref(''));

        const placeholder = computed(() => wwLib.wwLang.getText(props.content.placeholder));
        const selectedLabel = computed(() => {
            const selectedOption = options.value.find(option => option.value === selectValue.value);
            return selectedOption ? selectedOption.label : '';
        });
        const isOptionSelected = computed(() => !!selectedLabel.value);

        const data = ref({
            placeholder,
        });

        const markdown = `### Select Trigger local informations

- \`placeholder\`: The placeholder text for the select trigger.`;

        registerTriggerLocalContext({ data, methods: {}, markdown });

        return {
            data,
            selectedLabel,
            isOptionSelected,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-input-select__trigger {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.ww-select-trigger {
    width: 100%;
}
</style>