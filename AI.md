---
name: ww-input-select
description: A customizable dropdown select input field with search, infinite scroll, and custom styling features for selecting predefined options with text or custom layouts.
keywords:
    - select
    - combobox
    - selection
    - dropdown select
    - multi-select
    - multi selection
    - select items
---

#### ww-input-select

1. **Component Purpose:** A customizable select component that supports single and multiple selection.

2. **Properties:**

    - choices: array<{ label: string, value: any }> - Array of options to display in the dropdown. Don't forget linked dynamicConfiguration in settings.
    - mappingLabel: Formula - A formula to derive the label from each choice item. Always use 'context.mapping...'
    - mappingValue: Formula - A formula to derive the value from each choice item. Always use 'context.mapping...'
    - mappingDisabled: Formula - A formula applyed to each choice item to disable or not them. Always use 'context.mapping...'
    - initValueSingle: `string | null` - Initial value for single select mode. Default: `null`
    - initValueMulti: `Array<string>` - Initial values for multiple select mode. Default: `[]`
    - selectType: `'single' | 'multiple'` - Type of selection. Default: `'single'`
    - disabled: `boolean` - Whether the select is disabled. Default: `false`
    - required: `boolean` - Whether the select is required. Default: `false`
    - readonly: `boolean` - Whether the select is read-only. Default: `false`
    - closeOnSelect: `boolean` - Whether to close dropdown after selection. Default: `false`
    - manualTrigger: `boolean` - Whether to disable automatic trigger opening. Default: `false`
    - closeOnClickOutside: `boolean` - Whether to close on outside click. Default: `true`
    - selectOnClick: `boolean` - Whether to select option on click. Default: `true`
    - unselectOnClick: `boolean` - Whether to unselect option on click. Default: `false`
    - showSearch: `boolean` - Whether to show search input. Default: `false`
    - searchBy: `Array<object>` - Properties to search by in options
    - autoFocus: `boolean` - Whether to focus search input on open. Default: `true`
    - virtualScroll: `boolean` - Enable virtual scrolling. Default: `false`
    - virtualScrollBuffer: `number` - Buffer size for virtual scroll. Default: `600`
    - virtualScrollMinItemSize: `number` - Minimum item size for virtual scroll. Default: `40`
    - placeholder: `string | object` - Placeholder text. Default: `{ en: 'Select a value' }`
    - fieldName: `string` - Form field name. Default: `""`
    - customValidation: `boolean` - Enable custom validation. Default: `false`
    - validation: `Formula` - Custom validation formula

    - selectedFontSize: `string` - Font size of selected value. Default: `'14px'`
    - selectedFontWeight: `number | null` - Font weight of selected value
    - selectedFontColor: `string` - Font color of selected value. Default: `'#333'`
    - selectedTextAlign: `'left' | 'center' | 'right'` - Text alignment. Default: `'left'`

    - placeholderFontSize: `string` - Font size of placeholder. Default: `'14px'`
    - placeholderFontWeight: `number | null` - Font weight of placeholder
    - placeholderFontColor: `string` - Font color of placeholder. Default: `'#333'`

    - triggerWidth: `string` - Width of trigger. Default: `'100%'`
    - triggerHeight: `string` - Height of trigger
    - triggerBorder: `boolean` - When false, borders defined with triggerBorderAll, when true, use each triggerBorderTop..
    - triggerBorderAll: `Border` - All borders when not split
    - triggerBorderTop: `Border` - Top border when split
    - triggerBorderRight: `Border` - Right border when split
    - triggerBorderBottom: `Border` - Bottom border when split
    - triggerBorderLeft: `Border` - Left border when split
    - triggerBorderRadius: `string` - Border radius. Default: `'0px'`
    - triggerBgColor: `string` - Background color
    - triggerShadows: `string` - Box shadows. Default: `''`
    - triggerPadding: `string` - Padding. Default: `'0px'`
    - triggerMargin: `string` - Margin. Default: `'0px'`
    - triggerIconOpen: `string` - Icon when open. Default: `'fas fa-angle-up'`
    - triggerIconClose: `string` - Icon when closed. Default: `'fas fa-angle-down'`
    - triggerIconColor: `string` - Icon color. Default: `'black'`
    - triggerIconSize: `string` - Icon size. Default: `'16px'`

    - dropdownWidth: `string` - Width of dropdown. Default: `[Trigger Width]`
    - dropdownMaxHeight: `string` - Maximum height of dropdown
    - dropdownBorder: `boolean` - When false, borders defined with dropdownBorderAll, when true, use each borderLeft..
    - dropdownBorderAll: `Border` - All borders when not split
    - dropdownBorderTop: `Border` - Top border when split
    - dropdownBorderRight: `Border` - Right border when split
    - dropdownBorderBottom: `Border` - Bottom border when split
    - dropdownBorderLeft: `Border` - Left border when split
    - dropdownBorderRadius: `string` - Border radius. Default: `'0px'`
    - dropdownBgColor: `string` - Background color
    - dropdownShadows: `string` - Box shadows. Default: `''`
    - dropdownOverflowY: `'visible' | 'hidden' | 'auto' | 'scroll'` - Vertical overflow. Default: `'auto'`
    - dropdownPadding: `string` - Padding. Default: `'0px'`
    - offsetX: Length - Horizontal offset of the dropdown relative to the trigger. Default: '0px'.
    - offsetY: Length - Vertical offset of the dropdown relative to the trigger. Default: '8px'.

    - optionFontSize: `string` - Font size. Default: `'14px'`
    - optionFontWeight: `number | null` - Font weight
    - optionFontColor: `string` - Text color. Default: `'black'`
    - optionPadding: `string` - Padding. Default: `'0px'`
    - optionBorderRadius: `string` - Border radius. Default: `'0px'`
    - optionBgColor: `string` - Background color
    - optionBgColorFocused: `string` - Background color when focused. Default: `'#f5f5f5'`
    - optionBgColorHover: `string` - Background color on hover. Default: `'#f5f5f5'`
    - optionCursor: `string` - Cursor type. Default: `'pointer'`
    - optionIcon: `string` - Check icon. Default: `'fas fa-check'`
    - optionIconColor: `string` - Icon color. Default: `'black'`
    - optionIconSize: `string` - Icon size. Default: `'16px'`

    - searchWidth: `string` - Width of search input. Default: `'100%'`
    - searchHeight: `string` - Height of search input
    - searchBorder: `boolean` - When false, borders defined with searchBorderAll, when true, use each searchBorderTop..
    - searchBorderAll: `Border` - All borders when not split
    - searchBorderTop: `Border` - Top border when split
    - searchBorderRight: `Border` - Right border when split
    - searchBorderBottom: `Border` - Bottom border when split
    - searchBorderLeft: `Border` - Left border when split
    - searchBorderRadius: `string` - Border radius. Default: `'0px'`
    - searchPadding: `string` - Padding. Default: `'0px'`
    - searchMargin: `string` - Margin. Default: `'0px'`
    - searchOutline: `Border` - Outline style
    - searchFontFamily: `string` - Font family
    - searchFontSize: `string` - Font size
    - searchFontColor: `string` - Font color. Default: `'black'`
    - searchBgColor: `string` - Background color. Default: `'white'`
    - searchPlaceholderColor: `string` - Placeholder color. Default: `'gray'`

3. **Settings:**

-   dynamicConfiguration: object({"content":{"choices":[{"key":"nameOfKey","type"="typeOfKey"}]}}) - Object that describe format of data in choices

4. **Children Components:**

There is no children.

5. **Special Features:**

This select contain all logic for the select and all styling is done throught properties defined bellow. **CRITIAL** : Style it perfectly and completely.

6. **Context:**

-   context.local.data.select: { select: { options: array<{ label: Text, value: value (according to mappingValue), disabled: bool, isSelected: bool, \_data: rawData defined in choices }>, active: { value: variableValue (according to mappingValue), details: { value: variableValue (according to mappingValue), label: variableLabel (according to mappingLabel), disabled: bool, data: full selected data (dynamicConfiguration format) } }, utils: { type: selectType, isOpen, triggerWidth, triggerHeight } }, selectTrigger: { placeholder: Text } }

7. **Events:**

-   change: Triggered when selection changes. Payload: { value: any }
-   initValueChange: Triggered when initial value changes. Payload: { value: any }

8. **Variables:**

-   value: any|array - Current selected value(s). Type depends on selectType (single/multiple)

9. **Exemple:**

{"uid":"ww-input-select-car-type","tag":"ww-input-select","name":"Fuel Type Select","settings":{"workflows":[...],"dynamicConfiguration":{"content":{"choices":[{"key":"label","type":"Text"},{"key":"value","type":"Text"},{"key":"icon","type":"Text"}]}}},"props":{"default":{"choices":[{"label":"Gasoline","value":"gasoline","icon":"⛽"},{"label":"Diesel","value":"diesel","icon":"🛢️"},{"label":"Electric","value":"electric","icon":"⚡"}],"mappingLabel":{"type":"f","code":"context.mapping?.['icon'] + ' ' + context.mapping?.['label']"},"mappingValue":{"type":"f","code":"context.mapping?.['value']"},"placeholder":{"en":"Choose fuel type"},"triggerWidth":"100%","triggerHeight":"40px","triggerBorderRadius":"8px","triggerBorder":false,"triggerBorderAll":"1px solid #E2E8F0","triggerPadding":"8px 16px","triggerBgColor":"#FFFFFF","dropdownBorderRadius":"8px","dropdownBorder":false,"dropdownBorderAll":"1px solid #E2E8F0","dropdownPadding":"8px","dropdownBgColor":"#FFFFFF","optionPadding":"8px 16px","optionBorderRadius":"8px","optionFontSize":"14px","optionBgColorHover":"#F7FAFC","selectedFontSize":"14px","selectedFontColor":"#2D3748","mappingDisabled":{"type":"f","code":"false"},"selectType":"single","disabled":false,"required":false,"readonly":false,"initialState":"closed","closeOnSelect":true,"manualTrigger":false,"closeOnClickOutside":true,"side":"bottom","align":"start","offsetX":"0px","offsetY":"8px","zIndexOpen":1,"boundOffset":"0px","virtualScroll":false,"virtualScrollBuffer":600,"virtualScrollMinItemSize":40,"selectOnClick":true,"unselectOnClick":false,"showSearch":true,"autoFocus":true,"fieldName":"","customValidation":false,"validation":"","selectedTextAlign":"left","placeholderFontSize":"14px","placeholderFontColor":"#333","triggerShadows":"","triggerMargin":"0px","triggerIconOpen":"fas fa-angle-up","triggerIconClose":"fas fa-angle-down","triggerIconColor":"#666666","triggerIconSize":"16px","dropdownWidth":{"__wwtype":"f","code":"context.local.data?.['select']?.['select']?.['utils']?.['triggerWidth']+'px'"},"dropdownShadows":"","dropdownOverflowY":"auto","optionFontColor":"black","optionBgColorFocused":"#f5f5f5","optionCursor":"pointer","optionIcon":"fas fa-check","optionIconColor":"black","optionIconSize":"16px","searchWidth":"100%","searchBorder":false,"searchBorderRadius":"6px","searchPadding":"8px 12px","searchMargin":"0 0 8px 0","searchFontColor":"#2D3748","searchBgColor":"#F7FAFC","searchPlaceholderColor":"#A0AEC0","searchHeight":"32px","searchBorderAll":"1px solid #E2E8F0"}},"styles":{"default":{"width":"100%","maxWidth":"300px"}}}
