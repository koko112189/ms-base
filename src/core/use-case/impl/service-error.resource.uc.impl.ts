import { Injectable } from '@nestjs/common';
import { IServiceErrorUc } from '../service-error.resource.uc';

import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { IServiceErrorProvider } from 'src/data-provider/provider/service-error.provider';
import { ITaskError } from 'src/core/model/task-error.model';
import { IServiceError } from 'src/core/model/service-error.model';
import { IServiceTracingInicial } from 'src/core/model/service-tracing.model';

@Injectable()
export class ServiceErrorUcimpl implements IServiceErrorUc {
    constructor(
        private readonly _serviceErrorProvider: IServiceErrorProvider
    ) { }
    /**
    * Funcion para la creación de errores en los ms
    * @param {Object} error arreglo información de error
    * @param {ITaskError} task Identificador de la tarea donde se genero el error
    * @param {IServiceTracingInicial} tracingInfoPrincipal arreglo información adicional donde se genero el error
    */
    async createServiceError(error: any, task: ITaskError, request: any, tracingInfoPrincipal:IServiceTracingInicial, nivel: ELevelsErros) {

        const dataError: IServiceError = {
            success: error.success || false,
            serviceid:tracingInfoPrincipal.id,
            origen: tracingInfoPrincipal.origen,
            method: tracingInfoPrincipal.method,
            message: error.message,
            channel:tracingInfoPrincipal.channel,
            stack: error.stack,
            request:request,
            response:tracingInfoPrincipal.response,
        }
        this._serviceErrorProvider.createServiceError(dataError);
    }
}
