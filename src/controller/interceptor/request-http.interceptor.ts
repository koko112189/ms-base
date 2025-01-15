import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { ResponseService } from '../dto/response-service.dto';
import { IServiceTracingUc } from 'src/core/use-case/service-tracing.resource.uc';
import { Moment } from 'moment'
let moment = require('moment');
import GeneralUtils from 'src/common/utils/general-utils';


@Injectable()
export class RequestHttpInterceptor implements NestInterceptor<ResponseService> {

  constructor(public readonly _serviceTracing: IServiceTracingUc) { }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseService> {
    const now = moment();
    const requestTime = moment().format();
    const req = context.switchToHttp().getRequest();
    const resp = context.switchToHttp().getResponse();
    const time = Date.now();
    const request = (GeneralUtils.isEmptyObject(req.body)) ? req.body : req.query;

    GeneralUtils.logRequestResponse(req, request, RequestHttpInterceptor.name);
    const traceabilityStart =  GeneralUtils.traceabilityInterceptor(req, request);
    this._serviceTracing.createServiceTracing(traceabilityStart.getTraceability());

    return next.handle()
      .pipe(
        map(data => 
          ({
            ...data,
            requestTime,
            responseTime: moment().diff(now),
            method: req.method,
            origen: GeneralUtils.getOrigin(context.getArgs()[0]['url']),
            status: data?.status || resp?.statusCode
          }) 
        ),
        tap((data) => {
          const executionTime = Date.now() - time;  
          const traceabilityEnd =  GeneralUtils.traceabilityInterceptor(req, request, data, executionTime);
          this._serviceTracing.createServiceTracing(traceabilityEnd.getTraceability());
          GeneralUtils.logRequestResponse(req, request, RequestHttpInterceptor.name, data, executionTime);
          resp.status(data.status);
        })
      )
  }

}
