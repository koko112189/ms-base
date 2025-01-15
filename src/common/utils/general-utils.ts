import Traceability from "../lib/traceability";
import { ELevelsErros } from "./enums/logging.enum";
import { Etask, EtaskDesc } from "./enums/task.enum";
import { EStatusTracingGeneral, ETaskTracingGeneral } from "./enums/tracing.enum";

const rTracer = require('cls-rtracer');
export default class GeneralUtils {
    public static get getCorrelationalId(): string {
        return rTracer.id() || '';
    }

    public static assignTaskError(error, task:Etask, taskDesc:EtaskDesc){
        error.task_name = (error.task_name !== undefined) ? error.task_name : task;
        error.task_description = (error.task_description !== undefined) ? error.task_description : taskDesc;
      }

      public static isEmptyObject(obj: any) {
        return Object.getOwnPropertyNames(obj).length !== 0;
      }

      public static logRequestResponse( req, request, name, data?, executionTime? ){
        let message: string = 'Entrada';
        let level = ELevelsErros.INFO;
        
        if(data) {
          message = 'Salida';
          if (data.status !== 200 )
            level = ELevelsErros.WARNING;
        }
    }

    public static traceabilityInterceptor( req, request, data?, executionTime? ){
        let task = ETaskTracingGeneral.INICIO_REQUEST;
        let status = EStatusTracingGeneral.STATUS_SUCCESS;
        
        let traceability = new Traceability({});
        traceability.setTransactionId(this.getCorrelationalId);
        traceability.setOrigen(req.url);
        traceability.setRequest(request);
        traceability.setMethod(req.method);
    
        if(data){
          traceability.setResponse(data);
          traceability.setProcessingTime(executionTime);
          task = ETaskTracingGeneral.FINAL_REQUEST;
          if (data.status !== 200 )
            status = EStatusTracingGeneral.STATUS_FAILED;
        }
    
        traceability.setTask(task);
        traceability.setStatus(status);
        return traceability;
      }

      public static getOrigin(url: string): string {
        return `${"/ms-product"}${(url?.includes('?')) ? url.slice(0, url.indexOf('?')) : url}`;
      }
}