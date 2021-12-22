export default {
    editor: {
        label: { en: 'Form Dropdown', fr: 'Sélecteur de Formulaire' },
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { value: '' } }],
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
        isObjectsCollection: {
            type: 'OnOff',
            editorOnly: true,
            hidden: true,
            defaultValue: true,
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
                            value_ww: {
                                label: { en: 'Value' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { value_ww: 'option', name: { en: 'option - 1', fr: 'option - 1' } },
                { value_ww: 'option2', name: { en: 'option - 2', fr: 'option - 2' } },
            ],
            bindable: true,
        },
        displayField: {
            hidden: content =>
                !content.options ||
                (content.options && typeof content.options[0] === 'object' && 'value_ww' in content.options[0]) ||
                (content.options && typeof content.options[0] !== 'object'),
            label: {
                en: 'Display field',
                fr: 'Display field',
            },
            type: 'TextSelect',
            options: content => {
                const data = content.options;
                const options = content.itemsProperties
                    .map(item => {
                        return data && (typeof data[0][item] === 'string' || typeof data[0][item] === 'number')
                            ? { value: item, label: { en: item } }
                            : null;
                    })
                    .filter(item => !!item);

                return {
                    options: [{ value: 'none', label: { en: 'Select a property' } }, ...options],
                };
            },
            defaultValue: 'none',
            section: 'settings',
        },
        valueField: {
            hidden: content =>
                !content.options ||
                (content.options && typeof content.options[0] === 'object' && 'value_ww' in content.options[0]) ||
                (content.options && typeof content.options[0] !== 'object'),
            label: {
                en: 'Value field',
                fr: 'Value field',
            },
            type: 'TextSelect',
            options: content => {
                const options = content.itemsProperties
                    .map(item => {
                        return { value: item, label: { en: item } };
                    })
                    .filter(item => !!item);

                return {
                    options: [{ value: 'none', label: { en: 'Select a property' } }, ...options],
                };
            },
            defaultValue: 'none',
            section: 'settings',
        },
        variableId: {
            label: {
                en: 'Associated variable',
            },
            type: 'Variable',
            options: {
                types: ['String', 'Number', 'Query'],
            },
            section: 'settings',
            bindable: true,
            defaultValue: null,
            hidden: content => !content.variableId,
        },
        initialValue: {
            label: {
                en: 'Initial value',
            },
            type: 'Text',
            bindable: true,
            section: 'settings',
            hidden: content => content.variableId,
        },
        placeholder: {
            label: { en: 'Placeholder', fr: 'Placeholder' },
            type: 'Text',
            options: { placeholder: 'Type text' },
            multiLang: true,
            section: 'settings',
            defaultValue: { en: 'Select' },
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
        name: {
            label: { en: 'Name', fr: 'Name' },
            type: 'Text',
            options: { placeholder: 'Name' },
            section: 'settings',
            defaultValue: '',
        },
        itemsProperties: {
            hidden: true,
            defaultValue: [],
        },
    },
};
