import { WebContents } from "electron";

export type WindowName = 'main' | string

type RendererHolder = {
    [K in WindowName]: WebContents | null
}

const windowHolder: RendererHolder = {
    main: null,
    viewer: null
}

export default windowHolder