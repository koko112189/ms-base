

import { ITaskError } from "./task-error.model";

export interface IServiceError {
  id?: number;
  success?: boolean;
  origen?: string;
  method?: string;
  tack?: string;
  message?: string;
  channel?: string;
  stack?: string;
  request?: string;
  serviceid?: string;
  response?:string;
}