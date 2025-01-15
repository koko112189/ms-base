/**
 * Clase que intercepta las excepciones en el servicio
 * @author Fredy Santiago Martinez
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import * as moment from 'moment';
import { ResponseService } from "../../controller/dto/response-service.dto";
import { EmessageMapping } from "../utils/enums/message.enum";
import { ELevelsErros } from "../utils/enums/logging.enum";
import { EStatusTracingGeneral, ETaskTracingGeneral } from "../utils/enums/tracing.enum";
import Traceability from "./traceability";
import { IServiceTracingUc } from "src/core/use-case/service-tracing.resource.uc";
import { BusinessException } from "./business-exception";
import GeneralUtils from "../utils/general-utils";
import { IServiceTracingInicial } from "src/core/model/service-tracing.model";
import { Etask } from "../utils/enums/task.enum";
import { IServiceErrorUc } from "src/core/use-case/service-error.resource.uc";
import { ITaskError } from "src/core/model/task-error.model";



@Catch()
export class ExceptionManager implements ExceptionFilter {


  constructor(
    public readonly _serviceTracing: IServiceTracingUc,
    public readonly _serviceError: IServiceErrorUc ) {}

  // ...
  async catch(exception, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    let result: ResponseService;

    if (exception instanceof BusinessException)
      result = new ResponseService(exception.success, exception ?.details ?.codMessage || exception ?.description, exception.code, exception ?.details ?.document);
    else if (exception instanceof HttpException)
      result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, exception.getStatus(), exception ?.getResponse()['message']);
    else
      result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);

    const origen: string = GeneralUtils.getOrigin(req['url']);

    result = {
      ...result,
      requestTime: moment().format(),
      method: req.method,
      origen
    }

    let request = (GeneralUtils.isEmptyObject(req.body)) ? req.body : req.query;
    let nivel = (exception instanceof BusinessException || exception instanceof HttpException) ? ELevelsErros.WARNING : ELevelsErros.ERROR;
    let status = (exception instanceof BusinessException || exception instanceof HttpException) ? EStatusTracingGeneral.FAILED : EStatusTracingGeneral.ERROR;
    let _description =(exception instanceof BusinessException || exception instanceof HttpException) ? exception : undefined;


    let traceability = new Traceability({});
    traceability.setTransactionId(GeneralUtils.getCorrelationalId);
    traceability.setOrigen(req.url);
    traceability.setRequest(request);
    traceability.setResponse(result);
    traceability.setMethod(req.method);
    traceability.setTask(ETaskTracingGeneral.FINAL_REQUEST);
    traceability.setStatus(status);
    this._serviceTracing.createServiceTracing(traceability.getTraceability());

    let task:ITaskError = {
      task_name: exception?.task_name || '',
      task_description: exception?.task_description || '',
      description: _description
    }

    let tracingInfoPrincipal:IServiceTracingInicial = {
      id: GeneralUtils.getCorrelationalId,
      origen,
      method: req.method,
      response: JSON.stringify(result),
      channel: req.headers.channel 
    }

    this._serviceError.createServiceError(exception, task, request, tracingInfoPrincipal, nivel);


    response
      .status(result.status)
      .json(result);
  }

}