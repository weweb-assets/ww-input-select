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

1. **Component Purpose:** A customizable select element that supports single and multiple selection.

2. **Properties:**

    - choices: `array<{ label: string, value: any }>` - Array of object (options) to display in the dropdown. Don't forget linked dynamicConfiguration in settings. It can not be an array of primitive values, always an array of objects.
    - mappingLabel: `Formula` - A formula to derive the label from each choice item, only text, no img, icons, etc. Always use 'context.mapping...'
    - mappingValue: `Formula` - A formula to derive the value from each choice item. Always use 'context.mapping...'
    - mappingDisabled: `Formula` - A formula applyed to each choice item to disable or not them. Always use 'context.mapping...'
    - initValueSingle: `string | null` - Initial value for single select mode. Default: `null`
    - initValueMulti: `Array<string>` - Initial values for multiple select mode. Default: `[]`
    - selectType: `'single' | 'multiple'` - Type of selection. Default: `'single'`
    - disabled: `boolean` - Whether the select is disabled. Default: `false`
    - required: `boolean` - Whether the select is required. Default: `false`
    - readonly: `boolean` - Whether the select is read-only. Default: `false`
    - closeOnSelect: `boolean` - Whether to close dropdown after selection. Set `true` for single select, `false` for multiple select. Default: `true`
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
    - emptyStateText: `string | object` - Text to display when search returns no results. Default: `{ en: 'No results found' }`
    - searchPlaceholder: `string | object` - Placeholder text for search input. Default: `{ en: 'Search' }`
    - fieldName: `string` - Form field name. Default: `""`
    - customValidation: `boolean` - Enable custom validation. Default: `false`
    - validation: `Formula` - Custom validation formula

    - selectedFontFamily: `string` - Font family of selected value. Default: `'inherit'`
    - selectedFontSize: `string` - Font size of selected value. Default: `'14px'`
    - selectedFontWeight: `number | null` - Font weight of selected value
    - selectedFontColor: `string` - Font color of selected value. Default: `'#333'`
    - selectedPadding: `string` - Padding of selected value. Default: `'0px'`
    - selectedTextAlign: `'left' | 'center' | 'right'` - Text alignment. Default: `'left'`

    - placeholderFontFamily: `string` - Font family of placeholder. Default: `'inherit'`
    - placeholderFontSize: `string` - Font size of placeholder. Default: `'14px'`
    - placeholderFontWeight: `number | null` - Font weight of placeholder
    - placeholderFontColor: `string` - Font color of placeholder. Default: `'#333'`
    - placeholderTextAlign: `'left' | 'center' | 'right'` - Text alignment. Default: `'left'`

    - chipFontSize: `string` - Font size of the chip text. Default: `"14px"`.
    - chipFontFamily: `string` - Font family of the chip text. Default: `"inherit"`.
    - chipFontWeight: `null | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900` - Font weight of the chip text. Default: `null`.
    - chipFontColor: `string` - Color of the chip text. Default: `"white"`.
    - chipPadding: `string` - Padding inside the chip. Default: `"2px 8px"`.
    - chipBgColor: `string` - Background color of the chip. Default: `"#363636"`.
    - chipBorder: `boolean` - Toggle between all borders or split borders. Default: `false`.
    - chipBorderAll: `string` - Border style when `chipBorder` is false.
    - chipBorderTop: `string` - Top border when `chipBorder` is true.
    - chipBorderRight: `string` - Right border when `chipBorder` is true.
    - chipBorderBottom: `string` - Bottom border when `chipBorder` is true.
    - chipBorderLeft: `string` - Left border when `chipBorder` is true.
    - chipBorderRadius: `string` - Border radius of the chip. Default: `"4px"`.
    - chipIconUnselect: `string` - Icon used for unselecting the chip. Default: `"wwi wwi-cross"`.
    - chipIconColor: `string` - Color of the chip icon. Default: `"white"`.
    - chipIconSize: `string` - Size of the chip icon. Default: `"14px"`.

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

    - dropdownWidth: `string` - Width of dropdown. Do not touch it if not necessary, default value compute the same width as trigger.
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
    - dropdownPadding: `string` - Padding. Default: `'0px'`
    - offsetX: Length - Horizontal offset of the dropdown relative to the trigger. Default: '0px'.
    - offsetY: Length - Vertical offset of the dropdown relative to the trigger. Default: '8px'.

    - optionFontSize: `string` - Font size. Default: `'14px'`
    - optionFontFamily: `string` - Font family. Default: `'inherit'`
    - optionFontWeight: `number | null` - Font weight
    - optionFontColor: `string` - Text color. Default: `'black'`
    - optionSpacing: `string` - Vertical spacing between options. Default: `'0px'`
    - optionPadding: `string` - Padding. Default: `'0px'`
    - optionBorder: `string` - Border of the option. Default `'0px solid #000000'`
    - optionBorderRadius: `string` - Border radius. Default: `'0px'`
    - optionBgColor: `string` - Background color
    - optionBgColorFocused: `string` - Background color when focused. Default: `'#f5f5f5'`
    - optionBgColorHover: `string` - Background color on hover. Default: `'#f5f5f5'`
    - optionCursor: `string` - Cursor type. Default: `'pointer'`
    - optionIcon: `string` - Check icon. Default: `'fas fa-check'`
    - optionIconColor: `string` - Icon color. Default: `'black'`
    - optionIconSize: `string` - Icon size. Default: `'16px'`

    - emptyStateFontFamily: `string` - Font family. Default: `'inherit'`
    - emptyStateFontSize: `string` - Font size. Default: `'14px'`
    - emptyStateFontWeight: `number | null` - Font weight
    - emptyStateFontColor: `string` - Font color. Default: `'black'`
    - emptyStatePadding: `string` - Padding. Default: `'0px'`
    - emptyStateTextAlign: `'left' | 'center' | 'right'` - Text alignment. Default: `'left'`

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
    - searchOutlineOffset: `string` - Outline offset
    - searchFontFamily: `string` - Font family
    - searchFontSize: `string` - Font size
    - searchFontWeight: `number | null` - Font weight
    - searchFontColor: `string` - Font color. Default: `'black'`
    - searchBgColor: `string` - Background color. Default: `'white'`
    - searchPlaceholderColor: `string` - Placeholder color. Default: `'gray'`

    Note: chip properties for multiselect, and selected properties for single select.

3. **Settings:**

- dynamicConfiguration: object({"content":{"choices":[{"key":"nameOfKey","type"="typeOfKey"}]}}) - Object that describe format of data in choices

4. **Children Components:**

There is no children.

5. **Special Features:**

This select contain all logic for the select and all styling is done throught properties defined above. 

6. **Context:**

- context.local.data.select: { select: { options: array<{ label: Text, value: value (according to mappingValue), disabled: bool, isSelected: bool, \_data: rawData defined in choices }>, active: { value: variableValue (according to mappingValue), details: { value: variableValue (according to mappingValue), label: variableLabel (according to mappingLabel), disabled: bool, data: full selected data (dynamicConfiguration format) } }, utils: { type: selectType, isOpen, triggerHeight } }, selectTrigger: { placeholder: Text } }

7. **Events:**

- change: Triggered when selection changes. Payload: { value: any }
- initValueChange: Triggered when initial value changes. Payload: { value: any }

8. **Variables:**

- value: any|array - Current selected value(s). Type depends on selectType (single/multiple)

9. **Exemple:**

- Simple select example

{"uid":"select-car","tag":"ww-input-select","name":"Vehicle Multi Select","settings":{"dynamicConfiguration":{"content":{"choices":[{"key":"label","type":"Text"},{"key":"value","type":"Text"},{"key":"emoji","type":"Text"},{"key":"description","type":"Text"}]}}},"props":{"default":{"side":"bottom","align":"start","choices":[{"emoji":"🚗","label":"Sedan","value":"sedan","description":"Perfect for daily commuting"}],"offsetX":"0px","offsetY":"8px","disabled":false,"readonly":false,"required":true,"autoFocus":true,"fieldName":"","optionIcon":"fas fa-check","selectType":"single","showSearch":true,"validation":"","zIndexOpen":1,"boundOffset":"0px","placeholder":{"en":"Select vehicle types","fr":"Sélectionner un type de véhicule"},"searchWidth":"100%","initialState":"closed","manualToggle":false,"mappingLabel":{"code":"context.mapping?.['emoji']+' '+context.mapping?.['label']","type":"f"},"mappingValue":{"code":"context.mapping?.['value']","type":"f"},"optionCursor":"pointer","searchBorder":false,"searchHeight":"32px","closeOnSelect":true,"dropdownWidth":{"code":"context.local.data?.['select']?.['select']?.['utils']?.['triggerWidth']+'px'","__wwtype":"f"},"manualTrigger":false,"optionPadding":"8px ","searchBgColor":"#F5F5F5","searchPadding":"12px","selectOnClick":true,"triggerBorder":false,"triggerHeight":"40px","triggerMargin":"0px","dropdownBorder":false,"optionFontSize":"14px","optionIconSize":"16px","triggerBgColor":"#FFFFFF","triggerPadding":"12px","triggerShadows":"","dropdownBgColor":"#FFFFFF","dropdownPadding":"12px","dropdownShadows":"0px 3px 5px 2px #6666661C","mappingDisabled":{"code":"false","type":"f"},"optionFontColor":"black","optionIconColor":"#4D4D4D","searchBorderAll":"1px solid #A6A6A6","searchFontColor":"black","triggerIconOpen":"fas fa-angle-up","triggerIconSize":"16px","unselectOnClick":true,"customValidation":false,"selectedFontSize":"14px","triggerBorderAll":"1px solid #BABABA","triggerIconClose":"fas fa-angle-down","triggerIconColor":"#666666","dropdownBorderAll":"1px solid #BABABA","selectedFontColor":"#333","selectedTextAlign":"left","optionBgColorHover":"#f5f5f5","searchBorderRadius":"4px","closeOnClickOutside":true,"placeholderFontSize":"14px","triggerBorderRadius":"8px","virtualScrollBuffer":600,"dropdownBorderRadius":"8px","optionBgColorFocused":"#f5f5f5","placeholderFontColor":"#A1A1A1","searchPlaceholder":{"en":"Search","fr":"Rechercher"},"searchPlaceholderColor":"gray","virtualScrollMinItemSize":40,"optionBorder":"0px solid #000000","optionBorderRadius":"4px","optionSpacing":"4px","searchMargin":"0 0 8px 0","placeholderTextAlign":"left","emptyStateText":{"en":"No results found","fr":"Aucun résultat"}}},"styles":{"default":{"width":"300px","zIndex":1,"display":"block"}}}

- Multiselect example (changes from simple select)

{"uid":"multi-select-car","tag":"ww-input-select","name":"Vehicle Multi Select",...,"props":{"chipFontColor":"#FFFFFF","chipBgColor":"#454545","chipPadding":"2px 6px","chipBorderRadius":"8px","chipIconUnselect":"wwi wwi-cross","chipIconSize":"12px","chipIconColor":"#FFFFFF","closeOnSelect":false,...}...}

Important for multiselect : "triggerHeight" have to be "unset" to let the component calculate it with the number of chips.

- Multi lang implementation

If user asks for multi lang support, you can use globalContext page lang and set :
- choices: [{"emoji": "🇬🇧","value": "uk","label": {"en": "United Kingdom","fr": "Royaume uni"}},{"emoji": "🇨🇳","value": "ch","label": {"en": "China","fr":"Chine"}}]
- dynamicConfiguration: {"content": {"choices": [{"key": "emoji","type": "Text"},{"key": "label","type": "RawObject"},{"key": "value","type": "Text"}]}}
- mappingLabel: {"type": "js","code": "return context.mapping?.['emoji']+ ' ' +context.mapping?.['label'] ?.[ globalContext.page?.['lang'] ]"}

10. **Notes:**

**CRITICAL** : mappingLabel + mappingValue are 'Formula' type like : {"type":"js","code":"//code"). It's not bindings ! So do not use __wwtype key.
**CRITICAL** : labels are always text, no img, no icons, no html etc. Do never attempts to return html in mappingLabel.
**CRITICAL** : You have to perfectly style this select according to the page.