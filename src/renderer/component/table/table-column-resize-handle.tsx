import React, { MutableRefObject, useCallback } from "react"
import { Consumer } from "../../../common/types"
import ResizeHandle, { ResizeHandleProps } from "../resize-handle"

type TableColumnResizeHandleProps = {
    cellRef: MutableRefObject<HTMLTableHeaderCellElement | null>,
    nextCellRef: MutableRefObject<HTMLTableHeaderCellElement | null>,
    setColWidth: Consumer<number>,
    setNextColWidth: Consumer<number>,
    align: 'left' | 'right'
} & Omit<ResizeHandleProps, 'onResize' | 'align'>

const TableColumnResizeHandle = ({
    cellRef,
    nextCellRef,
    setColWidth,
    setNextColWidth,
    ...props
}: TableColumnResizeHandleProps) => {

    const onResize = useCallback((value: number) => {

        if (cellRef.current && nextCellRef.current && value) {
            setColWidth(cellRef.current.offsetWidth + value)
            setNextColWidth(nextCellRef.current.offsetWidth - value)
        }

    }, [cellRef, nextCellRef, setColWidth])

    return <ResizeHandle {...props}
        onResize={onResize} />
}

export default TableColumnResizeHandle