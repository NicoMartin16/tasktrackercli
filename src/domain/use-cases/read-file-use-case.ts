import { ITask } from "../../types/task.type";
import fs from "fs";

interface ReadFileUseCase {
    execute(path: string, fileName: string): ITask[];
}

export class ReadFile implements ReadFileUseCase {

    public data: ITask[] = [];

    public execute(path: string, fileName: string): ITask[] {
        if (fs.existsSync(`${path}/${fileName}.json`)) {
            const tasks = fs.readFileSync(`${path}/${fileName}.json`, "utf-8");
            this.data = JSON.parse(tasks);
            return this.data;
        }
        return [];
    }

}