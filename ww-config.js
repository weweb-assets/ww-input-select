export default {
    editor: {
        label: { en: 'Form Dropdown', fr: 'Sélecteur de Formulaire' },
    },
    properties: {
        globalStyle: {
            type: 'Object',
            options: {
                item: {
                    color: {
                        label: { en: 'Color', fr: 'Couleur' },
                        type: 'Color',
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
                    },
                },
            },
            defaultValue: { color: 'black', fontSize: '15px' },
        },
        globalSettings: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    name: {
                        label: { en: 'Name', fr: 'Name' },
                        type: 'Text',
                        options: { placeholder: 'Name' },
                    },
                    required: {
                        label: { en: 'Required', fr: 'Requis' },
                        type: 'OnOff',
                    },
                    multiple: {
                        label: { en: 'Multiple', fr: 'Multiple' },
                        type: 'OnOff',
                    },
                    placeholder: {
                        label: { en: 'Placeholder', fr: 'Placeholder' },
                        type: 'Text',
                        options: { placeholder: 'Type text' },
                        multiLang: true,
                    },
                    options: {
                        label: { en: 'Options', fr: 'Options' },
                        type: 'List',
                        options: {
                            options: [
                                { path: 'value', type: 'Text', options: { placeholder: 'Value' } },
                                { path: 'name', type: 'Text', options: { placeholder: 'Value' }, multiLang: true },
                            ],
                        },
                    },
                },
            },
            defaultValue: {
                name: '',
                required: true,
                multiple: false,
                placeholder: { en: 'Select' },
                options: [
                    { value: 'option', name: { en: 'option - 1', fr: 'option - 1' } },
                    { value: 'option2', name: { en: 'option - 2', fr: 'option - 2' } },
                ],
            },
        },
    },
};
