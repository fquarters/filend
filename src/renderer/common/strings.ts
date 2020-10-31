import { Locales } from "./locales"
import LocalizedTemplateMap, { TemplateMapKeys, TemplateMapType } from "./string-templates"

type StringMapKeys = 'confirmDialogTitle'
    | 'deleteConfirmDialogMessage'
    | 'moveRequestDialogMessage'
    | 'moveToLabel'
    | 'yesButton'
    | 'cancelButton'
    | 'yesToAllButton'

type StringMapType = {
    [K in StringMapKeys]: string
}

type LocalizedStringMapType = {
    [K in Locales]: StringMapType
}

const LocalizedStringMap: LocalizedStringMapType = {
    en: {
        confirmDialogTitle: 'Warning!',
        deleteConfirmDialogMessage: 'Are you sure you want to delete selected files?',
        moveRequestDialogMessage: 'Are you sure you want to move selected files?',
        moveToLabel: 'Move to',
        yesButton: 'Yes',
        cancelButton: 'Cancel',
        yesToAllButton: 'Yes to all'
    },
    ru: {
        confirmDialogTitle: 'Внимание!',
        deleteConfirmDialogMessage: 'Вы уверены, что хотите удалить выбранные файлы?',
        moveRequestDialogMessage: 'Вы уверены, что хотите переместить выбранные файлы?',
        moveToLabel: 'Переместить в',
        cancelButton: 'Отмена',
        yesButton: 'Да',
        yesToAllButton: 'Да, для всех',
    }
}

const Strings = (() => {

    let locale: Locales = 'en';

    return {
        setLocale(value: Locales) {
            locale = value
        },
        get(key: StringMapKeys) {
            return LocalizedStringMap[locale][key]
        },
        getTemplate<K extends TemplateMapKeys>(key: K, args: Parameters<TemplateMapType[K]>[0]) {
            return LocalizedTemplateMap[locale][key](args)
        }
    }
})()

export default Strings