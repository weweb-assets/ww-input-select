<template>
    <div class="ww-select">
        <!-- <wwElement class="ww-select__dropdown" v-bind="content.dropdown" v-show="isOpen" /> -->
        <wwLayout class="ww-select__trigger" path="_trigger" />
        <wwLayout class="ww-select__dropdown" path="_dropdown" />
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    setup(props) {
        const isOpen = ref(true);
        const selectedValue = ref(props.content.value);

        const isDisabled = computed(() => props.content.disabled);
        const isReadonly = computed(() => props.content.readonly);
        const isMultiple = computed(() => props.content.multiple);

        const toggleDropdown = () => {
            if (!isDisabled.value && !isReadonly.value) {
                // isOpen.value = !isOpen.value;
            }
        };

        watch(
            () => props.content.value,
            newValue => {
                selectedValue.value = newValue;
            }
        );

        return {
            isOpen,
            selectedValue,
            isDisabled,
            isReadonly,
            isMultiple,
            toggleDropdown,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-select {
    position: relative;
    // Add more styles as needed
}

.ww-select__trigger {
    cursor: pointer;
    // Add more styles as needed
}

.ww-select__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    // Add more styles as needed
}
</style>
