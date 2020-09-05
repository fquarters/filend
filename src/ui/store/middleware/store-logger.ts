import { MiddlewareAPI, Dispatch, AnyAction } from "redux"
import Logger from "js-logger"

const logger = Logger.get('store-logger')

const storeLogger = (api: MiddlewareAPI) =>
    (next: Dispatch<AnyAction>) =>
        (action: AnyAction) => {


            logger.debug('enter', action)

            const state = next(action)

            logger.debug('exit', action)

            return state
        }

export default storeLogger