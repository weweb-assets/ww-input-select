export default {
    editor: {
        label: 'Select',
        icon: 'select',
        bubble: true,
    },
    inherit: {
        type: 'ww-layout',
    },
    states: ['readonly'],
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        items: {
            bindable: 'repeatable',
            label: {
                en: 'Items',
                fr: 'Items',
            },
            type: 'Info',
            options: {
                text: {
                    en: 'Elements to repeat',
                },
            },
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip:
                    'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        value: {
            type: 'Text',
            label: 'Initial value',
            settings: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'string',
                    },
                ],
                tooltip: 'A string value: \n\n`"myValue"`, or an array of values: \n\n`["myValue1", "myValue2"]`',
            },
            /* wwEditor:end */
        },
        name: {
            type: 'Text',
            label: 'Radio name',
            settings: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string value for the radio name: \n\n`"myRadioName"`',
            },
            /* wwEditor:end */
        },
        selectType: {
            label: 'Select type',
            type: 'TextSelect',
            options: {
                options: [
                    {
                        value: 'single',
                        label: 'Single',
                    },
                    {
                        value: 'multiple',
                        label: 'Multiple',
                    },
                ],
            },
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['single', 'multiple'],
                tooltip: 'A string value, either "single" or "multiple"',
            },
            /* wwEditor:end */
        },
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        required: {
            label: { en: 'Required' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        readonly: {
            label: { en: 'Read-only' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        canUnselect: {
            label: { en: 'Can unselect' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        forceOpenInEditor: {
            label: { en: 'Force open in editor' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            editorOnly: true,
        },
        loadOnScroll: {
            label: { en: 'Load on scroll' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        options: {
            label: { en: 'Options' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip:
                    'An array of option objects: \n\n`[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]`',
            },
            /* wwEditor:end */
        },
        dropdown: {
            hidden: true,
            defaultValue: [
                {
                    isWwObject: true,
                    type: 'f0751328-1cf9-44bd-9a4b-133d93b96762',
                },
            ],
        },
    },
};
