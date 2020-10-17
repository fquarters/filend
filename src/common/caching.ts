import { MapFunction } from "./types"

type Caching<K, V> = {
    results: Map<K, V>
}

const caching = <K, V>() =>

    function (this: Caching<K, V>, impl: MapFunction<K, V>): MapFunction<K, V> {

        return (arg: K): V => {

            if (!this.results.has(arg)) {

                this.results.set(arg, impl(arg))
            }

            return this.results.get(arg)!
        }

    }.bind({
        results: new Map()
    })

export default caching