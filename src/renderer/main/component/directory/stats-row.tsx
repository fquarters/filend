import React, { useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import Strings from "../../../common/strings"
import useLocale from "../../../hook/use-locale"
import Selectors, { filterSelectedFiles } from "../../store/data/selectors"
import { Side } from "../../store/data/state"

type StatsRowProps = {
    side: Side,
    tab: number
}

const StatsRow = ({
    side,
    tab
}: StatsRowProps) => {

    const tabState = useSelector(Selectors.tabByIndex({
        side,
        index: tab
    }), shallowEqual)

    const locale = useLocale()

    const stats = useMemo(() => {

        const selectedFiles = filterSelectedFiles(tabState)

        return Strings.getTemplate(locale)('tabStats', {
            selectedCount: selectedFiles.length,
            selectedSize: selectedFiles.reduce((memo, file) => {
                return memo + file.stats.size
            }, 0),
            totalCount: tabState.dirInfo?.files.length || 0
        })
    }, [tabState, locale])

    return <span>{stats}</span>
}

export default StatsRow