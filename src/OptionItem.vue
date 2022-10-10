<template>
    <wwElement
        v-if="layoutType === 'text'"
        class="multiselect-single-label-el"
        v-bind="textElement"
        :ww-props="{ text: option.label || '' }"
        :states="optionStates"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    />
    <div
        v-else-if="layoutType === 'imageText'"
        class="multiselect-single-label-el image-text-layout"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <wwElement v-bind="imageElement" :ww-props="{ text: option.label || '' }" :states="optionStates" />
        <wwElement
            class="multiselect-single-label-el"
            v-bind="textElement"
            :ww-props="{ text: option.label || '' }"
            :states="optionStates"
        />
    </div>
    <wwElement
        v-else-if="layoutType === 'free'"
        class="multiselect-single-label-el free-layout"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        v-bind="flexboxElement"
        :states="optionStates"
    />
</template>

<script>
export default {
    props: {
        option: { type: Object, required: true },
        layoutType: { type: String, required: true },
        imageElement: { type: Object, required: true }, // TODO look for hide in navigator
        textElement: { type: Object, required: true },
        flexboxElement: { type: Object, required: true },
        isSelected: { type: Boolean, required: true },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        // TODO label property for search
        optionStates() {
            if (this.isSelected && this.isHovered) return ['Selected:hover'];
            else if (this.isSelected && !this.isHovered) return ['Selected'];

            return [];
        },
    },
};
</script>

<style></style>
