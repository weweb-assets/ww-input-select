export default {
    editor: {
        label: 'Select',
        icon: 'select',
        bubble: true,
        customStylePropertiesOrder: [
            'choices',
            'selectType',
            'initValueSingle',
            'initValueMulti',
            'initialState',
            [
                'disabled',
                'required',
                'readonly',
                'limit',
                'canUnselect',
                'closeOnSelect',
                'closeOnClickOutside',
                'manualToggle',
            ],
            ['forceOpenInEditor'],
        ],
    },
    inherit: {
        type: 'ww-layout',
    },
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'grid', 'inline-flex', 'inline-grid'],
    },
    states: ['readonly'],
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        choices: {
            label: {
                en: 'Data',
            },
            type: 'ObjectList',
            options: {
                useSchema: true,
            },
            bindable: true,
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
                tooltip: 'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...]`',
            },
            /* wwEditor:end */
        },
        selectType: {
            label: 'Type',
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
            defaultValue: 'single',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['single', 'multiple'],
                tooltip: 'A string value, either "single" or "multiple"',
            },
            /* wwEditor:end */
        },
        initValueSingle: {
            type: 'Text',
            label: 'Initial value (single)',
            bindable: true,
            defaultValue: null,
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
            hidden: content => content.selectType !== 'single',
        },
        initValueMulti: {
            type: 'Array',
            label: 'Initial value (Multi)',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                ],
                tooltip: 'An array of values: \n\n`["myValue1", "myValue2"]`',
            },
            /* wwEditor:end */
            hidden: content => content.selectType !== 'multiple',
        },
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
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
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        limit: {
            label: { en: 'Values limit' },
            type: 'Number',
            defaultValue: null,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number value: \n\n`1`, `2`, `3`, etc.',
            },
            /* wwEditor:end */
            hidden: content => content.selectType !== 'multiple',
        },
        forceOpenInEditor: {
            label: { en: 'Force open in editor' },
            type: 'OnOff',
            defaultValue: false,
            editorOnly: true,
        },
        initialState: {
            label: { en: 'Initial state' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'closed', label: 'Closed' },
                    { value: 'open', label: 'Open' },
                ],
            },
            defaultValue: 'closed',
        },
        canUnselect: {
            label: { en: 'Can unselect' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        closeOnSelect: {
            label: { en: 'Close on select' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        manualToggle: {
            label: { en: 'Manual toggle' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Control the dropdown open state manually. A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        trigger: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: '061bdf96-de5d-4a01-a95c-4eb30b9b10aa',
            },
        },
        dropdown: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'a23203a7-1238-4b5d-94c4-e19dd3b22516',
            },
        },
        closeOnClickOutside: {
            label: { en: 'Close on click outside' },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
    },
};
