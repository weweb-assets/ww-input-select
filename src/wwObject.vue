<template>
    <div class="elem-dropdown">
        <select
            :name="wwObject.content.data.config.name" 
            :required="wwObject.content.data.config.required" 
            :multiple="wwObject.content.data.config.multiple" 
            :style="style">
            <option value="" selected disabled>{{wwLang.getText(wwObject.content.data.config.placeholder)}}</option>
            <option class="option" v-for="option in wwObject.content.data.config.options" :key="option.value" :value="option.value">
                {{wwLang.getText(option.name)}}
            </option>
        </select>
    </div>
</template>

<script>
/* wwManager:start */
import wwDropdownPopupStyle from './popup/wwDropdownPopupStyle.vue'
import wwDropdownPopupConfig from './popup/wwDropdownPopupConfig.vue'

wwLib.wwPopups.addPopup('wwDropdownPopupConfig', wwDropdownPopupConfig)
wwLib.wwPopups.addPopup('wwDropdownPopupStyle', wwDropdownPopupStyle)

wwLib.wwPopups.addStory('WWFORM_DROPDOWN_CONFIG', {
    title: {
        en: 'Dropdown Configuration',
        fr: 'Configuration du menu déroulant'
    },
    type: 'wwDropdownPopupConfig',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider'
            },
            next: false
        }
    }
})

wwLib.wwPopups.addStory('WWFORM_DROPDOWN_STYLE', {
    title: {
        en: 'Dropdown style',
        fr: 'Style du menu déroulant'
    },
    type: 'wwDropdownPopupStyle',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider'
            },
            next: false
        }
    }
})

wwLib.wwPopups.addStory('WWFORM_DROPDOWN_OPTIONS', {
    title: {
        en: 'Edit Dropdown',
        fr: 'Editer le menu déroulant'
    },
    type: 'wwPopupEditWwObject',
    buttons: null,
    storyData: {
        list: {
            DROPDOWN_CONFIG: {
                separator: {
                    en: 'Configuration',
                    fr: 'Configuration'
                },
                title: {
                    en: 'Change dropdown configuration',
                    fr: 'Changer la configuration du menu déroulant'
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-config',
                shortcut: 'c',
                next: 'WWFORM_DROPDOWN_CONFIG'
            },
            DROPDOWN_STYLE: {
                separator: {
                    en: 'Style',
                    fr: 'Style'
                },
                title: {
                    en: 'Change dropdown style',
                    fr: 'Changer l\'apparence du menu déroulant'
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-edit-style',
                shortcut: 's',
                next: 'WWFORM_DROPDOWN_STYLE'
            },
        }
    }
})
/* wwManager:end */

export default {
    name: "ww-form-dropdown",
    props: {
        wwObjectCtrl: Object,
    },
    data() {
        return {
            wwLang: wwLib.wwLang
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        style() {
            let style = {};
            let wwObjectStyle = this.wwObject.content.data.style || {};

            style.color = wwObjectStyle.color || 'black';
            style.fontSize = `${(wwObjectStyle.fontSize || 1)}rem`;
            style.backgroundColor = wwObjectStyle.backgroundColor || '#FFFFFF';
            style.borderRadius = `${(wwObjectStyle.borderRadius || 1)}px`;
            style.borderWidth = `${(wwObjectStyle.borderWidth || 0)}px`;
            style.borderColor = wwObjectStyle.borderColor || '#000000';
            style.borderStyle = wwObjectStyle.borderStyle || 'solid';
            style.boxShadow = this.getShadow(this.wwObject.content.data.style);
            style.padding = wwObjectStyle.padding ? `${(wwObjectStyle.padding / 2)}px ${wwObjectStyle.padding}px` : '0';
            return style;
        },
    },
    methods: {
        getShadow(wwObjectStyle) {
            wwObjectStyle = wwObjectStyle || {};
            const shadow = wwObjectStyle.boxShadow || {};
            if (shadow.x || shadow.y || shadow.b || shadow.s || shadow.c) {
                return `${shadow.x}px ${shadow.y}px ${shadow.b}px ${shadow.s}px ${shadow.c}`;
            }
            return '';
        },
        /* wwManager:start */
        async options() {
            let copyObj = JSON.parse(JSON.stringify(this.wwObject)) // to clean
            copyObj.uniqueId += 1
            let options = {
                firstPage: 'WWFORM_DROPDOWN_OPTIONS',
                data: {
                    wwObject: copyObj,
                }
            }
            try {
                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);
                /*=============================================m_ÔÔ_m=============================================\
                    DROPDOWN STYLE
                \================================================================================================*/
                this.wwObject.content.data.style = this.wwObject.content.data.style || {};
                if (typeof (result.dropdownStyle) != 'undefined') {
                    if (typeof (result.dropdownStyle.borderColor) != 'undefined') {
                        this.wwObject.content.data.style.borderColor = result.dropdownStyle.borderColor;
                    }
                    if (typeof (result.dropdownStyle.borderRadius) != 'undefined') {
                        this.wwObject.content.data.style.borderRadius = result.dropdownStyle.borderRadius;
                    }
                    if (typeof (result.dropdownStyle.borderStyle) != 'undefined') {
                        this.wwObject.content.data.style.borderStyle = result.dropdownStyle.borderStyle;
                    }
                    if (typeof (result.dropdownStyle.borderWidth) != 'undefined') {
                        this.wwObject.content.data.style.borderWidth = result.dropdownStyle.borderWidth;
                    }
                    if (typeof (result.dropdownStyle.boxShadow) != 'undefined') {
                        this.wwObject.content.data.style.boxShadow = result.dropdownStyle.boxShadow;
                    }
                    if (typeof (result.dropdownStyle.backgroundColor) != 'undefined') {
                        this.wwObject.content.data.style.backgroundColor = result.dropdownStyle.backgroundColor;
                    }
                    if (typeof (result.dropdownStyle.color) != 'undefined') {
                        this.wwObject.content.data.style.color = result.dropdownStyle.color;
                    }
                    if (typeof (result.dropdownStyle.fontSize) != 'undefined') {
                        this.wwObject.content.data.style.fontSize = result.dropdownStyle.fontSize;
                    }
                    if (typeof (result.dropdownStyle.padding) != 'undefined') {
                        this.wwObject.content.data.style.padding = result.dropdownStyle.padding;
                    }
                }
                /*=============================================m_ÔÔ_m=============================================\
                    DROPDOWN CONFIG
                \================================================================================================*/
                this.wwObject.content.data.config = this.wwObject.content.data.config || {};
                if (typeof (result.dropdownConfig) != 'undefined') {
                    if (typeof (result.dropdownConfig.required) != 'undefined') {
                        this.wwObject.content.data.config.required = result.dropdownConfig.required;
                    }
                    if (typeof (result.dropdownConfig.multiple) != 'undefined') {
                        this.wwObject.content.data.config.multiple = result.dropdownConfig.multiple;
                    }
                    if (typeof (result.dropdownConfig.name) != 'undefined') {
                        this.wwObject.content.data.config.name = result.dropdownConfig.name;
                    }
                    if (typeof (result.dropdownConfig.placeholder) != 'undefined') {
                        this.wwObject.content.data.config.placeholder = result.dropdownConfig.placeholder;
                    }
                    if (typeof (result.dropdownConfig.options) != 'undefined') {
                        this.wwObject.content.data.config.options = result.dropdownConfig.options;
                    }
                }
                this.wwObjectCtrl.update(this.wwObject);
            } catch (err) {
                wwLib.wwLog.error('ERROR', err)
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    created() {
        this.wwObject.content.data = this.wwObject.content.data || {}
        this.wwObject.content.data.config = this.wwObject.content.data.config || {}
        this.wwObject.content.data.style = this.wwObject.content.data.style || {}

        this.wwObjectCtrl.update(this.wwObject)
        this.$emit('ww-loaded', this);
    }
};
</script>

<style lang="scss" scoped>
.elem-dropdown {
    width: 100%;
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        width: 100%;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
}
</style>
