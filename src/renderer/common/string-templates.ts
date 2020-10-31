import { MapFunction } from "../../common/types"
import { Locales } from "./locales"
import LocalizedPluralizerMap from "./pluralizers"

export type TemplateMapKeys = 'dirRemovalConfirmDialogMessage'
    | 'copyConflictDialogMessage'
    | 'copyTaskDescription'
    | 'moveTaskDescription'
    | 'tabStats'


export type DirRemovalTemplateArgs = {
    dirName: string
}

export type CopyConflictTemplateArgs = {
    fileName: string,
    destination: string
}

export type CopyTaskDescriptionArgs = CopyConflictTemplateArgs
export type MoveTaskDescriptionArgs = CopyTaskDescriptionArgs
export type TabStatsArgs = {
    selectedCount: number,
    totalCount: number,
    selectedSize: number
}

type SomeTemplateArgs = DirRemovalTemplateArgs | CopyConflictTemplateArgs | TabStatsArgs

type TemplateResolver<A extends SomeTemplateArgs> = MapFunction<A, string>

type DirRemovalTemplate = TemplateResolver<DirRemovalTemplateArgs>
type CopyConflictTemplate = TemplateResolver<CopyConflictTemplateArgs>
type CopyTaskDescriptionTemplate = TemplateResolver<CopyTaskDescriptionArgs>
type MoveTaskDescriptionTemplate = TemplateResolver<MoveTaskDescriptionArgs>
type TabStatsTemplate = TemplateResolver<TabStatsArgs>

type SomeTemplateResolver<A extends SomeTemplateArgs> = TemplateResolver<A> & (
    DirRemovalTemplate
    | CopyConflictTemplate
    | TabStatsTemplate
)

export type TemplateMapType = {
    [K in TemplateMapKeys]: SomeTemplateResolver<any>
} & {
    dirRemovalConfirmDialogMessage: DirRemovalTemplate,
    copyConflictDialogMessage: CopyConflictTemplate,
    copyTaskDescription: CopyTaskDescriptionTemplate,
    moveTaskDescription: MoveTaskDescriptionTemplate,
    tabStats: TabStatsTemplate
}

type LocalizedTemplateMapType = {
    [K in Locales]: TemplateMapType
}


const pluralizeEnFiles = (count: number) => LocalizedPluralizerMap.en({
    count,
    localeSpecific: {
        forms: {
            many: 'files',
            one: 'file'
        }
    }
})

const pluralizeRuFiles = (count: number) => LocalizedPluralizerMap.ru({
    count,
    localeSpecific: {
        forms: {
            many: 'файлов',
            twoToFour: 'файла',
            one: 'файл'
        }
    }
})

const pluralizeRuSelected = (count: number) => LocalizedPluralizerMap.ru({
    count,
    localeSpecific: {
        forms: {
            many: 'Выбраны',
            twoToFour: 'Выбраны',
            one: 'Выбран'
        }
    }
})

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
        }: MoveTaskDescriptionArgs) => `Moving ${fileName} to ${destination}`,
        tabStats: ({
            selectedCount,
            selectedSize,
            totalCount
        }: TabStatsArgs) => selectedCount
        ? `Selected ${selectedCount} ${pluralizeEnFiles(selectedCount)} (${selectedSize} bytes) of ${totalCount}`
        : `${totalCount} ${pluralizeEnFiles(selectedCount)}`
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
        }: MoveTaskDescriptionArgs) => `Перемещение ${fileName} в ${destination}`,
        tabStats: ({
            selectedCount,
            selectedSize,
            totalCount
        }: TabStatsArgs) => selectedCount
        ? `${pluralizeRuSelected(selectedCount)} ${selectedCount} ${pluralizeRuFiles(selectedCount)} (${selectedSize} байт) из ${totalCount}`
        : `${totalCount} ${pluralizeRuFiles(selectedCount)}`
    }
}

export default LocalizedTemplateMap