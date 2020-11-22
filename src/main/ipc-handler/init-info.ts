import * as drivelist from 'drivelist'
import { app } from "electron"
import { unique } from '../../common/collections'
import { InitInfo } from "../../common/ipc/protocol"

const getInitInfo = async (): Promise<InitInfo> => {

    const drives = await drivelist.list()

    return new Promise((resolve) => {

        resolve({
            locale: app.getLocale(),
            mountpoints: unique(drives
                .filter((drive: drivelist.Drive) => drive.mountpoints.length)
                .flatMap((drive: drivelist.Drive) => drive.mountpoints)
                .map((mountpoint: drivelist.Mountpoint) => mountpoint.path))
        })
    })
}

export default getInitInfo