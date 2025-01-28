import { ITask } from "../../types/task.type";

interface ListTaskUseCase {
    execute(tasks: ITask[]): void;
}



export class ListTask implements ListTaskUseCase{
    public execute(tasks: ITask[]): void {
        console.table(tasks)
    }
}