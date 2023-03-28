import * as mongoose from "mongoose"

import Config from "../../config"


export const runDbInitTasks = async () => {
    const conn = `mongodb://${Config.MONGO_USER}:${Config.MONGO_PASS}@${Config.MONGO_HOST}:${Config.MONGO_PORT}/${Config.MONGO_DB}`
    await mongoose.connect(conn)
}