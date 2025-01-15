
import { Injectable } from '@nestjs/common';
import { ResponseService } from '../dto/response-service.dto';
import { IMessageDTO } from '../dto/message/message.dto';

@Injectable()
export abstract class IMessageService {

    /** 
    * Actualiza un mensaje
    * @param {IMessageDTO} message Información asociada al mensaje
    */
    abstract update(message: IMessageDTO): Promise<ResponseService>;

    /**
    * Consulta mensaje por Id
    * @param {string} idMessage Identificador del mensaje
    */
    abstract getById(idMessage: number): Promise<ResponseService>;

    /**
    * Consulta los mensajes segun el filtro 
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter Objeto de campos a consultar
    */
    abstract getMessages(page: number, limit: number, filter: any, channel: string): Promise<ResponseService>;

}