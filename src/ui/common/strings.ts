import { MapFunction } from "../../common/types"

type StringMapKeys = 'confirmDialogTitle'
    | 'deleteConfirmDialogMessage'

type TemplateMapKeys = 'dirRemovalConfirmDialogMessage'
    | 'copyConflictDialogMessage'

type DirRemovalTemplateArgs = {
    dirName: string
}

type CopyConflictTemplateArgs = {
    fileName: string,
    destination: string
}

type SomeTemplateArgs = DirRemovalTemplateArgs | CopyConflictTemplateArgs

type TemplateResolver<A extends SomeTemplateArgs> = MapFunction<A, string>

type DirRemovalTemplate = TemplateResolver<DirRemovalTemplateArgs>
type CopyConflictTemplate = TemplateResolver<CopyConflictTemplateArgs>

type SomeTemplateResolver<A extends SomeTemplateArgs> = TemplateResolver<A> & (
    DirRemovalTemplate
    | CopyConflictTemplate
)

type StringMapType = {
    [K in StringMapKeys]: string
}

type TemplateMapType = {
    [K in TemplateMapKeys]: SomeTemplateResolver<any>
} & {
    dirRemovalConfirmDialogMessage: DirRemovalTemplate,
    copyConflictDialogMessage: CopyConflictTemplate
}

type Locales = 'en' | 'ru'

type LocalizedStringMapType = {
    [K in Locales]: StringMapType
}

type LocalizedTemplateMapType = {
    [K in Locales]: TemplateMapType
}

const LocalizedStringMap: LocalizedStringMapType = {
    en: {
        confirmDialogTitle: 'Warning!',
        deleteConfirmDialogMessage: 'Are you sure you want to delete these files?',
    },
    ru: {
        confirmDialogTitle: 'Внимание!',
        deleteConfirmDialogMessage: 'Вы уверены, что хотите удалить эти файлы?',
    }
}

const LocalizedTemplateMap: LocalizedTemplateMapType = {
    en: {
        copyConflictDialogMessage: ({
            destination,
            fileName
        }: CopyConflictTemplateArgs) => `File "${fileName}" already exists in ${destination}. Do you want to overwrite it?`,
        dirRemovalConfirmDialogMessage: ({
            dirName
        }: DirRemovalTemplateArgs) => `Directory "${dirName}" is not empty. Are you sure you want to delete it?`
    },
    ru: {
        copyConflictDialogMessage: ({
            destination,
            fileName
        }: CopyConflictTemplateArgs) => `Файл ${fileName} уже существует в ${destination}. Хотите перезаписать его?`,
        dirRemovalConfirmDialogMessage: ({
            dirName
        }: DirRemovalTemplateArgs) => `Директория ${dirName} не пустая. Уверены, что хотите удалить ее?`
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

export type {
    CopyConflictTemplateArgs,
    DirRemovalTemplateArgs,
    TemplateMapKeys
}