import { ITask } from "../../types/task.type";

export interface DeleteTaskUseCase {
    execute(tasks: ITask[], task: ITask): ITask[];
}

export class DeleteTask implements DeleteTaskUseCase {

    public execute(tasks: ITask[], task: ITask): ITask[] {
        let idxTaskDeleted = tasks.indexOf(task);
        tasks.splice(idxTaskDeleted, 1);
        return tasks;
    }

}