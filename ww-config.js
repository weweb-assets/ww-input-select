export default {
    editor: {
        label: { en: 'Form Dropdown', fr: 'Sélecteur de Formulaire' },
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' } },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
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
        options: {
            label: { en: 'Options', fr: 'Options' },
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            name: {
                                label: { en: 'Display Name' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                                multiLang: true,
                            },
                            value: {
                                label: { en: 'Value' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { value: 'option', name: { en: 'option - 1', fr: 'option - 1' } },
                { value: 'option2', name: { en: 'option - 2', fr: 'option - 2' } },
            ],
            bindable: true,
        },
        displayField: {
            hidden: (content, sidepanelContent, boundProps) =>
                !boundProps.options || !content.options || (content.options && typeof content.options[0] !== 'object'),
            label: {
                en: 'Display field',
                fr: 'Display field',
            },
            type: 'TextSelect',
            options: (content, sidepanelContent) => {
                const data = content.options;
                const options = sidepanelContent.itemsProperties
                    .map(item => {
                        return data && (typeof data[0][item] === 'string' || typeof data[0][item] === 'number')
                            ? { value: item, label: { en: item } }
                            : null;
                    })
                    .filter(item => !!item);

                return {
                    options: [{ value: null, label: { en: 'Select a property' } }, ...options],
                };
            },
            defaultValue: null,
            section: 'settings',
        },
        valueField: {
            hidden: (content, sidepanelContent, boundProps) =>
                !boundProps.options || !content.options || (content.options && typeof content.options[0] !== 'object'),
            label: {
                en: 'Value field',
                fr: 'Value field',
            },
            type: 'TextSelect',
            options: (content, sidepanelContent) => {
                const options = sidepanelContent.itemsProperties
                    .map(item => {
                        return { value: item, label: { en: item } };
                    })
                    .filter(item => !!item);

                return {
                    options: [{ value: null, label: { en: 'Select a property' } }, ...options],
                };
            },
            defaultValue: null,
            section: 'settings',
        },
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Text',
            bindable: true,
            section: 'settings',
        },
        placeholder: {
            label: { en: 'Placeholder', fr: 'Placeholder' },
            type: 'Text',
            options: { placeholder: 'Type text' },
            multiLang: true,
            section: 'settings',
            defaultValue: { en: 'Select' },
            bindable: true,
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
        itemsProperties: {
            hidden: true,
            defaultValue: [],
            editorOnly: true,
        },
    },
};
