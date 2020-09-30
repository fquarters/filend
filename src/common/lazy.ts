import { Supplier } from "./types"

export type Lazy<T> = {
    get: Supplier<T>
}

const lazy = <T>(supplier: Supplier<T>): Lazy<T> => {

    let value: T | null = null

    return {
        
        get() {

            if (!value) {

                value = supplier()
            }

            return value
        }
    }
}

export default lazy