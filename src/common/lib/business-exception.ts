import { EmessageMapping } from "../utils/enums/message.enum";
import { Etask } from "../utils/enums/task.enum";

export class BusinessException extends Error {
    constructor(
        public readonly code: number,
        public readonly description: string,
        public readonly success: boolean = false,
        public readonly details?: IoptionalDetails
      ) {
        super(description);
      }
    }

    export interface IoptionalDetails {
        readonly codMessage?: EmessageMapping;
        readonly context?: string;
        readonly task?: Etask;
        readonly document?: any;
      }