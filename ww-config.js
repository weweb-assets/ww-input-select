export default {
    editor: {
        label: 'Select',
        icon: 'select',
        customStylePropertiesOrder: [
            'choices',
            'mappingLabel',
            'mappingValue',
            'initValueSingle',
            'initValueMulti',
            'forceOpenInEditor',
        ],
        customSettingsPropertiesOrder: [
            'initialState',
            'selectType',
            'selectTypeWarning',
            'disabled',
            'required',
            'readonly',
            'limit',
            'canUnselect',
            'closeOnSelect',
            'closeOnClickOutside',
            'manualToggle',
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
                en: 'Options',
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
        mappingLabel: {
            label: 'Label per item',
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.choices) ? content.choices[0] : null,
            }),
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The label of the current option item. This will not automatically show this label on the screen, its purpose is accessibility and allowing easy bounding of the choice label. <br/> <br/> This will be executed for each item in the options to return the label. ',
            },
            /* wwEditor:end */
        },
        mappingValue: {
            label: 'Value per item',
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.choices) ? content.choices[0] : null,
            }),
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The value of the current option item. This will be used to identify the option in the Select. <br/> <br/> This will be executed for each item in the options to return the value.',
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
            options: {
                movable: true,
                expandable: true,
                item: {
                    type: 'Text',
                    defaultValue: 'Selected option',
                },
            },
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
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['single', 'multiple'],
                tooltip: 'A string value, either "single" or "multiple"',
            },
            /* wwEditor:end */
        },
        /* wwEditor:start */
        selectTypeWarning: {
            type: 'InfoBox',
            section: 'settings',
            options: {
                title: 'Select type',
                content:
                    'The select configuration and layout are strongly tied to the select type. Changing the type requires understanding how to adjust the layout (specifically the options displayed in the trigger) to match the new type.',
            },
        },
        /* wwEditor:end */
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
            section: 'settings',
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
            section: 'settings',
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
            section: 'settings',
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
            section: 'settings',
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
            section: 'settings',
        },
        canUnselect: {
            label: { en: 'Can unselect' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip:
                    'Whether clicking or selecting already active option will unselect that option. A boolean value: \n\n`true` or `false`',
            },
            propertyHelp: {
                tooltip: 'Whether clicking or selecting already active option will unselect that option.',
            },
            /* wwEditor:end */
            section: 'settings',
        },
        closeOnSelect: {
            label: { en: 'Close on select' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip:
                    'Whether the select dropdown closes when an option is selected. A boolean value: \n\n`true` or `false`',
            },
            propertyHelp: {
                tooltip: 'Whether the select dropdown closes when an option is selected.',
            },
            /* wwEditor:end */
            section: 'settings',
        },
        manualToggle: {
            label: { en: 'Manual toggle' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip:
                    'If set to On, the select will not be opened by clicking on the trigger. You can use the `Toggle` method to open and close the select. A boolean value: \n\n`true` or `false`',
            },
            propertyHelp: {
                tooltip:
                    'If set to On, the select will not be opened by clicking on the trigger. You can use the `Toggle` method to open and close the select.',
            },
            /* wwEditor:end */
            section: 'settings',
        },
        trigger: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'e4e4b973-cb52-4c75-a43e-9490dfcc1883',
            },
        },
        dropdown: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: '6f921d5b-125e-4567-b445-82164f70907a',
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
                tooltip:
                    'Whether the select dropdown closes when clicking outside the dropdown. A boolean value: \n\n`true` or `false`',
            },
            propertyHelp: {
                tooltip: 'Whether the select dropdown closes when clicking outside the dropdown.',
            },
            /* wwEditor:end */
            section: 'settings',
        },
    },
};
