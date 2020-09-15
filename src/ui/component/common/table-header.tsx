import React, { CSSProperties, MutableRefObject, useEffect, useMemo, useRef } from "react"
import { Consumer, MapFunction } from "../../../common/types"
import TableHeaderCell from "./table-header-cell"
import { ColumnMeta } from "./types"

type TableHeaderProps = {
    columns: ColumnMeta[],
    setColumns: Consumer<ColumnMeta[] | MapFunction<ColumnMeta[], ColumnMeta[]>>
}

const getColumnStyle = (column: ColumnMeta): CSSProperties => {

    if (column.width) {
        return {
            width: column.width
        }
    }

    return {}
}

type ReversedCellsAccumulator = {
    cells: JSX.Element[],
    prevKey: string | null,
    prevRef: MutableRefObject<HTMLTableCellElement | null>
}

type CellRefsMap = Record<string, MutableRefObject<HTMLTableCellElement | null>>

const useHeaderCellRefs = (columns: ColumnMeta[]) => {

    const cellRefs = useRef<CellRefsMap>(columns.reduce((memo, column) => {
        memo[column.key] = {
            current: null
        }
        return memo
    }, {} as CellRefsMap))

    useEffect(() => {

        columns.forEach((column) => {

            if (!cellRefs.current[column.key]) {
                cellRefs.current[column.key] = {
                    current: null
                }
            }
        })

    }, [columns])

    return cellRefs
}

const TableHeader = ({
    columns,
    setColumns
}: TableHeaderProps) => {

    const cellRefs = useHeaderCellRefs(columns)

    const headerCells = useMemo(() => columns
        .slice()
        .reverse()
        .reduce((memo, column) => {

            const cell = <TableHeaderCell column={column}
                key={column.key}
                setColumns={setColumns}
                nextCellKey={memo.prevKey}
                nextCellRef={memo.prevRef}
                setRef={(ref) => cellRefs.current[column.key].current = ref}
            />

            memo.cells.push(cell)
            memo.prevKey = column.key
            memo.prevRef = cellRefs.current[column.key]

            return memo
        }, {
            cells: [] as JSX.Element[],
            prevKey: null,
            prevRef: {
                current: null
            }
        } as ReversedCellsAccumulator)
        .cells
        .reverse(), [
        columns,
        setColumns
    ])

    const cols = useMemo(() => columns
        .map((column) => <col key={column.key}
            style={getColumnStyle(column)} />), [
        columns
    ])

    return <React.Fragment>
        <thead>
            <tr>
                {headerCells}
            </tr>
        </thead>
        <colgroup>
            {cols}
        </colgroup>
    </React.Fragment>
}

export default TableHeader