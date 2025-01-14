---
name: ww-input-select
description: >-
  The `ww-input-select` component provides a customizable dropdown select input
  field with features like search, infinite scroll, and custom styling, allowing
  users to choose from predefined options displayed as text or with a custom
  layout.
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

1. **Component Purpose:** This component renders a dropdown select input field where users can choose an option from a list of predefined options. The options can be displayed as text or with a custom layout. It supports features like search, infinite scroll, limited options, and custom styling for the dropdown and options.

2. **Properties:**
   - `readonly`: `boolean` - Whether the input field is read-only or not. Default: `false`.
   - `required`: `boolean` - Whether the input field is required or not. Default: `false`.
   - `placeholder`: `string | object` - Placeholder text to display when no option is selected. Default: `{ en: 'Placeholder' }`.
   - `noOptionsText`: `string | object` - Text to display when there are no options available. Default: `undefined`.
   - `noResultsText`: `string | object` - Text to display when no options match the search query. Default: `undefined`.
   - `disabled`: `boolean` - Whether the input field is disabled or not. Default: `false`.
   - `canDeselect`: `boolean` - Whether the user can unselect the currently selected option or not. Default: `false`.
   - `searchable`: `boolean` - Whether the input field is searchable or not. Default: `true`.
   - `searchFontFamily`: `string` - Font family for the search input field.
   - `searchFontSize`: `string | number` - Font size for the search input field.
   - `searchFontColor`: `string | null` - Font color for the search input field.
   - `closeOnSelect`: `boolean` - Whether to close the dropdown after selecting an option or not. Default: `true`.
   - `infiniteScroll`: `boolean` - Whether to enable infinite scrolling in the dropdown or not. Default: `false`.
   - `loadingRingColor`: `string` - Color of the loading ring when fetching options. Default: `#099af2`.
   - `limitedOptions`: `boolean` - Whether to limit the number of options displayed or not. Default: `false`.
   - `limit`: `number` - Maximum number of options to display when `limitedOptions` is `true`. Default: `20`.
   - `clearIcon`: `boolean` - Whether to display a clear icon or not. Default: `false`.
   - `caretIcon`: `boolean` - Whether to display a caret icon or not. Default: `true`.
   - `initialValue`: `string` - Initial value of the input field.
   - `text`: `string | object` - Text to display in the input field. Default: `""`.
   - `options`: `array` - Array of options to display in the dropdown.

3. **Children Components:**
   - `placeholderElement`: `ww-text` - Text to display for placeholder.
   - `textElement`: `ww-text` - Text to display each option in dropdown.
   - `flexboxElement`: `ww-text` - Container for options
   - `caretIconElement`: `ww-icon` - Caret icon element
   - `clearIconElement`: `ww-icon` - Clear icon element

4. **Example:**

Here is an example of a futuristic stylized select with correct padding and all :
   {
      "tag": "ww-input-select",
      "props": {"default":{"limit":20,"options":[{"label":{"en":"Mars Colony Alpha"},"value":"mars"},{"label":{"en":"Lunar Base Omega"},"value":"moon"},{"label":{"en":"Saturn Ring Station"},"value":"saturn"},{"label":{"en":"Venus Cloud City"},"value":"venus"},{"label":{"en":"Jupiter Mining Outpost"},"value":"jupiter"}],"advanced":false,"disabled":false,"readonly":false,"required":false,"caretIcon":true,"clearIcon":false,"labelField":"","layoutType":"text","searchable":true,"valueField":"","canDeselect":true,"placeholder":{"en":"Select destination..."},"closeOnSelect":true,"infiniteScroll":false,"limitedOptions":false,"searchFontColor":"#1A1F3E","loadingRingColor":"#00F0FF","dropdownMaxHeight":"240px","dropdownBorderColor":"rgba(0, 240, 255, 0.2)","dropdownBorderWidth":"1px","dropdownBorderRadius":"12px"}},
      "styles": {"default":{"width":"100%","border":"1px solid rgba(0, 240, 255, 0.3)","padding":"0px 16px","transition":"all 0.3s ease","borderRadius":"12px","backgroundColor":"rgba(10, 15, 30, 0.6)","color":"#00F0FF","backdropFilter":"blur(10px)"}},
      "children": {
      "textElement": {
         "tag": "ww-text",
         "name": "Option text",
         "states": [{"id":"_wwHover","label":"Hover"}],
         "props": {"default":{"tag":"p","text":{"en":"Option"}}},
         "styles": {"default":{"width":"100%","padding":"16px","color":"#1A1F3E","fontSize":"16px","letterSpacing":"0.5px"},"_wwHover_default":{"backgroundColor":"rgba(0, 240, 255, 0.1)","color":"#0A0F1E"}}
      },
      "flexboxElement": {
         "tag": "ww-flexbox",
         "name": "Option container",
         "styles": {"default":{"width":"100%","display":"block","customCss":"","backgroundColor":"#FFFFFF","boxShadow":"0 4px 20px rgba(0, 0, 0, 0.2)"}}
      },
      "caretIconElement": {
         "tag": "ww-icon",
         "name": "Caret icon",
         "props": {"default":{"icon":"fas fa-chevron-down","color":"#00F0FF","fontSize":14}},
         "styles": {"default":{"padding":"16px","transition":"transform 0.3s ease"}}
      },
      "clearIconElement": {
         "tag": "ww-icon",
         "name": "Clear icon",
         "props": {"default":{"icon":"fas fa-times","color":"#00F0FF","fontSize":14}},
         "styles": {"default":{"padding":"16px"}}
      },
      "placeholderElement": {
         "tag": "ww-text",
         "name": "Placeholder text",
         "props": {"default":{"tag":"p","text":{"en":"Select destination..."}}},
         "styles": {"default":{"color":"rgba(226, 232, 255, 0.5)","fontSize":"16px","letterSpacing":"0.5px"}}
      }
      }
   }

Notes: Dropdown is always white in this select, so adjust colors. Color of selected item is 'color' in ww-input-select styles.
Important: You have to specify the same text size for root ww-input-select and placeholder. Don't include padding on placeholder element.
