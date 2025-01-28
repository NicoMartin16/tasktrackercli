import { ITask } from "../../types/task.type";
import fs from "fs";

export interface WriteFileUseCase {
    execute(options: WriteFileOptions): void;
}

interface WriteFileOptions {
    path: string,
    fileName: string,
    data: ITask[],
    newTask?: ITask
}

export class WriteFile {

    public execute({ path, fileName, data, newTask }: WriteFileOptions) {
        if(newTask) {
            data.push(newTask);
            fs.writeFileSync(`${path}/${fileName}.json`, JSON.stringify(data, null, 2));
        } else {
            fs.writeFileSync(`${path}/${fileName}.json`, JSON.stringify(data));
        }
    }
}