/**
 * Clase donde se definen metodos para crear la trazabilidad
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IServiceTracingUc } from '../service-tracing.resource.uc';
import { IServiceTracing } from 'src/core/model/service-tracing.model';
import { IServiceTracingProvider } from 'src/data-provider/provider/service-tracing.provider';


@Injectable()
export class ServiceTracingUcimpl implements IServiceTracingUc {

    constructor(
        private readonly _serviceTracingProvider: IServiceTracingProvider
    ) { }

    /**
    * Lógica creación de la trazabilidad de los ms
    * @param {IServiceTracing} serviceTracing arreglo información de la trazabilidad de los ms
    */
    async createServiceTracing(serviceTracing: IServiceTracing) {
        this._serviceTracingProvider.createServiceTracing(serviceTracing);
    }

}
