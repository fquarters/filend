import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type Vector2 = {
    x: number,
    y: number
}

const useMouseDragTracking = () => {

    const movingRef = useRef(false)
    const [moving, setMoving] = useState(false)
    const origin = useRef<Vector2>({ x: 0, y: 0 })
    const [delta, setDelta] = useState<Vector2 | null>(null)

    const onMouseDown = useCallback((e: React.MouseEvent) => {

        movingRef.current = true
        setMoving(true)
        origin.current.x = e.clientX
        origin.current.y = e.clientY

    }, [])

    useEffect(() => {

        const onMouseMove = (e: MouseEvent) => {

            if (movingRef.current) {
                
                setDelta({
                    x: e.clientX - origin.current.x,
                    y: e.clientY - origin.current.y
                })
                origin.current.x = e.clientX
                origin.current.y = e.clientY
            }
        }

        document.addEventListener('mousemove', onMouseMove)

        return () => document.removeEventListener('mousemove', onMouseMove)

    }, [])

    useEffect(() => {

        const onMouseUp = () => {
            movingRef.current = false
            setMoving(false)
        }

        document.addEventListener('mouseup', onMouseUp)

        return () => document.removeEventListener('mouseup', onMouseUp)

    }, [])

    return useMemo(() => ({
        onMouseDown,
        distance: delta,
        moving
    }), [
        onMouseDown,
        delta,
        moving
    ])
}

export default useMouseDragTracking