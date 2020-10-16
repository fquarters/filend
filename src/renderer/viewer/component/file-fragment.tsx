import React, { CSSProperties, MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { repeat } from "../../../common/collections"
import { BiConsumer, Consumer } from "../../../common/types"

type FileFragmentProps = {
    content: string,
    index: number,
    setRef: BiConsumer<number, HTMLPreElement | null>,
    height: number,
    viewerScrollTop: number,
    viewerRef: MutableRefObject<HTMLDivElement | null>,
    requestContent: Consumer<number>,
    clearContent: Consumer<number>
}

const FileFragment = ({
    content,
    index,
    setRef,
    height,
    viewerScrollTop,
    viewerRef,
    requestContent,
    clearContent
}: FileFragmentProps) => {

    const ownRef = useRef<HTMLPreElement | null>()

    useLayoutEffect(() => {

        if (viewerRef.current && ownRef.current) {

            const bounds = ownRef.current.getBoundingClientRect()
            const viewerBounds = viewerRef.current.getBoundingClientRect()
            const visible = bounds.top <= viewerBounds.bottom && bounds.bottom >= viewerBounds.top

            if (visible && !content) {

                requestContent(index)

            } 
            
            if (content && !visible) {

                clearContent(index)
            }

        }

    }, [viewerScrollTop, viewerRef, content, requestContent, index, clearContent])

    const lines = useMemo(() => content.split('\n'), [content])

    const [placeholder, setPlacehodler] = useState('')

    useEffect(() => {

        if (content) {

            setPlacehodler(repeat('\n', content.split('\n').length).join(''))
        }

    }, [content])

    const cssProps = useMemo<CSSProperties>(() => {


        if (!(content || placeholder)) {

            return {

                height
            }
        }

        return {}

    }, [height, content, placeholder])

    const refSetter = useCallback((ref) => {

        setRef(index, ref)
        ownRef.current = ref

    }, [setRef, index])

    return <div className="viewer__content"
        key={index}
        ref={refSetter}
        style={cssProps}>
        {
            content
                ? lines.map((line, index) => <pre key={index}>{line}</pre>)
                : <pre>{placeholder}</pre>
        }
    </div>
}

export default FileFragment