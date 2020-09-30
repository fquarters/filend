import React, { CSSProperties, MutableRefObject, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Consumer } from "../../../common/types"

type FileFragmentProps = {
    content: string,
    index: number,
    setRef: Consumer<HTMLPreElement | null>,
    height: number,
    viewerScrollTop: number,
    viewerRef: MutableRefObject<HTMLDivElement | null>,
    requestContent: Consumer<number>
}

const FileFragment = ({
    content,
    index,
    setRef,
    height,
    viewerScrollTop,
    viewerRef,
    requestContent
}: FileFragmentProps) => {

    const ownRef = useRef<HTMLPreElement | null>()

    useLayoutEffect(() => {

        if (viewerRef.current && ownRef.current) {

            const bounds = ownRef.current.getBoundingClientRect()
            const viewerBounds = viewerRef.current.getBoundingClientRect()
            const visible = bounds.top <= viewerBounds.bottom && bounds.bottom >= viewerBounds.top

            if (visible) {

                if (!content) {

                    requestContent(index)

                } else {

                    // TODO display hidden content
                }

            } else {

                if (content) {

                    // TODO hide content
                }
            }

        }

    }, [viewerScrollTop, viewerRef, content, requestContent, index])

    const cssProps = useMemo<CSSProperties>(() => {

    
        if (!content) {

            return {

                height
            }
        }

        return {}

    }, [height, content])

    const refSetter = useCallback((ref) => {

        setRef(ref)
        ownRef.current = ref

    }, [setRef])

    return <pre className="viewer__content"
        key={index}
        ref={refSetter}
        style={cssProps}>
        {content}
    </pre>
}

export default FileFragment