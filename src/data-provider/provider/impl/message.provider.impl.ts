import { Injectable } from '@nestjs/common';
import { IMessageProvider } from '../message.provider';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { MessageEntity } from 'src/data-provider/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IMessage } from 'src/core/model/message.model';
import { IServiceTracingUc } from 'src/core/use-case/service-tracing.resource.uc';

@Injectable()
export class MessageProvider implements IMessageProvider {
    constructor(
        @InjectRepository(MessageEntity) private  messageRepository: Repository<MessageEntity>,
        private readonly _serviceTracing: IServiceTracingUc
    ) { }

    
    async getTotal(): Promise<number> {
        return this.messageRepository.count();
    }

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    * @returns {Object} informacion asociada a la busquedad
    */
    async getMessages(page: number, limit: number, filter: string): Promise<IMessage[]> {
        const skip = (page - 1) * limit;
        return this.messageRepository.find({
            skip,
            take: limit,
        });
    }

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    * @returns {Object} informacion asociada a la busquedad
    */
    async loadMessages(page: number, limit: number, filter: any): Promise<IMessage[]> {
        try {
            // const request = {
            //     page,
            //     limit,
            //     filter,
            //     projection
            // }
            // const startTime = process.hrtime(); 
            // let traceability = new Traceability({});
            // traceability.setTransactionId(GeneralUtil.getCorrelationalId);
            // traceability.setTask(`REQUEST_CONSUMO_BD_${ETaskMessageGeneral.GET_ALL}`);
            // traceability.setStatus(EStatusTracingGeneral.BD_SUCCESS);
            // traceability.setRequest(request);
            // this._serviceTracing.createServiceTracing(traceability.getTraceability());
             const result = await this.getMessages(page, limit, filter );

            //const processingTime = this.processExecutionTime(startTime);

            // let traceabilityResponse = new Traceability({});
            // traceabilityResponse.setTransactionId(GeneralUtil.getCorrelationalId);
            // traceabilityResponse.setTask(`RESPONSE_CONSUMO_BD_${ETaskMessageGeneral.GET_ALL}`);
            // traceabilityResponse.setStatus((result.length === 0) ? EStatusTracingGeneral.BD_WARN : EStatusTracingGeneral.BD_SUCCESS);
            // traceabilityResponse.setRequest(request);
            // traceabilityResponse.setResponse(result);
            // traceabilityResponse.setProcessingTime(processingTime);
            // this._serviceTracing.createServiceTracing(traceabilityResponse.getTraceability());
            return result;
        } catch (error) {
            //GeneralUtil.assignTaskError(error, Etask.LOAD_MESSAGE, ETaskDesc.LOAD_MESSAGE);
            throw error;
        }
    }

    /**
    * Operación para consultar un mensaje por su identificador
    * @param {String} id identificador de mensaje
    * @returns {Object} informacion asociada a la busquedad
    */
    async getMessage(id: number): Promise<IMessage> {
        return this.messageRepository.findOne({ where: { id } });
    }


    /**
    * Operación de actualización de un mensaje
    * @param {IMessage} message arreglo con información del mensaje
    * @returns {Object} informacion asociada a la actualizacion
    */
    async updateMessage(message: IMessage): Promise<IMessage> {
        try {
            await this.messageRepository.update(message.id, message);
            return this.getMessage(message.id);
        } catch (error) {
            throw error;
        }
    }

    /**
    * Función para generar log informativo para el services provider de Message
    * @param {any} startTime cadena fecha inicio consulta bd
    */
    processExecutionTime(startTime: any): number {
        const endTime = process.hrtime(startTime);
        return Math.round((endTime[0] * 1000) + (endTime[1] / 1000000));
    }
}