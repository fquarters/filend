import { MiddlewareAPI, Dispatch, AnyAction } from "redux"
import Logger from "js-logger"

const logger = Logger.get('store-logger')

const storeLogger = (api: MiddlewareAPI) =>
    (next: Dispatch<AnyAction>) =>
        (action: AnyAction) => {

            logger.debug('enter', action)

            next(action)

            logger.debug('exit', api.getState())

            return action
        }

export default storeLogger