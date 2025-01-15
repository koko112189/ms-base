import { Injectable } from '@nestjs/common';
import { IServiceErrorProvider } from '../service-error.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceErrorEntity } from 'src/data-provider/entities/service-error.entity';
import { Repository } from 'typeorm';
import { IServiceError } from 'src/core/model/service-error.model';
import { Etask } from 'src/common/utils/enums/task.enum';

@Injectable()
export class ServiceErrorProvider implements IServiceErrorProvider {
    constructor(
        @InjectRepository(ServiceErrorEntity) private readonly serviceErrorRepository: Repository<ServiceErrorEntity>,
    ) { }

    /**
    * Operación de inserción de un error
    * @param {IServiceError} serviceError arreglo con información del error
    */
    async createServiceError(serviceError: IServiceError) {
        const startTime = process.hrtime();
        const result = await this.serviceErrorRepository.save(serviceError);
        this.logServiceError(startTime, result, serviceError)
    }

    /**
    * Función para generar log informativo de proceso de inserción en bd de coll_service_error
    * @param {any} startTime cadena fecha inicio consulta bd
    * @param {any} response Arreglo con información de respuesta consulta bd 
    * @param {any} request Arreglo con información de inserción consulta bd 
    * @param {Etask} etask Identificación tarea a insertar en consulta bd
    */
    logServiceError(startTime: any, response: any, request: any, etask: Etask = Etask.SERVICE_ERROR): void {
        const endTime = process.hrtime(startTime);
        const executionTime = Math.round((endTime[0] * 1000) + (endTime[1] / 1000000));
        console.info(`[SERVICE_ERROR] - Execution time: ${executionTime}ms - Task: ${etask} - Request: ${JSON.stringify(request)} - Response: ${JSON.stringify(response)}`);
    }

}