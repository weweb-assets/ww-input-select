import wwDropdownPopupConfig from './wwDropdownPopupConfig.vue';

wwLib.wwPopups.addPopup('wwDropdownPopupConfig', wwDropdownPopupConfig);

wwLib.wwPopups.addStory('WWFORM_DROPDOWN_CONFIG', {
    title: {
        en: 'Dropdown Configuration',
        fr: 'Configuration du menu déroulant',
    },
    type: 'wwDropdownPopupConfig',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider',
            },
            next: false,
        },
    },
});
