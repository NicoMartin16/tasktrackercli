import { ACTIONS } from "./types/actions.type";
import fs from "fs";
import { ITask } from "./types/task.type";
import { CreateTask, DeleteTask, ListTask, ReadFile, UpdateTask, WriteFile } from "./domain/use-cases";


export class Main {

    public static start() {
        const args = process.argv.slice(2);
        const id = +args[1];
        const path = "db";
        let data: ITask[] = new ReadFile().execute(path, 'tasks');
        
        switch (args[0]) {
            case ACTIONS.ADD:
                const task = args[1];
                fs.mkdirSync(path, { recursive: true });
                const newTask: ITask = new CreateTask().execute(data.length + 1, task);
                new WriteFile().execute({path, fileName: 'tasks', data, newTask});
                break;
            case ACTIONS.UPDATE:
                const newDescription = args[2];
                let taskToUpdate: ITask | undefined = data.find((task) => task.id === id);
                if(!taskToUpdate) {
                    console.log("Task not found");
                    return;
                }
                taskToUpdate = new UpdateTask().execute({task: taskToUpdate, newDescription});
                new WriteFile().execute({path, fileName: 'tasks', data});
                break;
            case ACTIONS.DELETE:
                let taskToDelete: ITask | undefined = data.find((task) => task.id === id);
                if(!taskToDelete) {
                    console.log("Task not found");
                    return;
                }
                data = new DeleteTask().execute(data, taskToDelete);
                new WriteFile().execute({path, fileName: 'tasks', data});
                break;
            case ACTIONS.LIST:
                new ListTask().execute(data);
                break;
            case ACTIONS.MARK_IN_PROGRESS:
                let taskToMarkInProgress: ITask | undefined = data.find((task) => task.id === id);
                if(!taskToMarkInProgress) {
                    console.log("Task not found");
                    return
                }
                new UpdateTask().execute({ task: taskToMarkInProgress, status: 'in-progress' });
                new WriteFile().execute({path, fileName: 'tasks', data});
                break;
            case ACTIONS.MARK_DONE:
                let taskToMarkInDone: ITask | undefined = data.find((task) => task.id === id);
                if(!taskToMarkInDone) {
                    console.log("Task not found");
                    return;
                }
                new UpdateTask().execute({ task: taskToMarkInDone, status: 'done' });
                new WriteFile().execute({path, fileName: 'tasks', data});
                break;
            default:
                console.log("Invalid command try other command");
                break;
        }
    }
}
