import { MutableRefObject, useRef, useEffect } from "react"
import { ColumnMeta } from "./types"

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

export default useHeaderCellRefs