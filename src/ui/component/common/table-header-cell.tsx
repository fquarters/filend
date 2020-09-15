import React, { MutableRefObject, useCallback, useRef } from "react"
import { first } from "../../../common/collections"
import { Consumer, MapFunction } from "../../../common/types"
import TableColumnResizeHandle from "./table-column-resize-handle"
import { ColumnMeta } from "./types"

type TableHeaderCellProps = {
    column: ColumnMeta,
    setColumns: Consumer<ColumnMeta[] | MapFunction<ColumnMeta[], ColumnMeta[]>>,
    setRef: Consumer<HTMLTableHeaderCellElement | null>,
    nextCellRef: MutableRefObject<HTMLTableHeaderCellElement | null>,
    nextCellKey: string | null
}

const TableHeaderCell = ({
    column,
    setColumns,
    nextCellRef,
    nextCellKey,
    setRef
}: TableHeaderCellProps) => {

    const getColWidthSetter = useCallback((key: string) =>
        (width: number) => {
            setColumns((current) => {

                const byKey = first(current, (col) => col.key === key)

                if (byKey) {

                    const index = current.indexOf(byKey)
                    const byIndex = index > -1 ? current[index] : null

                    if (byIndex) {

                        const patched: ColumnMeta = {
                            ...byIndex,
                            width
                        }

                        const newCols = current.slice()
                        newCols[index] = patched

                        return newCols
                    }

                }

                return current

            })
        }, [setColumns])

    const cellRef = useRef<HTMLTableHeaderCellElement | null>(null)

    return <th key={column.key}
        ref={(ref) => {
            cellRef.current = ref
            setRef(ref)
        }}
        className="resize-handle__container">
        {column.title}
        {
            column.resizable &&
            nextCellRef &&
            nextCellKey &&
            <TableColumnResizeHandle align="right"
                setColWidth={getColWidthSetter(column.key)}
                setNextColWidth={getColWidthSetter(nextCellKey)}
                nextCellRef={nextCellRef}
                cellRef={cellRef} />
        }
    </th>
}

export default TableHeaderCell