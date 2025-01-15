import { Injectable } from '@nestjs/common';
import { IServiceTracing } from '../model/service-tracing.model';
@Injectable()
export abstract class IServiceTracingUc {

    /**
    * Lógica creación de la trazabilidad de los ms
    * @param {IServiceTracing} serviceTracing arreglo información de la trazabilidad de los ms
    */
    abstract createServiceTracing(serviceTracing: IServiceTracing);

}