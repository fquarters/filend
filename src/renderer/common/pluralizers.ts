import { MapFunction } from "../../common/types"
import { Locales } from "./locales"

type PluralizerArgs<T> = {
    count: number,
    localeSpecific: T
}

type Pluralizer<T> = MapFunction<PluralizerArgs<T>, string>

type RuSpecificArgs = {
    forms: {
        one: string,
        twoToFour: string,
        many: string
    }
}

type EnSpecificArgs = {
    forms: {
        one: string,
        many: string
    }
}

type LocalSpecificArgMapType = {
    ru: RuSpecificArgs,
    en: EnSpecificArgs
}

type LocalizedPluralizerMapType = {
    [K in Locales]: Pluralizer<LocalSpecificArgMapType[K]>
}

const LocalizedPluralizerMap: LocalizedPluralizerMapType = {
    en: (args: PluralizerArgs<EnSpecificArgs>) => {

        if (args.count < 0) {
            throw 'Negative value'
        }

        if (args.count == 1) {

            return args.localeSpecific.forms.one
        }

        return args.localeSpecific.forms.many
    },
    ru: (args: PluralizerArgs<RuSpecificArgs>) => {
        
        if (args.count < 0) {
            throw 'Negative value'
        }

        const {
            one,
            twoToFour,
            many
        } = args.localeSpecific.forms

        if (args.count > 4 && args.count <= 20) {

            return many

        } else {

            const rem = args.count % 10

            if (rem == 0 || rem > 4) {
    
                return many

            } else if (rem >= 2) {

                return twoToFour

            } else {
                return one
            }
        }
    }
}

export default LocalizedPluralizerMap