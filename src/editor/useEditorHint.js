import { provide, ref } from 'vue';

export default function useEditorHint() {
    provide('_wwSelectIsInSelect', ref(true));
    return {};
}
