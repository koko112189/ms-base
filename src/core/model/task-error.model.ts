import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";

export interface ITaskError {
    task_name: Etask,
    task_description: EtaskDesc,
    description?:any,
}
