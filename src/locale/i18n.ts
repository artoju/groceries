import i18n from 'i18next';

// set instance on hooks stuff
// import { setI18n } from '../../src/context';
//
// setI18n(i18n);

i18n.init({
    lng: 'en',
    fallbackLng: 'en',

    resources: {
        en: {
            translation: {
                add: 'Add',
                addPlaceholder: 'Type name of product',
                check: 'Mark as collected',
                uncheck: 'Remove from collected',
                delete: 'Delete from list',
                share: 'Share list',
                listCount: '{{count}} product',
                listCount_plural: '{{count}} products',
                collected: "Collected",
                clearList: "Clear list",
                copyUrl: "Copy url to clipboard",
                copiedListUrl: "Copied url to clipboard"
            },
        },
        fi: {
            translation: {
                add: 'Lisää',
                addPlaceholder: 'Kirjoita tuotteen nimi',
                check: 'Merkkaa kerätyksi',
                uncheck: 'Poista kerätyistä',
                delete: 'Poista listasta',
                share: 'Jaa lista',
                listCount: '{{count}} tuote',
                listCount_plural: '{{count}} tuotetta',
                collected: "Kerätty",
                clearList: "Tyhjennä lista",
                copyUrl: "Kopioi sivun osoite",
                copiedListUrl: "Kopioitu leikepöydälle"
            },
        }
    },
/* 
    interpolation: {
        escapeValue: false, 
        formatSeparator: ',',
        format(value, format) {
            if (format === 'uppercase') return value.toUpperCase();
            return value;
        },
    }, */

/*     react: {
        defaultTransParent: 'div',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    }, */
});

export default i18n;