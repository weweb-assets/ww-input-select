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
- readonly: boolean - Input field read-only state. Default: false
- required: boolean - Input field required state. Default: false
- placeholder: string|object - Placeholder text. Default: { en: 'Placeholder' }
- noOptionsText: string|object - Text when no options available. Default: undefined
- noResultsText: string|object - Text when no search results. Default: undefined
- disabled: boolean - Input field disabled state. Default: false
- canDeselect: boolean - Allow unselecting current option. Default: false
- searchable: boolean - Enable search functionality. Default: true
- searchFontFamily: string - Search input font family
- searchFontSize: string|number - Search input font size
- searchFontColor: string|null - Search input font color
- closeOnSelect: boolean - Close dropdown after selection. Default: true
- infiniteScroll: boolean - Enable infinite scrolling. Default: false
- loadingRingColor: string - Loading indicator color. Default: #099af2
- limitedOptions: boolean - Limit displayed options. Default: false
- limit: number - Maximum options when limited. Default: 20
- clearIcon: boolean - Show clear icon. Default: false
- caretIcon: boolean - Show caret icon. Default: true
- initialValue: string - Initial input value
- text: string|object - Input display text. Default: ""
- options: array - Dropdown options list

Children:
- placeholderElement: ww-text - Placeholder text
- textElement: ww-text - Option text in dropdown
- flexboxElement: ww-text - Options container
- caretIconElement: ww-icon - Caret icon
- clearIconElement: ww-icon - Clear icon
- placeholderElement: ww-text - Placeholder text

Example:
{"tag":"ww-input-select","props":{"default":{"limit":20,"options":[{"label":{"en":"Mars Colony Alpha"},"value":"mars"},{"label":{"en":"Lunar Base Omega"},"value":"moon"},{"label":{"en":"Saturn Ring Station"},"value":"saturn"},{"label":{"en":"Venus Cloud City"},"value":"venus"},{"label":{"en":"Jupiter Mining Outpost"},"value":"jupiter"}],"disabled":false,"readonly":false,"required":false,"caretIcon":true,"clearIcon":false,"searchable":true,"canDeselect":true,"placeholder":{"en":"Select destination..."},"closeOnSelect":true,"infiniteScroll":false,"limitedOptions":false,"searchFontColor":"#1A1F3E","loadingRingColor":"#00F0FF","dropdownMaxHeight":"240px","dropdownBorderColor":"rgba(0, 240, 255, 0.2)","dropdownBorderWidth":"1px","dropdownBorderRadius":"12px"}},"styles":{"default":{"width":"100%","border":"1px solid rgba(0, 240, 255, 0.3)","padding":"0px 16px","transition":"all 0.3s ease","borderRadius":"12px","backgroundColor":"rgba(10, 15, 30, 0.6)","color":"#00F0FF","backdropFilter":"blur(10px)"}},"children":{"textElement":{"tag":"ww-text","styles":{"default":{"width":"100%","padding":"16px","color":"#1A1F3E","fontSize":"16px","letterSpacing":"0.5px"},"_wwHover_default":{"backgroundColor":"rgba(0, 240, 255, 0.1)","color":"#0A0F1E"}}},"flexboxElement":{"tag":"ww-flexbox","styles":{"default":{"width":"100%","display":"block","backgroundColor":"#FFFFFF","boxShadow":"0 4px 20px rgba(0, 0, 0, 0.2)"}}},"caretIconElement":{"tag":"ww-icon","props":{"default":{"icon":"fas fa-chevron-down","color":"#00F0FF","fontSize":14}},"styles":{"default":{"padding":"16px","transition":"transform 0.3s ease"}}},"clearIconElement":{"tag":"ww-icon","props":{"default":{"icon":"fas fa-times","color":"#00F0FF","fontSize":14}},"styles":{"default":{"padding":"16px"}}},"placeholderElement":{"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":"Select destination..."}}},"styles":{"default":{"color":"rgba(226, 232, 255, 0.5)","fontSize":"16px","letterSpacing":"0.5px"}}}}}

Events:
- change: Triggered when selection changes. Payload: { value: any }
- initValueChange: Triggered when initial value changes. Payload: { value: any }

Variables:
- value: any|array - Current selected value(s). Type depends on selectType (single/multiple)