import { ref, watch, inject, nextTick } from 'vue';

export default function useAccessibility({ emit, optionElement, content }) {
    const uid = wwLib.wwUtils.getUid();
    const optionId = `ww-select-option-${content.value}-${uid}`;
    const activeDescendant = inject('_wwSelect:activeDescendant', ref(''));
    const focusFromOptionId = inject('_wwSelect:focusFromOptionId', () => {});

    watch(activeDescendant, () => {
        if (activeDescendant.value === optionId) {
            nextTick(() => {
                if (optionElement.value) {
                    optionElement.value.focus();
                    optionElement.value.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                    emit('add-state', 'focused');
                }
            });
        } else {
            emit('remove-state', 'focused');
        }
    });

    return {
        uid,
        optionId,
        focusFromOptionId,
    };
}
