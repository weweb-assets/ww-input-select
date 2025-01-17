---
name: ww-input-select
description: A customizable dropdown select input field with search, infinite scroll, and custom styling features for selecting predefined options with text or custom layouts.
keywords:
  - dropdown select
  - custom layout
  - infinite scroll
  - searchable input
  - custom styling
  - limited options
  - placeholder text
  - read-only field
  - clear icon
  - caret icon
---

#### ww-input-select

Properties:
- choices: array<{ label: string, value: any }> - Array of options to display in the dropdown. Don't forget linked dynamicConfiguration in settings.
- mappingLabel: Formula - A formula to derive the label from each choice item.
- mappingValue: Formula - A formula to derive the value from each choice item.
- initValueSingle: string | null - Initial value for single select. Default: null.
- initValueMulti: Array<string> - Initial values for multiple select. Default: [].
- selectType: 'single' | 'multiple' - Type of select (single or multiple selection). Default: 'single'.
- disabled: boolean - Whether the select is disabled. Default: false.
- required: boolean - Whether the select is required. Default: false.
- readonly: boolean - Whether the select is read-only. Default: false.
- limit: number | null - Maximum number of selections for multiple select (null for unlimited). Default: null.
- initialState: 'closed' | 'open' - Initial state of the dropdown. Default: 'closed'.
- canUnselect: boolean - Whether clicking a selected option will unselect it. Default: false.
- closeOnSelect: boolean - Whether the dropdown should close after selecting an option. Default: false.
- manualToggle: boolean - Whether the dropdown should only open/close via the Toggle method. Default: false.
- closeOnClickOutside: boolean - Whether the dropdown should close when clicking outside. Default: true.
- placeholder: string | object - Placeholder text for the trigger. Default: { en: 'Select a value' }.
- side: 'bottom' | 'left' | 'top' | 'right' - Side of the trigger where the dropdown appears. Default: 'bottom'.
- align: 'start' | 'center' | 'end' - Alignment of the dropdown relative to the trigger. Default: 'start'.
- offsetX: Length - Horizontal offset of the dropdown relative to the trigger. Default: '0px'.
- offsetY: Length - Vertical offset of the dropdown relative to the trigger. Default: '0px'.
- boundOffset: Length - Offset from the edge of the screen where the dropdown should flip to the opposite side. Default: '0px'.
- virtualScroll: boolean - Whether to enable virtualized scrolling for large option lists. Default: false.
- virtualScrollBuffer: number - Buffer size for virtualized scrolling (in pixels). Default: 600.
- virtualScrollMinItemSize: number - Minimum height of an option item for virtualized scrolling. Default: 40.
- showSearch: boolean - Whether to show the search input in the dropdown. Default: false. Set it to true to active search feature custom inputElement.
- searchBy: Array<{ filter: string }> - Properties of the choice items to search by.
- autoFocus: boolean - Whether to automatically focus the search input when the dropdown opens. Default: true.

Children:
- triggerContainer: Component(ww-flexbox) - Container for the trigger content.
- emptyStateContainer: Component(ww-flexbox) - Container to display when no options are available.
- optionChoiceElement: Component(ww-flexbox) - Container for each option item in the dropdown.
- inputElement: Component(ww-input-basic) - Input component for the search field.
- dropdownContainerElement: Component(ww-flexbox) - Container for the dropdown content. Exceptionnaly : Use only this to add dropdown styles, do not add children ! inputElement and optionChoiceElement are added automatically. Always set display flex and flexDirection column.

Settings:
- dynamicConfiguration: object({"content":{"choices":[{"key":"nameOfKey","type"="typeOfKey"}]}}) - Object that describe format of data in choices


Select example:
{"tag":"ww-input-select","props":{"default":{"choices":[{"label":"Item 1","value":"one"},{"label":"Item 2","value":"two"},{"label":"Item 3","value":"three"}],"mappingLabel":{"type":"f","code":"context.mapping?.['label']"},"mappingValue":{"type":"f","code":"context.mapping?.['value']"},"mappingDisabled":{"type":"f","code":"false"},"selectType":"single","disabled":false,"required":false,"readonly":false,"initialState":"closed","closeOnSelect":false,"manualToggle":false,"closeOnClickOutside":true,"placeholder":{"en":"Select a value"},"side":"bottom","align":"start","offsetX":"0px","offsetY":"8px","boundOffset":"0px","virtualScroll":false,"virtualScrollBuffer":600,"virtualScrollMinItemSize":40,"selectOnClick":true,"unselectOnClick":true,"showSearch":true,"autoFocus":true,"fieldName":"","customValidation":false,"validation":""}},"settings":{"dynamicConfiguration":{"content":{"choices":[{"key":"label","type":"Text"},{"key":"value","type":"Text"}]}}},"styles":{"default":{"zIndex":1}},"children":{"triggerContainer":{"tag":"ww-flexbox","name":"Trigger","styles":{"default":{"display":"flex","flexDirection":"row","width":"300px","border":"1px solid #C4C4C4","borderRadius":"8px","padding":"12px 12px","cursor":"pointer","justifyContent":"space-between"}},"children":{"children":[{"tag":"ww-text","name":"Placeholder","props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.local.data?.['select']?.['selectTrigger']?.['placeholder']"}},"tag":"p"}},"styles":{"default":{"display":{"__wwtype":"f","defaultValue":true,"code":"context.local.data?.['select']?.['select']?.['active']?.['value'] ?'none':'block'"},"color":"#C4C4C4"}}},{"tag":"ww-text","name":"Selected value","props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.local.data?.['select']?.['select']?.['active']?.['details']?.['label']"}},"tag":"p"}},"styles":{"default":{"display":{"__wwtype":"f","defaultValue":true,"code":"context.local.data?.['select']?.['select']?.['active']?.['value'] ?'block':'none'"}}}},{"tag":"ww-icon","props":{"default":{"icon":"fas fa-angle-down","color":"#C4C4C4"}}}]}},"dropdownContainerElement":{"tag":"ww-flexbox","name":"Dropdown container","styles":{"default":{"display":"flex","backgroundColor":"#FFFFFF","width":{"__wwtype":"f","code":"context.local.data?.['select']?.['select']?.['utils']?.['triggerWidth']+\"px\""},"border":"1px solid #C4C4C4","borderRadius":"8px","padding":"8px","boxShadow":null,"flexDirection":"column"}}},"emptyStateContainer":{"tag":"ww-flexbox","name":"Empty state","children":{"children":[{"tag":"ww-text","props":{"default":{"tag":"p","text":"No items found"}}}]}},"optionChoiceElement":{"tag":"ww-flexbox","name":"Option","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"display":"flex","flexDirection":"row","padding":"12px 16px","borderRadius":"8px","cursor":"pointer","justifyContent":"space-between"},"_wwHover_default":{"backgroundColor":"#F0F0F0"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.item.data?.['label']"}},"tag":"p"}}},{"tag":"ww-icon","props":{"default":{"icon":"icon-check","color":"#000000"}},"styles":{"default":{"display":{"__wwtype":"f","defaultValue":true,"code":"context.local.data?.['selectOption']?.['isSelected'] ?'block':'none'"}}}}]}},"inputElement":{"tag":"ww-input-basic","name":"Search input","props":{"default":{"value":"","type":"text","displayPassword":false,"readonly":false,"required":true,"precision":"0.1","step":1,"timePrecision":1,"placeholder":{"en":"Search an item"},"rows":4,"resize":false,"min":"0","max":"10000","minDate":"","maxDate":"","hideArrows":false,"debounce":false,"debounceDelay":"500ms","autocomplete":false,"fieldName":"","customValidation":false,"validation":"","placeholderColor":"#ABABAB"}},"styles":{"default":{"width":"100%","backgroundColor":"#F5F5F5","padding":"12px 12px","border":"1px solid #C7C7C7","borderRadius":"8px","margin":"0 0 8px 0"}}}}}

Multiselect example:
{"tag":"ww-input-select","settings":{"dynamicConfiguration":{"content":{"choices":[{"key":"label","type":"Text"},{"key":"value","type":"Text"},{"key":"emoji","type":"Text"},{"key":"description","type":"Text"}]}}},"props":{"default":{"choices":[{"label":"Sedan","value":"sedan","emoji":"🚗","description":"Perfect for daily commuting"},{"label":"Sports Car ","value":"sports","emoji":"🏎️ ","description":"High performance and style"},{"label":"SUV","value":"suv","emoji":"🚙","description":"Spacious and versatile"}],"mappingLabel":{"type":"f","code":"context.mapping?.['label']"},"mappingValue":{"type":"f","code":"context.mapping?.['value']"},"selectType":"multiple","disabled":false,"required":true,"readonly":false,"showSearch":true,"autoFocus":true,"placeholder":{"en":"Select vehicle types"},"side":"bottom","align":"start","offsetY":"8px","mappingDisabled":{"type":"f","code":"false"},"initialState":"closed","closeOnSelect":false,"manualToggle":false,"closeOnClickOutside":true,"offsetX":"0px","boundOffset":"0px","virtualScroll":false,"virtualScrollBuffer":600,"virtualScrollMinItemSize":40,"selectOnClick":true,"unselectOnClick":false,"fieldName":"","customValidation":false,"validation":""}},"styles":{"default":{"display":"block","zIndex":1}},"children":{"triggerContainer":{"tag":"ww-flexbox","name":"Trigger","styles":{"default":{"display":"flex","padding":"12px 16px","width":"100%","border":"1px solid #E5E7EB","borderRadius":"8px","flexDirection":"row","justifyContent":"space-between"}},"children":{"children":[{"tag":"ww-text","name":"Placeholder","props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.local.data?.['select']?.['selectTrigger']?.['placeholder']"}},"tag":"p"}},"styles":{"default":{"display":{"__wwtype":"f","code":"context.local.data?.['select']?.['select']?.['active']?.['details']?.['length'] ?'none':'block'"},"color":"#9CA3AF"}}},{"tag":"ww-flexbox","styles":{"default":{"display":"flex","rowGap":"8px","columnGap":"8px","flexWrap":"wrap"}},"children":{"children":[{"tag":"ww-flexbox","styles":{"default":{"display":"flex","padding":"4px 8px","borderRadius":"6px","backgroundColor":"#EEF2FF","alignItems":"center","rowGap":"6px","columnGap":"6px"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.item.data?.['data']?.['emoji']"}},"tag":"p"}},"styles":{"default":{"fontSize":"14px","color":"#4F46E5"}}},{"tag":"ww-text","props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.item.data?.['data']?.['label']"}},"tag":"p"}},"styles":{"default":{"fontSize":"14px","color":"#4F46E5"}}}]}}]},"props":{"repeat":{"children":{"wwtype":"f","code":"context.local.data?.['select']?.['select']?.['active']?.['details']"}}}},{"tag":"ww-icon","props":{"default":{"icon":"fas fa-chevron-down","color":"#9CA3AF","fontSize":16}}}]}},"dropdownContainerElement":{"tag":"ww-flexbox","name":"Dropdown container","styles":{"default":{"display":"flex","padding":"8px","width":{"__wwtype":"f","code":"context.local.data?.['select']?.['select']?.['utils']?.['triggerWidth']+\"px\""},"border":"1px solid #E5E7EB","borderRadius":"8px","boxShadow":"0px 4px 6px -1px rgba(0, 0, 0, 0.1)","backgroundColor":"#FFFFFF","flexDirection":"column"}}},"emptyStateContainer":{"tag":"ww-flexbox","name":"Empty state","styles":{"default":{"display":"block","padding":"12px","alignItems":"center"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":"No vehicles found"}}},"styles":{"default":{"fontSize":"14px","color":"#6B7280"}}}]}},"optionChoiceElement":{"tag":"ww-flexbox","name":"Option","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"display":"flex","flexDirection":"row","padding":"12px","borderRadius":"6px","cursor":"pointer","justifyContent":"space-between"},"_wwHover_default":{"backgroundColor":"#F3F4F6"}},"children":{"children":[{"tag":"ww-flexbox","styles":{"default":{"flexDirection":"row","alignItems":"center","columnGap":"12px"}},"children":{"children":[{"tag":"ww-text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.item.data?.['emoji']"}},"tag":"p"}},"styles":{"default":{"fontSize":"24px","color":"#374151"}}},{"tag":"ww-flexbox","styles":{"default":{"flexDirection":"column"}},"children":{"children":[{"tag":"ww-text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.item.data?.['label']"}},"tag":"p"}},"styles":{"default":{"fontSize":"14px","color":"#374151"}}},{"tag":"ww-text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"text":{"en":{"__wwtype":"f","code":"context.item.data?.['description']"}},"tag":"p"}},"styles":{"default":{"fontSize":"14px","color":"#A1A1A1"}}}]}}]}},{"tag":"ww-icon","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"fas fa-check","color":"#4F46E5"}},"styles":{"default":{"display":{"__wwtype":"f","code":"context.local.data?.['selectOption']?.['isSelected'] ?'block':'none'"}}}}]}},"inputElement":{"tag":"ww-input-basic","name":"Search input","props":{"default":{"type":"text","placeholder":{"en":"Search vehicles"},"required":true,"placeholderColor":"#9CA3AF","value":"","displayPassword":false,"readonly":false,"precision":"0.1","step":1,"timePrecision":1,"rows":4,"resize":false,"min":"0","max":"10000","minDate":"","maxDate":"","hideArrows":false,"debounce":false,"debounceDelay":"500ms","autocomplete":false,"fieldName":"","customValidation":false,"validation":""}},"styles":{"default":{"margin":"0 0 8px 0","padding":"8px 12px","width":"100%","border":"1px solid #E5E7EB","borderRadius":"6px","backgroundColor":"#F9FAFB"}}}}}

Events:
- change: Triggered when selection changes. Payload: { value: any }
- initValueChange: Triggered when initial value changes. Payload: { value: any }

Variables:
- value: any|array - Current selected value(s). Type depends on selectType (single/multiple)

Note:
If you want to fix width, you should set it in root ww-input-select component, and set triggerContainer width to 100%. Don't forget zIndex 1 to the root ww-input-select.