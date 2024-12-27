const virtualScrollHelp =
    'Virtual scrolling optimizes performance by only rendering visible options and a small buffer around them. When enabled, this feature can significantly improve loading and scrolling performance for large lists.</br></br>Important notes:</br>- The layout will be forced to a vertical list format</br>- Option items must be positioned at the root level of the Options List';

const bufferHelp =
    'The buffer is the amount of pixel to add to edges of the scrolling visible area to start rendering items further away.';

const minItemSizeHelp = 'The minimum height of an item in the virtual scroll.';

const sizeDependenciesHelp =
    'The main property that can affect the size of the item. This prop will be watched and if it changes, the size will be recomputed.';

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
            'showEmptyStateInEditor',
            [
                'dropdownTitle',
                'dropdownPaddingX',
                'dropdownPaddingY',
                'dropdownBorderColor',
                'dropdownBorderWidth',
                'dropdownBorderRadius',
                'dropdownBgColor',
                'dropdownWidth',
                'side',
                'align',
                'offsetX',
                'offsetY',
                'boundOffset',
            ],
        ],
        customSettingsPropertiesOrder: [
            [
                'triggerTitle',
                'placeholder',
                'initialState',
                'selectType',
                'selectTypeWarning',
            ],
            [
                'optionsTitle',
                'disabled',
                'required',
                'readonly',
                'limit',
                'canUnselect',
                'closeOnSelect',
                'closeOnClickOutside',
                'manualToggle',
                'selectOnClick',
                'virtualScroll',
                'virtualScrollBuffer',
                'virtualScrollMinItemSize',
                'virtualScrollSizeDependencies',
            ],
            [
                'searchTitle',
                'showSearch',
                'searchBy',
                'autoFocus',
            ]
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
        // >>>>>>>>>>> SELECT <<<<<<<<<<
        choices: {
            label: {
                en: 'Options',
            },
            type: 'ObjectList',
            options: {
                useSchema: true,
            },
            bindable: true,
            defaultValue: [{ "label": "Alexy", "value": "alexy" }, { "label": "Carlier", "value": "carlier" }],
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
            defaultValue: {
                "type": "f",
                "code": "context.mapping?.['label']"
            },
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
            defaultValue: {
                "type": "f",
                "code": "context.mapping?.['value']"
            },
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

        // >>>>>>>>>>> TRIGGER <<<<<<<<<<
        triggerTitle: {
            section: 'settings',
            hidden: content => content.customMenu,
            type: 'Title',
            label: {
                en: 'Trigger',
            },
            editorOnly: true,
        },
        placeholder: {
            label: {
                en: 'Placeholder',
                fr: 'Texte par défaut',
            },
            type: 'Text',
            defaultValue: { en: 'Select a value' },
            section: 'settings',
            bindable: true,
            multiLang: true,
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The placeholder text for the select. Available in the formula explorer in the Trigger element.',
            },
            /* wwEditor:end */
        },
        triggerContainer: {
            hidden: true,
            defaultValue: [{
                isWwObject: true,
                type: 'ww-flexbox',
                name: 'Trigger container',
                content: {
                    children: [
                        {
                            isWwObject: true,
                            type: 'ww-text',
                            content: { text: { en: 'Select a value' } },
                        },
                        {
                            isWwObject: true,
                            type: 'ww-icon',
                            content: { icon: 'fas fa-caret-down', color: '#000000' },
                        },
                    ],
                },
            }],
            navigator: {
                group: 'Trigger',
            },
        },

        // >>>>>>>>>>> DROPDOWN <<<<<<<<<<
        dropdownTitle: {
            hidden: content => content.customMenu,
            type: 'Title',
            label: {
                en: 'Dropdown',
            },
            editorOnly: true,
        },
        dropdownPaddingX: {
            label: { en: 'Padding X' },
            type: 'Length',
            label: { en: 'Dropdown padding X' },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 10, max: 50 },
                    { value: 'em', label: 'em', min: 1, max: 50 },
                    { value: 'rem', label: 'rem', min: 1, max: 50 },
                ],
            },
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
            defaultValue: '8px',
        },
        dropdownPaddingY: {
            label: { en: 'Padding X' },
            type: 'Length',
            label: { en: 'Dropdown padding Y' },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 10, max: 50 },
                    { value: 'em', label: 'em', min: 1, max: 50 },
                    { value: 'rem', label: 'rem', min: 1, max: 50 },
                ],
            },
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
            defaultValue: '8px',
        },
        dropdownBorderColor: {
            type: 'Color',
            label: {
                en: 'Dropdown border color',
            },
            bindable: true,
            options: {
                nullable: true,
            },
            classes: true,
            states: true,
            defaultValue: '#099af2',
        },
        dropdownBorderWidth: {
            type: 'Length',
            label: {
                en: 'Dropdown border width',
            },
            bindable: true,
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 10 }],
                noRange: true,
                useVar: true,
            },
            classes: true,
            states: true,
            defaultValue: '1px',
        },
        dropdownBorderRadius: {
            type: 'Length',
            label: {
                en: 'Dropdown border radius',
            },
            bindable: true,
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 50 }],
                noRange: true,
                useVar: true,
            },
            classes: true,
            states: true,
            defaultValue: '4px',
        },
        dropdownBgColor: {
            type: 'Color',
            label: {
                en: 'Dropdown background color',
            },
            bindable: true,
            options: {
                nullable: true,
            },
            classes: true,
            states: true,
        },
        dropdownWidth: {
            type: 'Length',
            label: {
                en: 'Dropdown width',
            },
            bindable: true,
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 100, max: 500 },
                    { value: '%', label: '%', min: 10, max: 100 },
                ],
                noRange: true,
                useVar: true,
            },
            classes: true,
            states: true,
            defaultValue: '100%',
        },
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
            hidden: true,
        },
        side: {
            label: { en: 'Side' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'bottom', label: 'Bottom' },
                    { value: 'left', label: 'Left' },
                    { value: 'top', label: 'Top' },
                    { value: 'right', label: 'Right' },
                ],
            },
            defaultValue: 'bottom',
            // hidden: content => content.autoPosition,
        },
        align: {
            label: { en: 'Align' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'start', label: 'Start' },
                    { value: 'center', label: 'Center' },
                    { value: 'end', label: 'End' },
                ],
            },
            defaultValue: 'start',
            // hidden: content => content.autoPosition,
        },
        offsetX: {
            label: { en: 'Offset X' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: -100, max: 100 },
                    { value: '%', label: '%', min: -100, max: 100 },
                ],
            },
            defaultValue: '0px',
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip:
                    'The horizontal offset of the dropdown relative to the trigger. A number value: \n\n`4`, `8`, `12`, etc.',
            },
            propertyHelp: {
                tooltip: 'The horizontal offset of the dropdown relative to the trigger.',
            },
            /* wwEditor:end */
        },
        offsetY: {
            label: { en: 'Offset Y' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: -100, max: 100 },
                    { value: '%', label: '%', min: -100, max: 100 },
                ],
            },
            defaultValue: '0px',
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip:
                    'The vertical offset of the dropdown relative to the trigger. A number value: \n\n`4`, `8`, `12`, etc.',
            },
            propertyHelp: {
                tooltip: 'The vertical offset of the dropdown relative to the trigger.',
            },
            /* wwEditor:end */
        },
        boundOffset: {
            label: { en: 'Edge offset' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 100 },
                ],
            },
            defaultValue: '0px',
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip:
                    'Offset to the edge of the screen when the dropdown should change the side to opposite when there is no space for it. A number value: \n\n`4`, `8`, `12`, etc.',
            },
            propertyHelp: {
                tooltip:
                    'Offset to the edge of the screen when the dropdown should change the side to opposite when there is no space for it.',
            },
            /* wwEditor:end */
        },
        dropdownContent: {
            hidden: true,
            defaultValue: []
        },

        // >>>>>>>>>>> OPTION LIST <<<<<<<<<<
        optionsTitle: {
            section: 'settings',
            hidden: content => content.customMenu,
            type: 'Title',
            label: {
                en: 'Options',
            },
            editorOnly: true,
        },
        virtualScroll: {
            label: { en: 'Virtual scroll' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'boolean' }],
                tooltip: virtualScrollHelp,
            },
            propertyHelp: {
                tooltip: virtualScrollHelp,
            },
            /* wwEditor:end */
        },
        virtualScrollBuffer: {
            label: { en: 'Buffer' },
            type: 'Number',
            defaultValue: 600,
            bindable: true,
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip: bufferHelp,
            },
            propertyHelp: {
                tooltip: bufferHelp,
            },
            /* wwEditor:end */
            hidden: content => !content.virtualScroll,
        },
        virtualScrollMinItemSize: {
            label: { en: 'Min item size' },
            type: 'Number',
            defaultValue: 40,
            bindable: true,
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip: minItemSizeHelp,
            },
            propertyHelp: {
                tooltip: minItemSizeHelp,
            },
            /* wwEditor:end */
            hidden: content => !content.virtualScroll,
        },
        virtualScrollSizeDependencies: {
            label: { en: 'Size dependencies' },
            type: 'TextSelect',
            section: 'settings',
            options: (_, sidepanelContent) => {
                return {
                    options: Object.keys(sidepanelContent.optionProperties).map(property => ({
                        value: property,
                        label: property,
                    })),
                };
            },
            hidden: content => !content.virtualScroll,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'string' }],
                tooltip: sizeDependenciesHelp,
            },
            propertyHelp: {
                tooltip: sizeDependenciesHelp,
            },
            /* wwEditor:end */
        },
        showEmptyStateInEditor: {
            label: { en: 'Show empty state in editor' },
            type: 'OnOff',
            defaultValue: false,
            editorOnly: true,
        },
        optionProperties: {
            hidden: true,
            editorOnly: true,
        },
        emptyStateContainer: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-flexbox',
                name: 'Empty state',
                content: {
                    children: [
                        {
                            isWwObject: true,
                            type: 'ww-text',
                            content: { default: { "_ww-text_text": 'No items found' } },
                        },
                    ]
                },
            },
            navigator: {
                group: 'Dropdown',
            },
        },

        // >>>>>>>>>>> OPTION <<<<<<<<<<
        /* wwEditor:start */
        selectTypeWarning: {
            type: 'InfoBox',
            section: 'settings',
            options: (_, sidepanelContent) => ({
                title: sidepanelContent.isInTrigger ? 'Value override' : 'Label and value override',
                content: sidepanelContent.isInTrigger
                    ? `When "Value per item" is configured in the Select root element, it will override any value defined in this Option element.`
                    : `When "Label per item" and "Value per item" are configured in the Select root element, they will override any label and value defined in this Option element.`,
            }),
        },
        /* wwEditor:end */
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            bindable: true,
            defaultValue: false,
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the option is disabled: `true | false`',
            },
            /* wwEditor:end */
        },
        selectOnClick: {
            label: { en: 'Select on click' },
            type: 'OnOff',
            bindable: true,
            defaultValue: true,
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether the option should be automatically selected when clicked.',
            },
            propertyHelp: {
                tooltip: 'Whether the option should be automatically selected when clicked.',
            },
            /* wwEditor:end */
            hidden: (_, sidepanelContent) => sidepanelContent.isInTrigger,
        },
        unselectOnClick: {
            label: { en: 'Unselect on click' },
            type: 'OnOff',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the option is automatically unselected on click: `true | false`',
            },
            /* wwEditor:end */
            hidden: (_, sidepanelContent) => !sidepanelContent.isInTrigger,
        },
        optionChoiceElement: {
            hidden: true,
            defaultValue: [{
                isWwObject: true,
                type: 'ww-flexbox',
                name: 'Option container',
                content: {
                    children: [
                        {
                            isWwObject: true,
                            type: 'ww-text',
                            content: {
                                text: { en: 'Option' }, "_ww-text_text": {
                                    "en": {
                                        "__wwtype": "f",
                                        "code": "context.item.data?.['label']"
                                    }
                                }
                            },
                        },
                        {
                            isWwObject: true,
                            type: 'ww-icon',
                            content: { icon: 'icon-check', color: '#000000' },
                        },
                    ],
                },
            }],
            navigator: {
                group: 'Dropdown',
            },
        },

        // >>>>>>>>>>> SEARCH <<<<<<<<<<
        searchTitle: {
            section: 'settings',
            hidden: content => content.customMenu,
            type: 'Title',
            label: {
                en: 'Search',
            },
            editorOnly: true,
        },
        showSearch: {
            label: { en: 'Search' },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
            section: 'settings',
        },
        searchBy: {
            label: 'Search by',
            section: 'settings',
            bindable: true,
            type: 'Array',
            options: (_, sidepanelContent) => {
                return {
                    item: {
                        type: 'Object',
                        options: {
                            item: {
                                filter: {
                                    type: 'ObjectPropertyPath',
                                    options: { object: sidepanelContent.optionProperties || {} },
                                    defaultValue: '',
                                },
                            },
                        },
                    },
                };
            },
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Which properties of the choices are searchable.',
            },
            /* wwEditor:end */
        },
        autoFocus: {
            label: 'Auto focus',
            section: 'settings',
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'boolean' }],
                tooltip: 'Whether the search input should be focused when the dropdown is opened.',
            },
            /* wwEditor:end */
        },
        inputElement: {
            hidden: true,
            section: 'settings',
            defaultValue: {
                isWwObject: true,
                name: 'Search input',
                type: 'deb10a01-5eef-4aa1-9017-1b51c2ad6fd0',
            },
            navigator: {
                group: 'Dropdown',
            },
        },
    },
};
