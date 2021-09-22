export default {
    editor: {
        label: { fr: 'Sélecteur de Formulaire', en: 'Form Dropdown' },
    },
    properties: {
        color: {
            label: { en: 'Color', fr: 'Couleur' },
            type: 'Color',
            defaultValue: 'black',
        },
        fontSize: {
            label: { en: 'Font size', fr: 'Taille du texte' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 10, max: 50 },
                    { value: 'em', label: 'em', min: 1, max: 50 },
                    { value: 'rem', label: 'rem', min: 1, max: 50 },
                ],
            },
            defaultValue: '15px',
        },
        name: {
            label: { en: 'Name', fr: 'fr' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'Name' },
            defaultValue: '',
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        multiple: {
            label: { en: 'Multiple', fr: 'Multiple' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        placeholders: {
            label: { en: 'Placeholder', fr: 'Placeholder' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'firstname' },
            multiLang: true,
            defaultValue: { en: 'Select' },
        },
        options: {
            label: { en: 'Options', fr: 'fr' },
            type: 'List',
            section: 'settings',
            options: {
                options: [
                    { path: 'value', type: 'Text', options: { placeholder: 'Value' } },
                    { path: 'name', type: 'Text', options: { placeholder: 'Value' }, multiLang: true },
                ],
            },
            defaultValue: [
                { value: 'option', name: { en: 'option - 1', fr: 'option - 1' } },
                { value: 'option2', name: { en: 'option - 2', fr: 'option - 2' } },
            ],
        },
    },
};
