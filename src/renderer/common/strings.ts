import { MapFunction } from "../../common/types"

type StringMapKeys = 'confirmDialogTitle'
    | 'deleteConfirmDialogMessage'
    | 'moveRequestDialogMessage'
    | 'moveToLabel'
    | 'yesButton'
    | 'cancelButton'
    | 'yesToAllButton'

type TemplateMapKeys = 'dirRemovalConfirmDialogMessage'
    | 'copyConflictDialogMessage'
    | 'copyTaskDescription'
    | 'moveTaskDescription'

type DirRemovalTemplateArgs = {
    dirName: string
}

type CopyConflictTemplateArgs = {
    fileName: string,
    destination: string
}

type CopyTaskDescriptionArgs = CopyConflictTemplateArgs
type MoveTaskDescriptionArgs = CopyTaskDescriptionArgs

type SomeTemplateArgs = DirRemovalTemplateArgs | CopyConflictTemplateArgs

type TemplateResolver<A extends SomeTemplateArgs> = MapFunction<A, string>

type DirRemovalTemplate = TemplateResolver<DirRemovalTemplateArgs>
type CopyConflictTemplate = TemplateResolver<CopyConflictTemplateArgs>
type CopyTaskDescriptionTemplate = TemplateResolver<CopyTaskDescriptionArgs>
type MoveTaskDescriptionTemplate = TemplateResolver<MoveTaskDescriptionArgs>

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
    copyConflictDialogMessage: CopyConflictTemplate,
    copyTaskDescription: CopyTaskDescriptionTemplate,
    moveTaskDescription: MoveTaskDescriptionTemplate
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

const LocalizedTemplateMap: LocalizedTemplateMapType = {
    en: {
        copyConflictDialogMessage: ({
            destination,
            fileName
        }: CopyConflictTemplateArgs) => `File "${fileName}" already exists in ${destination}. Do you want to overwrite it?`,
        dirRemovalConfirmDialogMessage: ({
            dirName
        }: DirRemovalTemplateArgs) => `Directory "${dirName}" is not empty. Are you sure you want to delete it?`,
        copyTaskDescription: ({
            fileName,
            destination
        }: CopyTaskDescriptionArgs) => `Copying ${fileName} to ${destination}`,
        moveTaskDescription: ({
            fileName,
            destination
        }: MoveTaskDescriptionArgs) => `Moving ${fileName} to ${destination}`
    },
    ru: {
        copyConflictDialogMessage: ({
            destination,
            fileName
        }: CopyConflictTemplateArgs) => `Файл ${fileName} уже существует в ${destination}. Хотите перезаписать его?`,
        dirRemovalConfirmDialogMessage: ({
            dirName
        }: DirRemovalTemplateArgs) => `Директория ${dirName} не пустая. Уверены, что хотите удалить ее?`,
        copyTaskDescription: ({
            fileName,
            destination
        }: CopyTaskDescriptionArgs) => `Копирование ${fileName} в ${destination}`,
        moveTaskDescription: ({
            fileName,
            destination
        }: MoveTaskDescriptionArgs) => `Перемещение ${fileName} в ${destination}`
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