import { WebContents } from "electron";

type RendererHolder = {
    value: WebContents | null
}

const holder: RendererHolder = {
    value: null
}

export default holder