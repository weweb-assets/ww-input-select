const virtualScrollHelp =
    'Virtual scrolling optimizes performance by only rendering visible options and a small buffer around them. When enabled, this feature can significantly improve loading and scrolling performance for large lists.</br></br>Important notes:</br>- The layout will be forced to a vertical list format</br>- Option items must be positioned at the root level of the Options List';

const bufferHelp =
    'The buffer is the amount of pixel to add to edges of the scrolling visible area to start rendering items further away.';

const minItemSizeHelp = 'The minimum height of an item in the virtual scroll.';

export default {
    editor: {
        label: 'Select',
        icon: 'select',
        customStylePropertiesOrder: [
            [
                'selectedTitle',
                'selectedFontFamily',
                'selectedFontSize',
                'selectedFontWeight',
                'selectedFontColor',
                'selectedPadding',
                'selectedTextAlign',
            ],
            [
                'placeholderTitle',
                'placeholderFontFamily',
                'placeholderFontSize',
                'placeholderFontWeight',
                'placeholderFontColor',
                'placeholderTextAlign',
            ],
            [
                'chipStylesTitle',
                'chipFontFamily',
                'chipFontSize',
                'chipFontWeight',
                'chipFontColor',
                'chipPadding',
                'chipBgColor',
                'chipBorder',
                'chipBorderAll',
                'chipBorderTop',
                'chipBorderRight',
                'chipBorderBottom',
                'chipBorderLeft',
                'chipBorderRadius',
                'chipIconUnselect',
                'chipIconColor',
                'chipIconSize',
            ],
            [
                'triggerStylesTitle',
                'triggerHeight',
                'triggerBorder',
                'triggerBorderAll',
                'triggerBorderTop',
                'triggerBorderRight',
                'triggerBorderBottom',
                'triggerBorderLeft',
                'triggerBorderRadius',
                'triggerBgColor',
                'triggerShadows',
                'triggerPadding',
                'triggerMargin',
                'triggerIconClose',
                'triggerIconOpen',
                'triggerIconSize',
                'triggerIconColor',
            ],
            [
                'dropdownStylesTitle',
                'side',
                'align',
                'offsetX',
                'offsetY',
                'boundOffset',
                'dropdownWidth',
                'dropdownMaxHeight',
                'dropdownBorder',
                'dropdownBorderAll',
                'dropdownBorderTop',
                'dropdownBorderRight',
                'dropdownBorderBottom',
                'dropdownBorderLeft',
                'dropdownBorderRadius',
                'dropdownBgColor',
                'dropdownShadows',
                'dropdownPadding',
                'dropdownRowGap',
                'zIndexOpen',
            ],
            [
                'optionStylesTitle',
                'optionFontFamily',
                'optionFontSize',
                'optionFontWeight',
                'optionFontColor',
                'optionPadding',
                'optionBorder',
                'optionBorderRadius',
                'optionBgColor',
                'optionBgColorFocused',
                'optionBgColorHover',
                'optionCursor',
                'optionIcon',
                'optionIconSize',
                'optionIconColor',
            ],
            [
                'emptyStateStylesTitle',
                'emptyStateFontFamily',
                'emptyStateFontSize',
                'emptyStateFontWeight',
                'emptyStateFontColor',
                'emptyStatePadding',
                'emptyStateTextAlign',
            ],
            [
                'searchStylesTitle',
                'searchWidth',
                'searchHeight',
                'searchBorder',
                'searchBorderAll',
                'searchBorderTop',
                'searchBorderRight',
                'searchBorderBottom',
                'searchBorderLeft',
                'searchBorderRadius',
                'searchPadding',
                'searchMargin',
                'searchOutline',
                'searchOutlineOffset',
                'searchBgColor',
                'searchFontFamily',
                'searchFontSize',
                'searchFontWeight',
                'searchFontColor',
                'searchPlaceholderColor',
            ],
        ],
        customSettingsPropertiesOrder: [
            'forceOpenInEditor',
            'showEmptyStateInEditor',
            'choices',
            'mappingLabel',
            'mappingValue',
            'mappingDisabled',
            'initValueSingle',
            'initValueMulti',
            [
                'triggerTitle',
                'placeholder',
                'emptyStateText',
                'searchPlaceholder',
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
                'unselectOnClick',
                'closeOnSelect',
                'closeOnClickOutside',
                'manualTrigger',
                'selectOnClick',
                'virtualScrollBuffer',
                'virtualScrollMinItemSize',
            ],
            ['searchTitle', 'showSearch', 'searchBy', 'autoFocus'],
            'formInfobox',
            ['fieldName', 'customValidation', 'validation'],
        ],
    },
    options: {
        autoByContent: true,
        displayAllowedValues: ['block'],
        //ignoredStyleProperties: ['border','borderRadius','background','outline'],
    },
    states: ['readonly'],
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    actions: [
        {
            label: 'Open',
            action: 'actionOpenDropdown',
            args: [],
        },
        {
            label: 'Close',
            action: 'actionCloseDropdown',
            args: [],
        },
        {
            label: 'Toggle',
            action: 'actionToggleDropdown',
            args: [],
        },
        {
            label: 'Set value',
            action: 'actionUpdateValue',
            args: [
                {
                    name: 'Value',
                    type: 'any',
                    required: true,
                },
            ],
        },
        {
            label: 'Reset value',
            action: 'actionResetValue',
            args: [],
        },
        {
            label: 'Remove specific value (multiselect)',
            action: 'actionRemoveSpecificValue',
            args: [
                {
                    name: 'Value',
                    type: 'any',
                    required: true,
                },
            ],
        },
        {
            label: 'Reset search',
            action: 'actionResetSearch',
            args: [],
        },
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
            defaultValue: {
                __wwtype: 'f',
                code: '[{"label":"Option 1","value":"option1"},{"label":"Option 2","value":"option2"}]',
            },
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
            section: 'settings',
        },
        mappingLabel: {
            label: 'Label per item',
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.choices) ? content.choices[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['label']",
            },
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The label of the current option item. This will not automatically show this label on the screen, its purpose is accessibility and allowing easy bounding of the choice label. <br/> <br/> This will be executed for each item in the options to return the label. ',
            },
            /* wwEditor:end */
            section: 'settings',
        },
        mappingValue: {
            label: 'Value per item',
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.choices) ? content.choices[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['value']",
            },
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The value of the current option item. This will be used to identify the option in the Select. <br/> <br/> This will be executed for each item in the options to return the value.',
            },
            /* wwEditor:end */
            section: 'settings',
        },
        mappingDisabled: {
            label: 'Disabled condition per item',
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.choices) ? content.choices[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: 'false',
            },
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The condition that determines if the option is disabled. This will be executed for each item in the options to return a boolean value.',
            },
            /* wwEditor:end */
            section: 'settings',
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
            section: 'settings',
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
                    defaultValue: '',
                },
            },
            section: 'settings',
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
        forceOpenInEditor: {
            label: { en: 'Force open in editor' },
            type: 'OnOff',
            defaultValue: false,
            editorOnly: true,
            section: 'settings',
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
            bindable: true,
            responsive: true,
            states: true,
            defaultValue: 'closed',
            section: 'settings',
        },
        closeOnSelect: {
            label: { en: 'Close on select' },
            type: 'OnOff',
            defaultValue: true,
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
        manualTrigger: {
            label: { en: 'Manual trigger' },
            type: 'OnOff',
            defaultValue: false,
            states: true,
            bindable: true,
            responsive: true,
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
            states: true,
            bindable: true,
            responsive: true,
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
            states: true,
            bindable: true,
            responsive: true,
            multiLang: true,
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The placeholder text for the select. Available in the formula explorer in the Trigger element.',
            },
            /* wwEditor:end */
        },
        emptyStateText: {
            label: {
                en: 'No results text',
                fr: 'Texte aucun résultat',
            },
            type: 'Text',
            defaultValue: {
                en: 'No results found',
                fr: 'Aucun résultat trouvé',
            },
            section: 'settings',
            states: true,
            bindable: true,
            responsive: true,
            multiLang: true,
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The text to display when there are no results. Available in the formula explorer in the Trigger element.',
            },
            /* wwEditor:end */
        },
        searchPlaceholder: {
            label: {
                en: 'Search placeholder',
                fr: 'Placeholder recherche',
            },
            type: 'Text',
            defaultValue: {
                en: 'Search',
                fr: 'Rechercher',
            },
            section: 'settings',
            states: true,
            bindable: true,
            responsive: true,
            multiLang: true,
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'The placeholder text for the search input. Available in the formula explorer in the Trigger element.',
            },
            /* wwEditor:end */
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
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'string' }],
                tooltip:
                    'The side of the dropdown relative to the trigger. A string value: \n\n`bottom`, `left`, `top`, `right`',
            },
            /* wwEditor:end */
            hidden: content => true,
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
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'string' }],
                tooltip:
                    'The alignment of the dropdown relative to the trigger. A string value: \n\n`start`, `center`, `end`',
            },
            /* wwEditor:end */
            hidden: content => true,
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
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip:
                    'The horizontal offset of the dropdown relative to the trigger. A length value: \n\n`4px`, `50%`, `8rem`, etc.',
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
            defaultValue: '8px',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip:
                    'The vertical offset of the dropdown relative to the trigger. A length value: \n\n`4px`, `50%`, `8rem`, etc.',
            },
            propertyHelp: {
                tooltip: 'The vertical offset of the dropdown relative to the trigger.',
            },
            /* wwEditor:end */
        },
        zIndexOpen: {
            label: { en: 'Z-index when open' },
            type: 'Number',
            defaultValue: 2,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip: 'The z-index of the dropdown when it is open.',
            },
            propertyHelp: {
                tooltip: 'The z-index of the dropdown when it is open.',
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
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'number' }],
                tooltip:
                    'Offset to the edge of the screen when the dropdown should change the side to opposite when there is no space for it. A length value: \n\n`4px`, `50%`, `8rem`, etc.',
            },
            propertyHelp: {
                tooltip:
                    'Offset to the edge of the screen when the dropdown should change the side to opposite when there is no space for it.',
            },
            /* wwEditor:end */
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
        // virtualScroll: {
        //     label: { en: 'Virtual scroll' },
        //     type: 'OnOff',
        //     defaultValue: true,
        //     states: true,
        //     bindable: true,
        //     responsive: true,
        //     section: 'settings',
        //     hidden: true,
        //     /* wwEditor:start */
        //     bindingValidation: {
        //         validations: [{ type: 'boolean' }],
        //         tooltip: virtualScrollHelp,
        //     },
        //     propertyHelp: {
        //         tooltip: virtualScrollHelp,
        //     },
        //     /* wwEditor:end */
        // },
        virtualScrollBuffer: {
            label: { en: 'Buffer' },
            type: 'Number',
            defaultValue: 600,
            states: true,
            bindable: true,
            responsive: true,
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
            // hidden: content => !content.virtualScroll,
        },
        virtualScrollMinItemSize: {
            label: { en: 'Min item size' },
            type: 'Number',
            defaultValue: 40,
            states: true,
            bindable: true,
            responsive: true,
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
            // hidden: content => !content.virtualScroll,
        },
        showEmptyStateInEditor: {
            label: { en: 'Show empty state in editor' },
            type: 'OnOff',
            defaultValue: false,
            editorOnly: true,
            section: 'settings',
        },
        optionProperties: {
            hidden: true,
            editorOnly: true,
        },

        // >>>>>>>>>>> OPTION <<<<<<<<<<
        selectOnClick: {
            label: { en: 'Select on click' },
            type: 'OnOff',
            states: true,
            bindable: true,
            responsive: true,
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
        },
        unselectOnClick: {
            label: { en: 'Unselect on click' },
            type: 'OnOff',
            states: true,
            bindable: true,
            responsive: true,
            defaultValue: false,
            /* wwEditor:start */
            section: 'settings',
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the option is automatically unselected on click: `true | false`',
            },
            /* wwEditor:end */
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
            defaultValue: false,
            states: true,
            bindable: true,
            responsive: true,
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
            states: true,
            bindable: true,
            responsive: true,
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
            bindingValidation: {
                validations: [{ type: 'array' }],
                tooltip: `An array of object with properties to search by in filter key. Ex: [{filter: "['key1','key2']"}]`,
            },
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
            states: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'boolean' }],
                tooltip: 'Whether the search input should be focused when the dropdown is opened.',
            },
            /* wwEditor:end */
        },
        /* wwEditor:start */
        form: {
            editorOnly: true,
            hidden: true,
            defaultValue: false,
        },
        formInfobox: {
            type: 'InfoBox',
            section: 'settings',
            options: (_, sidePanelContent) => ({
                variant: sidePanelContent.form?.name ? 'success' : 'warning',
                icon: 'pencil',
                title: sidePanelContent.form?.name || 'Unnamed form',
                content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
                cta: {
                    label: 'Select form',
                    action: 'selectForm',
                },
            }),
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },
        /* wwEditor:end */
        fieldName: {
            label: 'Field name',
            section: 'settings',
            type: 'Text',
            defaultValue: '',
            states: true,
            bindable: true,
            responsive: true,
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },
        customValidation: {
            label: 'Custom validation',
            section: 'settings',
            type: 'OnOff',
            defaultValue: false,
            states: true,
            bindable: true,
            responsive: true,
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },
        validation: {
            label: 'Validation',
            section: 'settings',
            type: 'Formula',
            defaultValue: '',
            states: true,
            bindable: true,
            responsive: true,
            hidden: (content, sidePanelContent) => !sidePanelContent.form?.uid || !content.customValidation,
        },

        /* ------------------------------------
            SELECTED STYLES
        ------------------------------------- */
        selectedTitle: {
            type: 'Title',
            label: { en: 'Selected' },
            hidden: content => content.selectType !== 'single',
        },
        selectedFontFamily: {
            label: {
                en: 'Selected - Font family',
            },
            type: 'FontFamily',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType !== 'single',
        },
        selectedFontSize: {
            type: 'Length',
            label: {
                en: 'Selected - Font size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '14px',
            hidden: content => content.selectType !== 'single',
        },
        selectedFontWeight: {
            label: {
                en: 'Selected - Font weight',
                fr: 'Selected - Graisse',
            },
            type: 'TextSelect',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 100, label: { en: '100 - Thin' } },
                    { value: 200, label: { en: '200 - Extra Light' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Normal' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                    { value: 800, label: { en: '800 - Extra Bold' } },
                    { value: 900, label: { en: '900 - Black' } },
                ],
            },
            defaultValue: null,
            hidden: content => content.selectType !== 'single',
        },
        selectedFontColor: {
            label: {
                en: 'Selected - Font color',
            },
            type: 'Color',
            defaultValue: '#333',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType !== 'single',
        },
        selectedTextAlign: {
            label: { en: 'Selected - Text align' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'left',
            hidden: content => content.selectType !== 'single',
        },

        /* ------------------------------------
            PLACEHOLDER STYLES
        ------------------------------------- */
        placeholderTitle: {
            type: 'Title',
            label: { en: 'Placeholder' },
        },
        placeholderFontFamily: {
            label: {
                en: 'Placeholder - Font family',
            },
            type: 'FontFamily',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        placeholderFontSize: {
            type: 'Length',
            label: {
                en: 'Placeholder - Font size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '14px',
        },
        placeholderFontWeight: {
            label: {
                en: 'Placeholder - Font weight',
                fr: 'Placeholder - Graisse',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 100, label: { en: '100 - Thin' } },
                    { value: 200, label: { en: '200 - Extra Light' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Normal' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                    { value: 800, label: { en: '800 - Extra Bold' } },
                    { value: 900, label: { en: '900 - Black' } },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: null,
        },
        placeholderFontColor: {
            label: {
                en: 'Placeholder - Font color',
            },
            type: 'Color',
            defaultValue: '#333',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        placeholderTextAlign: {
            label: { en: 'Placeholder - Text align' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'left',
            hidden: content => content.selectType !== 'single',
        },

        /* ------------------------------------
            CHIP STYLES
        ------------------------------------- */
        chipStylesTitle: {
            type: 'Title',
            label: {
                en: 'Chip',
            },
            editorOnly: true,
            hidden: content => content.selectType == 'single',
        },
        chipFontFamily: {
            label: {
                en: 'Chip - Font family',
            },
            type: 'FontFamily',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipFontSize: {
            type: 'Length',
            label: {
                en: 'Chip - Font size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '14px',
            hidden: content => content.selectType == 'single',
        },
        chipFontWeight: {
            label: {
                en: 'Chip - Font weight',
                fr: 'Chip - Graisse',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 100, label: { en: '100 - Thin' } },
                    { value: 200, label: { en: '200 - Extra Light' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Normal' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                    { value: 800, label: { en: '800 - Extra Bold' } },
                    { value: 900, label: { en: '900 - Black' } },
                ],
            },
            defaultValue: null,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipFontColor: {
            label: {
                en: 'Chip - Font color',
            },
            type: 'Color',
            defaultValue: 'white',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipPadding: {
            type: 'Spacing',
            label: {
                en: 'Chip - Padding',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '2px 8px',
            hidden: content => content.selectType == 'single',
        },
        chipBgColor: {
            label: {
                en: 'Chip - background color',
            },
            type: 'Color',
            defaultValue: '#363636',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipBorder: {
            type: 'Border',
            label: {
                en: 'Chip - border',
            },
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipBorder: {
            type: 'TextRadioGroup',
            label: { en: 'Chip - Borders' },
            options: {
                choices: [
                    {
                        value: false,
                        title: { en: 'All', fr: 'Tout' },
                        icon: 'border',
                    },
                    {
                        value: true,
                        title: { en: 'Split', fr: 'Split' },
                        icon: 'border-split',
                    },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: {
                __wwtype: 'f',
                code: '[{"label":"Option 1","value":"opt1"},{"label":"Option 2","value":"opt2"}]',
            },
            hidden: content => content.selectType == 'single',
        },
        chipBorderAll: {
            type: 'Border',
            label: {
                en: '',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => content.chipBorder || content.selectType == 'single',
        },
        chipBorderTop: {
            type: 'Border',
            label: {
                en: 'Chip - Border Top',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.chipBorder || content.selectType == 'single',
        },
        chipBorderRight: {
            type: 'Border',
            label: {
                en: 'Chip - Border Right',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.chipBorder || content.selectType == 'single',
        },
        chipBorderBottom: {
            type: 'Border',
            label: {
                en: 'Chip - Border Bottom',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.chipBorder || content.selectType == 'single',
        },
        chipBorderLeft: {
            type: 'Border',
            label: {
                en: 'Chip - Border Left',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.chipBorder || content.selectType == 'single',
        },
        chipBorderRadius: {
            type: 'Spacing',
            label: {
                en: 'Chip - Border radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                isCorner: true,
                noRange: true,
                useVar: true,
            },
            defaultValue: '4px',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipIconUnselect: {
            label: { en: 'Chip - Unselect icon', fr: 'Chip - Icône désélection' },
            type: 'Icon',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'wwi wwi-cross',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the icon code: `"fas fa-check" | "wwi wwi-cross" | "icon-music-note"`',
            },
            /* wwEditor:end */
            hidden: content => content.selectType == 'single',
        },
        chipIconColor: {
            label: { en: 'Chip - Icon color' },
            type: 'Color',
            defaultValue: 'white',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => content.selectType == 'single',
        },
        chipIconSize: {
            type: 'Length',
            label: {
                en: 'Chip - Icon size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            bindable: true,
            responsive: true,
            states: true,
            classes: true,
            defaultValue: '14px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the icon size: `12`',
            },
            /* wwEditor:end */
            hidden: content => content.selectType == 'single',
        },

        /* ------------------------------------
            TRIGGER STYLES
        ------------------------------------- */
        triggerStylesTitle: {
            type: 'Title',
            label: {
                en: 'Trigger',
            },
            editorOnly: true,
        },
        // triggerWidth: {
        //     type: 'Length',
        //     label: {
        //         en: 'Trigger - Width',
        //     },
        //     options: {
        //         unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }, { value: '%', label: '%', min: 1, max: 100 }],
        //         noRange: true,
        //         useVar: true,
        //     },
        //     states: true,
        //     classes: true,
        //     bindable: true,
        //     responsive: true,
        //     defaultValue: '200px',
        // },
        triggerHeight: {
            type: 'Length',
            label: {
                en: 'Trigger - Height',
            },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 1, max: 500 },
                    { value: '%', label: '%', min: 1, max: 100 },
                ],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        triggerBorder: {
            type: 'TextRadioGroup',
            label: { en: 'Trigger - Borders' },
            options: {
                choices: [
                    {
                        value: false,
                        title: { en: 'All', fr: 'Tout' },
                        icon: 'border',
                    },
                    {
                        value: true,
                        title: { en: 'Split', fr: 'Split' },
                        icon: 'border-split',
                    },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: false,
        },
        triggerBorderAll: {
            type: 'Border',
            label: {
                en: '',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '1px solid #B0B0B0',
            hidden: content => content.triggerBorder,
        },
        triggerBorderTop: {
            type: 'Border',
            label: {
                en: 'Trigger - Border Top',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.triggerBorder,
        },
        triggerBorderRight: {
            type: 'Border',
            label: {
                en: 'Trigger - Border Right',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.triggerBorder,
        },
        triggerBorderBottom: {
            type: 'Border',
            label: {
                en: 'Trigger - Border Bottom',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.triggerBorder,
        },
        triggerBorderLeft: {
            type: 'Border',
            label: {
                en: 'Trigger - Border Left',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.triggerBorder,
        },
        triggerBorderRadius: {
            type: 'Spacing',
            label: {
                en: 'Trigger - Border radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                isCorner: true,
                noRange: true,
                useVar: true,
            },
            defaultValue: '4px',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        triggerBgColor: {
            label: {
                en: 'Trigger - background color',
            },
            type: 'Color',
            defaultValue: 'white',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        triggerShadows: {
            type: 'Shadows',
            label: {
                en: 'Trigger - Shadows',
            },
            options: {
                nullable: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '',
        },
        triggerPadding: {
            type: 'Spacing',
            label: {
                en: 'Trigger - Padding',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '8px 16px',
        },
        triggerMargin: {
            type: 'Spacing',
            label: {
                en: 'Trigger - Margin',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '0px',
        },
        triggerIconOpen: {
            label: { en: 'Trigger - Open icon', fr: 'Trigger - Icône ouverte' },
            type: 'Icon',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'fas fa-angle-up',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the icon code: `"fas fa-check" | "wwi wwi-cross" | "icon-music-note"`',
            },
            /* wwEditor:end */
        },
        triggerIconClose: {
            label: { en: 'Trigger - Close icon', fr: 'Trigger - Icône fermée' },
            type: 'Icon',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'fas fa-angle-down',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the icon code: `"fas fa-check" | "wwi wwi-cross" | "icon-music-note"`',
            },
            /* wwEditor:end */
        },
        triggerIconColor: {
            label: { en: 'Trigger - Icon color' },
            type: 'Color',
            defaultValue: 'black',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        triggerIconSize: {
            type: 'Length',
            label: {
                en: 'Trigger - Icon size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            bindable: true,
            responsive: true,
            states: true,
            classes: true,
            defaultValue: '16px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the icon size: `12`',
            },
            /* wwEditor:end */
        },

        /* ------------------------------------
            DROPDOWN STYLES
        ------------------------------------- */
        dropdownStylesTitle: {
            type: 'Title',
            label: {
                en: 'Dropdown',
            },
            editorOnly: true,
        },
        dropdownWidth: {
            type: 'Length',
            label: {
                en: 'Dropdown - Width',
            },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 1, max: 500 },
                    { value: '%', label: '%', min: 1, max: 100 },
                ],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: {
                __wwtype: 'f',
                code: `context.local.data?.['select']?.['select']?.['utils']?.['triggerWidth']+'px'`,
            },
        },
        dropdownMaxHeight: {
            type: 'Length',
            label: {
                en: 'Dropdown - Max-height',
            },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 1, max: 500 },
                    { value: '%', label: '%', min: 1, max: 100 },
                ],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            bindable: true,
        },
        dropdownBorder: {
            type: 'TextRadioGroup',
            label: { en: 'Dropdown - Borders' },
            options: {
                choices: [
                    {
                        value: false,
                        title: { en: 'All', fr: 'Tout' },
                        icon: 'border',
                    },
                    {
                        value: true,
                        title: { en: 'Split', fr: 'Split' },
                        icon: 'border-split',
                    },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: false,
        },
        dropdownBorderAll: {
            type: 'Border',
            label: {
                en: '',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '1px solid #B0B0B0',
            hidden: content => content.dropdownBorder,
        },
        dropdownBorderTop: {
            type: 'Border',
            label: {
                en: 'Dropdown - Border Top',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.dropdownBorder,
        },
        dropdownBorderRight: {
            type: 'Border',
            label: {
                en: 'Dropdown - Border Right',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.dropdownBorder,
        },
        dropdownBorderBottom: {
            type: 'Border',
            label: {
                en: 'Dropdown - Border Bottom',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.dropdownBorder,
        },
        dropdownBorderLeft: {
            type: 'Border',
            label: {
                en: 'Dropdown - Border Left',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.dropdownBorder,
        },
        dropdownBorderRadius: {
            type: 'Spacing',
            label: {
                en: 'Dropdown - Border Border radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                isCorner: true,
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '4px',
        },
        dropdownBgColor: {
            label: {
                en: 'Dropdown - Border Dropdown background color',
            },
            type: 'Color',
            defaultValue: '#FFFFFF',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        dropdownShadows: {
            type: 'Shadows',
            label: {
                en: 'Dropdown - Shadows',
            },
            options: {
                nullable: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '',
        },
        dropdownPadding: {
            type: 'Spacing',
            label: {
                en: 'Dropdown - Padding',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '8px',
        },
        dropdownRowGap: {
            type: 'Length',
            label: {
                en: 'Dropdown - Row gap',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '0px',
        },

        /* ------------------------------------
            OPTION STYLES
        ------------------------------------- */
        optionStylesTitle: {
            type: 'Title',
            label: {
                en: 'Option',
            },
            editorOnly: true,
        },
        optionFontFamily: {
            label: {
                en: 'Option - Font family',
            },
            type: 'FontFamily',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        optionFontSize: {
            type: 'Length',
            label: {
                en: 'Option - Font size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '14px',
        },
        optionFontWeight: {
            label: {
                en: 'Font weight',
                fr: 'Option - Graisse',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 100, label: { en: '100 - Thin' } },
                    { value: 200, label: { en: '200 - Extra Light' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Normal' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                    { value: 800, label: { en: '800 - Extra Bold' } },
                    { value: 900, label: { en: '900 - Black' } },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: null,
        },
        optionFontColor: {
            label: {
                en: 'Option - Text color',
            },
            type: 'Color',
            defaultValue: 'black',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        optionPadding: {
            type: 'Spacing',
            label: {
                en: 'Option - padding',
            },
            defaultValue: '8px',
            states: true,
            classes: true,
            responsive: true,
            bindable: true,
        },
        optionBorder: {
            type: 'Border',
            label: {
                en: 'Border',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        optionBorderRadius: {
            type: 'Spacing',
            label: {
                en: 'Option - Border radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                isCorner: true,
                noRange: true,
                useVar: true,
            },
            defaultValue: '4px',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        optionBgColor: {
            label: {
                en: 'Option - background color',
            },
            type: 'Color',
            defaultValue: 'white',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        optionBgColorFocused: {
            label: {
                en: 'Option - Focus background',
            },
            type: 'Color',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '#f5f5f5',
        },
        optionBgColorHover: {
            label: {
                en: 'Option - Hover background',
            },
            type: 'Color',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '#f5f5f5',
        },
        optionCursor: {
            label: { en: 'Option - cursor' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'auto', label: 'Auto' },
                    { value: 'default', label: 'Default' },
                    { value: 'pointer', label: 'Pointer' },
                    { value: 'none', label: 'None' },
                    { value: 'not-allowed', label: 'Not allowed' },
                    { value: 'help', label: 'Help' },
                    { value: 'text', label: 'Text' },
                    { value: 'move', label: 'Move' },
                    { value: 'grab', label: 'Grab' },
                    { value: 'grabbing', label: 'Grabbing', default: true },
                    { value: 'n-resize', label: 'Arrow up' },
                    { value: 's-resize', label: 'Arrow down' },
                    { value: 'w-resize', label: 'Arrow left' },
                    { value: 'e-resize', label: 'Arrow right' },
                    { value: 'ne-resize', label: 'Arrow top-right' },
                    { value: 'nw-resize', label: 'Arrow top-left' },
                    { value: 'se-resize', label: 'Arrow bottom-right' },
                    { value: 'sw-resize', label: 'Arrow bottom-left' },
                    { value: 'ew-resize', label: 'Arrow left-right' },
                    { value: 'ns-resize', label: 'Arrow up-down' },
                    { value: 'nesw-resize', label: 'Arrow top-right to bottom-left' },
                    { value: 'nwse-resize', label: 'Arrow top-left to bottom-right' },
                    { value: 'zoom-in', label: 'Zoom in' },
                    { value: 'zoom-out', label: 'Zoom out' },
                    { value: 'col-resize', label: 'Column resize' },
                    { value: 'row-resize', label: 'Row resize' },
                    { value: 'all-scroll', label: 'All-scroll' },
                    { value: 'context-menu', label: 'Context menu' },
                    { value: 'cell', label: 'Cell' },
                    { value: 'crosshair', label: 'Crosshair' },
                    { value: 'vertical-text', label: 'Vertical text' },
                    { value: 'alias', label: 'Alias' },
                    { value: 'copy', label: 'Copy' },
                    { value: 'progress', label: 'Progress' },
                    { value: 'wait', label: 'Wait' },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that represent the cursor type',
            },
            /* wwEditor:end */
            defaultValue: 'pointer',
        },
        optionIcon: {
            label: { en: 'Option - Checked icon', fr: 'Option - Icône check' },
            type: 'Icon',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'fas fa-check',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the icon code: `"fas fa-check" | "wwi wwi-cross" | "icon-music-note"`',
            },
            /* wwEditor:end */
        },
        optionIconColor: {
            label: { en: 'Option - Icon color' },
            type: 'Color',
            defaultValue: 'black',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        optionIconSize: {
            type: 'Length',
            label: {
                en: 'Option - Icon size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            bindable: true,
            responsive: true,
            states: true,
            classes: true,
            defaultValue: '12px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the icon size: `12`',
            },
            /* wwEditor:end */
        },

        /* ------------------------------------
            EMPTY STYLES
        ------------------------------------- */
        emptyStateStylesTitle: {
            type: 'Title',
            label: {
                en: 'Empty state',
            },
            editorOnly: true,
        },
        emptyStateFontFamily: {
            label: {
                en: 'Empty state - Font family',
            },
            type: 'FontFamily',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        emptyStateFontSize: {
            type: 'Length',
            label: {
                en: 'Empty state - Font size',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '14px',
        },
        emptyStateFontWeight: {
            label: {
                en: 'Empty state - Font weight',
                fr: 'Empty state - Graisse',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 100, label: { en: '100 - Thin' } },
                    { value: 200, label: { en: '200 - Extra Light' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Normal' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                    { value: 800, label: { en: '800 - Extra Bold' } },
                    { value: 900, label: { en: '900 - Black' } },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: null,
        },
        emptyStateFontColor: {
            label: {
                en: 'Empty state - Text color',
            },
            type: 'Color',
            defaultValue: 'black',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
        },
        emptyStatePadding: {
            type: 'Spacing',
            label: {
                en: 'Empty state - padding',
            },
            defaultValue: '0px',
            states: true,
            classes: true,
            responsive: true,
            bindable: true,
        },
        emptyStateTextAlign: {
            label: { en: 'Empty state - Text align' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: 'center',
        },

        /* ------------------------------------
            SEARCH STYLES
        ------------------------------------- */
        searchStylesTitle: {
            type: 'Title',
            label: {
                en: 'Search',
            },
            editorOnly: true,
            hidden: content => !content.showSearch,
        },
        searchWidth: {
            type: 'Length',
            label: {
                en: 'Search - Width',
            },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 1, max: 500 },
                    { value: '%', label: '%', min: 1, max: 100 },
                ],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '100%',
            hidden: content => !content.showSearch,
        },
        searchHeight: {
            type: 'Length',
            label: {
                en: 'Search - Height',
            },
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 1, max: 500 },
                    { value: '%', label: '%', min: 1, max: 100 },
                ],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchBorder: {
            type: 'Border',
            label: {
                en: 'Search - border',
            },
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchBorder: {
            type: 'TextRadioGroup',
            label: { en: 'Search - Borders' },
            options: {
                choices: [
                    {
                        value: false,
                        title: { en: 'All', fr: 'Tout' },
                        icon: 'border',
                    },
                    {
                        value: true,
                        title: { en: 'Split', fr: 'Split' },
                        icon: 'border-split',
                    },
                ],
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: false,
            hidden: content => !content.showSearch,
        },
        searchBorderAll: {
            type: 'Border',
            label: {
                en: '',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '1px solid #A3A3A3',
            hidden: content => content.searchBorder || !content.showSearch,
        },
        searchBorderTop: {
            type: 'Border',
            label: {
                en: 'Search - Border Top',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.searchBorder || !content.showSearch,
        },
        searchBorderRight: {
            type: 'Border',
            label: {
                en: 'Search - Border Right',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.searchBorder || !content.showSearch,
        },
        searchBorderBottom: {
            type: 'Border',
            label: {
                en: 'Search - Border Bottom',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.searchBorder || !content.showSearch,
        },
        searchBorderLeft: {
            type: 'Border',
            label: {
                en: 'Search - Border Left',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.searchBorder || !content.showSearch,
        },
        searchBorderRadius: {
            type: 'Spacing',
            label: {
                en: 'Search - Border radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                isCorner: true,
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '4px',
            hidden: content => !content.showSearch,
        },
        searchPadding: {
            type: 'Spacing',
            label: {
                en: 'Search - Padding',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '8px 12px',
            hidden: content => !content.showSearch,
        },
        searchMargin: {
            type: 'Spacing',
            label: {
                en: 'Search - Margin',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: '0px 0px 8px 0px',
            hidden: content => !content.showSearch,
        },
        searchOutline: {
            type: 'Border',
            label: {
                en: 'Search - Outline',
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            defaultValue: undefined,
            hidden: content => !content.showSearch,
        },
        searchOutlineOffset: {
            type: 'Length',
            label: {
                en: 'Search - Outline offset',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchFontFamily: {
            label: {
                en: 'Search - Font family',
            },
            type: 'FontFamily',
            defaultValue: undefined,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchFontSize: {
            label: {
                en: 'Search - Font size',
            },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 500 }],
                noRange: true,
                useVar: true,
            },
            classes: true,
            states: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchFontWeight: {
            label: {
                en: 'Search - Font weight',
                fr: 'Search - Graisse',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 100, label: { en: '100 - Thin' } },
                    { value: 200, label: { en: '200 - Extra Light' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Normal' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                    { value: 800, label: { en: '800 - Extra Bold' } },
                    { value: 900, label: { en: '900 - Black' } },
                ],
            },
            defaultValue: null,
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchFontColor: {
            label: {
                en: 'Search - Font color',
            },
            type: 'Color',
            defaultValue: 'black',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchBgColor: {
            label: {
                en: 'Search - background color',
            },
            type: 'Color',
            defaultValue: '#FAFAFA',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
        searchPlaceholderColor: {
            label: {
                en: 'Search - Placeholder color',
            },
            type: 'Color',
            defaultValue: '#737373',
            states: true,
            classes: true,
            bindable: true,
            responsive: true,
            hidden: content => !content.showSearch,
        },
    },
};
