import { ACTIONS } from "./types/actions.type";
import fs from "fs";
import { ITask } from "./types/task.type";

export class Main {

    public static start() {
        const args = process.argv.slice(2);
        const id = +args[1];
        const path = "db";
        
        switch (args[0]) {
            case ACTIONS.ADD:
                const task = args[1];
                fs.mkdirSync(path, { recursive: true });
                let tasks: ITask[] = [];
                if (fs.existsSync(`${path}/tasks.json`)) {
                    const data = fs.readFileSync(`${path}/tasks.json`, "utf-8");
                    tasks = JSON.parse(data);
                }
                const newTask: ITask = {
                    id: tasks.length + 1,
                    description: task,
                    status: "to-do",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                tasks.push(newTask);
                fs.writeFileSync(`${path}/tasks.json`, JSON.stringify(tasks, null, 2));
                break;
            case ACTIONS.UPDATE:
                const newDescription = args[2];
                let tasksToUpdate: ITask[] = [];
                if (fs.existsSync(`${path}/tasks.json`)) {
                    const data = fs.readFileSync(`${path}/tasks.json`, "utf-8");
                    tasksToUpdate = JSON.parse(data);
                }
                let taskToUpdate = tasksToUpdate.find((task) => task.id === id);
                if (taskToUpdate) {
                    taskToUpdate.description = newDescription;
                    taskToUpdate.updatedAt = new Date().toISOString();
                }

                fs.writeFileSync(`${path}/tasks.json`, JSON.stringify(tasksToUpdate));
                break;
            case ACTIONS.DELETE:
                let tasksToDelete: ITask[] = [];
                if(fs.existsSync(`${path}/tasks.json`)) {
                    const data = fs.readFileSync(`${path}/tasks.json`, 'utf-8');
                    tasksToDelete = JSON.parse(data);
                }

                let taskToDelete = tasksToDelete.find((task) => task.id === id);
                if(taskToDelete) {
                    let idxTaskDeleted = tasksToDelete.indexOf(taskToDelete);
                    tasksToDelete.splice(idxTaskDeleted, 1);
                }
                fs.writeFileSync(`${path}/tasks.json`, JSON.stringify(tasksToDelete));
                break;
            case ACTIONS.LIST:
                let tasksToShow: ITask[] = [];
                if(fs.existsSync(`${path}/tasks.json`)) {
                    const data = fs.readFileSync(`${path}/tasks.json`, 'utf-8');
                    tasksToShow = JSON.parse(data);
                }
                console.table(tasksToShow);
                break;
            case ACTIONS.MARK_IN_PROGRESS:
                let tasksToMarkInProgress: ITask[] = [];
                if(fs.existsSync(`${path}/tasks.json`)) {
                    const data = fs.readFileSync(`${path}/tasks.json`, 'utf-8');
                    tasksToMarkInProgress = JSON.parse(data);
                }
                let taskToMarkInProgress = tasksToMarkInProgress.find((task) => task.id === id);
                if(taskToMarkInProgress) {
                    taskToMarkInProgress.status = "in-progress";
                    taskToMarkInProgress.updatedAt = new Date().toISOString();
                }
                fs.writeFileSync(`${path}/tasks.json`, JSON.stringify(tasksToMarkInProgress));
                break;
            case ACTIONS.MARK_DONE:
                let tasksToMarkInDone: ITask[] = [];
                if(fs.existsSync(`${path}/tasks.json`)) {
                    const data = fs.readFileSync(`${path}/tasks.json`, 'utf-8');
                    tasksToMarkInDone = JSON.parse(data);
                }
                let taskToMarkInDone = tasksToMarkInDone.find((task) => task.id === id);
                if(taskToMarkInDone) {
                    taskToMarkInDone.status = 'done';
                    taskToMarkInDone.updatedAt = new Date().toISOString();
                }
                fs.writeFileSync(`${path}/tasks.json`, JSON.stringify(taskToMarkInDone));
                break;
            default:
                console.log("Invalid command");
                break;
        }
    }
}
