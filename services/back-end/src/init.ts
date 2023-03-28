import { runDbInitTasks } from "./services/db/init.db"

export const runInitTasks = async () => {
    await runDbInitTasks()
}