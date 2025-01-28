import { ITask } from "../../types/task.type";

export interface UpdateTaskUseCase {
    execute(options: IUpdateTask): ITask;
}

interface IUpdateTask {
    task: ITask;
    newDescription?: string;
    status?: string;
}

export class UpdateTask implements UpdateTaskUseCase {

    public execute({task, newDescription, status}: IUpdateTask): ITask {
        if(status) {
            task.status = status;
            task.updatedAt = new Date().toISOString();
            return task;
        }
        
        if (newDescription) {
            task.description = newDescription;
        }
        task.updatedAt = new Date().toISOString();
        return task;
    }

}