export default {
    editor: {
        label: {
            en: 'Input select',
            fr: 'Champs sélection',
        },
        icon: 'fontawesome/solid/chevron-circle-down',
        customStylePropertiesOrder: [
            ['optionsDefaultBgColor', 'optionsDefaultTextColor'],
            [
                'dropdownBackgroundColor',
                'optionBackgroundPointed',
                'optionBackgroundSelected',
                'optionBackgroundSelectedPointed',
                'dropdownBorderWidth',
                'dropdownBorderColor',
                'dropdownBorderRadius',
                'dropdownMaxHeight',
            ],
            'isCustomStyle',
            'customStyle',
        ],
        customSettingsPropertiesOrder: [
            'isOpen',
            'layoutType',
            'required',
            'readonly',
            'disabled',
            'initialValue',
            'placeholder',
            ['options'],
            ['hintFields', 'labelField', 'valueField', 'textColorField', 'bgColorField'],
            ['advanced', 'searchable', 'closeOnSelect', 'canDeselect'],
            ['clearIcon', 'caretIcon'],
        ],
    },
    options: {
        noBorderRadiusClipping: true,
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true }],
    inherit: { type: 'ww-text', exclude: ['text'] },
    properties: {
        layoutType: {
            label: {
                en: 'Layout type',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'text', label: { en: 'Text' } },
                    { value: 'imageText', label: { en: 'Image with text' } },
                    { value: 'free', label: { en: 'Free layout' } },
                ],
            },
            defaultValue: 'text',
            section: 'settings',
        },
        readonly: {
            label: { en: 'Read only', fr: 'Lecture seule' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.readonly !== undefined),
        },
        isOpen: {
            type: 'OnOff',
            label: {
                en: 'Is open?',
                fr: 'Is open?',
            },
            defaultValue: false,
            bindable: true,
            section: 'settings',
        },
        placeholder: {
            label: {
                en: 'Placeholder',
                fr: 'Texte par défaut',
            },
            type: 'Text',
            defaultValue: { en: 'Placeholder' },
            section: 'settings',
            bindable: true,
            multiLang: true,
        },
        disabled: {
            label: {
                en: 'Disabled',
                fr: 'Désactivé',
            },
            type: 'OnOff',
            defaultValue: false,
            section: 'settings',
            bindable: true,
        },
        advanced: {
            type: 'OnOff',
            label: {
                en: 'Advanced options',
            },
            defaultValue: false,
            bindable: true,
            section: 'settings',
        },
        canDeselect: {
            hidden: content => !content.advanced,
            label: {
                en: 'Can unselect',
            },
            type: 'OnOff',
            defaultValue: false,
            section: 'settings',
        },
        searchable: {
            hidden: content => !content.advanced,
            label: {
                en: 'Searchable',
                fr: 'Recherche',
            },
            type: 'OnOff',
            defaultValue: true,
            section: 'settings',
        },
        closeOnSelect: {
            hidden: content => !content.advanced,
            label: {
                en: 'Close on select',
                fr: 'Ferme à la sélection',
            },
            type: 'OnOff',
            defaultValue: false,
            section: 'settings',
        },
        clearIcon: {
            label: {
                en: 'Clear icon',
            },
            type: 'OnOff',
            defaultValue: false,
            section: 'settings',
        },
        caretIcon: {
            label: {
                en: 'Caret icon',
            },
            type: 'OnOff',
            defaultValue: true,
            section: 'settings',
        },
        initialValue: {
            label: {
                en: 'Initial value',
                fr: 'Valeur initiale',
            },
            type: 'Text',
            bindable: true,
            section: 'settings',
        },
        options: {
            label: { en: 'Options', fr: 'Options' },
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Object',
                    defaultValue: { label: { en: 'New option' }, value: '' },
                    options: {
                        item: {
                            label: {
                                label: { en: 'Label' },
                                type: 'Text',
                                options: { placeholder: 'Label' },
                                multiLang: true,
                            },
                            value: {
                                label: { en: 'Value' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                            image: {
                                hidden: content => content.layoutType !== 'imageText',
                                label: { en: 'Image' },
                                type: 'Text',
                                options: { placeholder: 'Image link' },
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { value: 'option', label: { en: 'option - 1' }, bgColor: '#FFFFFF00', textColor: '#000000' },
                { value: 'option2', label: { en: 'option - 2' }, bgColor: '#FFFFFF00', textColor: '#000000' },
            ],
            bindable: true,
        },
        hintFields: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.options || content.options,
            label: {
                en: 'Options fields',
                fr: 'Champs des options',
            },
            type: 'Info',
            options: {
                text: { en: 'Please provide at least one option to configure fields' },
            },
            editorOnly: true,
            section: 'settings',
        },
        labelField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.options || !content.options,
            label: {
                en: 'Label field',
                fr: 'Label field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.options.length || typeof content.options[0] !== 'object') {
                    return null;
                }

                return { object: content.options[0] };
            },
            defaultValue: '',
            section: 'settings',
        },
        valueField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.options || !content.options,
            label: {
                en: 'Value field',
                fr: 'Value field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.options.length || typeof content.options[0] !== 'object') {
                    return null;
                }

                return { object: content.options[0] };
            },
            defaultValue: '',
            section: 'settings',
        },
        bgColorField: {
            hidden: (content, sidepanelContent, boundProps) =>
                !boundProps.options || !content.options || !content.isCustomStyle,
            label: {
                en: 'Background color field',
                fr: 'Background color field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.options.length || typeof content.options[0] !== 'object') {
                    return null;
                }

                return { object: content.options[0] };
            },
            defaultValue: '#FFFFFF00',
            section: 'settings',
        },
        textColorField: {
            hidden: (content, sidepanelContent, boundProps) =>
                !boundProps.options || !content.options || !content.isCustomStyle,
            label: {
                en: 'Text color field',
                fr: 'Text color field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.options.length || typeof content.options[0] !== 'object') {
                    return null;
                }

                return { object: content.options[0] };
            },
            defaultValue: '#000000',
            section: 'settings',
        },
        placeholderElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-text',
                state: {
                    name: 'Placeholder text',
                    style: {
                        default: {
                            color: '#D1D5DB',
                        },
                    },
                },
            },
            navigator: {
                group: 'Select',
            },
        },
        textElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text', state: { name: 'Option text' } },
            navigator: {
                group: 'Option',
            },
        },
        imageElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-image', state: { name: 'Option image' } },
            navigator: {
                group: 'Option',
            },
        },
        flexboxElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-flexbox',
                state: {
                    name: 'Option container',
                    style: {
                        default: {
                            width: '100%',
                        },
                    },
                },
            },
            navigator: {
                group: 'Option',
            },
        },
        caretIconElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-icon',
                state: {
                    name: 'Caret icon',
                    style: {
                        default: {
                            padding: '0px 12px',
                        },
                    },
                },
                content: { default: { icon: 'fas fa-caret-down', color: '#9CA3AF', fontSize: '16' } },
            },
            navigator: {
                group: 'Select',
            },
        },
        clearIconElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-icon',
                state: {
                    name: 'Clear icon',
                    style: {
                        default: {
                            padding: '12px',
                        },
                    },
                },
                content: { default: { icon: 'wwi wwi-cross', color: '#9CA3AF', fontSize: '14' } },
            },
            navigator: {
                group: 'Select',
            },
        },
        // optionsDefaultBgColor: {
        //     hidden: content => content.isCustomStyle,
        //     label: {
        //         en: 'Default option background',
        //     },
        //     type: 'Color',
        //     defaultValue: '#FFFFFF00',
        // },
        // optionsDefaultTextColor: {
        //     hidden: content => content.isCustomStyle,
        //     label: {
        //         en: 'Default option text color',
        //     },
        //     type: 'Color',
        //     defaultValue: '#000000',
        // },
        // optionBackgroundPointed: {
        //     hidden: content => content.isCustomStyle,
        //     label: {
        //         en: 'Dropdown option hover color',
        //     },
        //     type: 'Color',
        // },
        // optionBackgroundSelected: {
        //     hidden: content => content.isCustomStyle,
        //     label: {
        //         en: 'Dropdown option selected color',
        //     },
        //     type: 'Color',
        // },
        // optionBackgroundSelectedPointed: {
        //     hidden: content => content.isCustomStyle,
        //     label: {
        //         en: 'Dropdown option selected - hover color',
        //     },
        //     type: 'Color',
        // },
        // dropdownBackgroundColor: {
        //     hidden: content => content.isCustomStyle,
        //     label: {
        //         en: 'Dropdown background color',
        //     },
        //     type: 'Color',
        //     defaultValue: '#ffffff',
        // },
        dropdownBorderWidth: {
            hidden: content => content.isCustomStyle,
            type: 'Length',
            label: {
                en: 'Dropdown border width',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 100 }],
            },
            defaultValue: '1px',
        },
        dropdownBorderColor: {
            hidden: content => content.isCustomStyle,
            label: {
                en: 'Dropdown border color',
            },
            type: 'Color',
            defaultValue: '#d1d5db',
        },
        dropdownBorderRadius: {
            hidden: content => content.isCustomStyle,
            type: 'Length',
            label: {
                en: 'Dropdown border radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 100 }],
            },
            defaultValue: '4px',
        },
        dropdownMaxHeight: {
            hidden: content => content.isCustomStyle,
            label: {
                en: 'Dropdown max height',
            },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
            },
            responsive: true,
            states: true,
            defaultValue: '150px',
        },
        isCustomStyle: {
            label: {
                en: 'Full custom style',
            },
            type: 'OnOff',
            defaultValue: false,
        },
        // TODO: configure binding tooltip - https://github.com/vueform/multiselect#styling
        customStyle: {
            hidden: content => !content.isCustomStyle,
            label: {
                en: 'Variables',
            },
            type: 'Info',
            options: {
                text: { en: 'Override select variables' },
            },
            bindable: true,
        },
    },
};
