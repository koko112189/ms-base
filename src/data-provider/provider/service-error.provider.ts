

import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/model/service-error.model';

@Injectable()
export abstract class IServiceErrorProvider {

    /**
    * Operación de inserción de un error
    * @param {IServiceError} ServiceErrors arreglo con información del error
    */
    abstract createServiceError(ServiceErrors: IServiceError);

}