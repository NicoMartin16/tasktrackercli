import { ITask } from "../../types/task.type";

interface CreateTaskUseCase {
    execute: (id: number, description: string) => ITask;
}


export class CreateTask implements CreateTaskUseCase {


    public execute = (id: number, description: string): ITask => {
        return {
            id,
            description,
            status: "to-do",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
}