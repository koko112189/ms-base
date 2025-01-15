import { Injectable } from '@nestjs/common';
import { IServiceTracingProvider } from '../service-tracing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTracingEntity } from 'src/data-provider/entities/service-tracing.entity';
import { Repository } from 'typeorm';
import { IServiceTracing } from 'src/core/model/service-tracing.model';

@Injectable()
export class ServiceTracingProvider implements IServiceTracingProvider {

    constructor(
        @InjectRepository(ServiceTracingEntity) private readonly serviceTracingRepository: Repository<ServiceTracingEntity>,
    ) { }
 
    /**
    * Operación de inserción de la trazabilidad de los ms
    * @param {IServiceTracing} serviceTracing arreglo con información la trazabilidad de
    */
    async createServiceTracing(serviceTracing: IServiceTracing) {
        await this.serviceTracingRepository.save(serviceTracing);
    }

}