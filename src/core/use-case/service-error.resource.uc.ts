
import { Injectable } from '@nestjs/common';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { IServiceTracingInicial } from 'src/core/model/service-tracing.model';
import { ITaskError } from 'src/core/model/task-error.model';


@Injectable()
export abstract class IServiceErrorUc {

    /**
    * Lógica creación errores en los ms
    * @param {Object} error arreglo información de error
    * @param {ITaskError} task Identificador de la tarea donde se genero el error
    * @param {Object} request arreglo información adicional donde se genero el error
    * @param {ELevelsErros} nivel cadena del nivel del error
    */
    abstract createServiceError(error: any, task: ITaskError, request?: any, tracingInfoPrincipal?: IServiceTracingInicial, nivel?: ELevelsErros);
}