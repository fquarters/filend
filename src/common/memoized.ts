import { MapFunction } from "./types"
import { shallowEqual } from "react-redux"

type Memoized<K, V> = {
    prevArg: K | null,
    prevResult: V | null
}

const memoized = <K, V>() =>

    function (this: Memoized<K, V>, impl: MapFunction<K, V>): MapFunction<K, V> {

        return (arg: K): V => {


            if (shallowEqual(arg, this.prevArg)) {

                return this.prevResult!
            }

            const result = impl(arg)
            this.prevArg = arg
            this.prevResult = result

            return result
        }

    }.bind({
        prevArg: null,
        prevResult: null
    })

export default memoized