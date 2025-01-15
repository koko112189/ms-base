/**
 * Clase con la funcionalidad de los mensajes del ms
 * @author Fredy Santiago Martinez
 */
import { Injectable } from '@nestjs/common';
import { IMessageUc } from './../message.uc';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IMessage } from 'src/core/model/message.model';
import { Etask, EtaskDesc } from 'src/common/utils/enums/task.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { BusinessException } from 'src/common/lib/business-exception';
import GeneralUtils from 'src/common/utils/general-utils';
import { IServiceTracingUc } from '../service-tracing.resource.uc';
import { IMessageProvider } from 'src/data-provider/provider/message.provider';



@Injectable()
export class MessageUcimpl implements IMessageUc {

    private static messages: IMessage[] = [];

    constructor(
        public readonly _messageProvider: IMessageProvider,
        private readonly _serviceTracing: IServiceTracingUc
    ) { }

    /**
    * Al cargar el modulo se ejecuta la lógica de carga de mensajes en memoria
    */
    async onModuleInit() {
        await this.loadMessages();
    }

    /**
    * Retorna todos los mensajes configurados
    * @returns {Object} Información mensajes configurados
    */
    public static get getMessages(): IMessage[] {
        return MessageUcimpl.messages;
    }

    /**
    * Funcion para cargar los mensajes en las variables estaticas
    */
    async loadMessages(): Promise<any> {
        let message: IMessage[] = [];
        try {
            console.log('Cargando mensajes...');
            message = await this._messageProvider.getMessages(1, 100, {});
            console.log(message);
        } catch (error) {
        } finally {
            // Actualizar variable estática
            MessageUcimpl.messages = message;
        }
    }

    /**
    * Funcion para actualiza el mensaje
    * @param {IMessage} message Objeto con información del mensaje
    * @returns {Object} el mensaje actualizado
    */
    async update(message: IMessage): Promise<IMessage> {
        const result = await this._messageProvider.updateMessage(message);
        if (result == null)
            throw new BusinessException(400, 'No existe un mensaje con el código indicado', true);

        // Si se actualiza en bd, actualizar variable estática
        const messagePosition = MessageUcimpl.messages.findIndex(msg => msg.id === message.id);
        MessageUcimpl.messages[messagePosition] = message;

        return result;
    }

    /**
    * Funcion para consultar el mensaje por Identificador
    * @param {string} idMessage Identificador del mensaje
    * @returns {Object} Información asociada al mensaje
    */
    async getById(idMessage: number): Promise<IMessage> {
        return this._messageProvider.getMessage(idMessage);
    }


    /**
    * Funcion para consultar configurados
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter Objeto de campos a consultar
    * @returns {ResponsePaginator} Respuesta paginada con información de los mensajes
    */
    async getMessages(page: number, limit: number, filter: any): Promise<ResponsePaginator<IMessage>> {
        try {
            const documents = await this._messageProvider.loadMessages(
                page,
                limit,
                filter
            );
            if (!documents)
                throw new BusinessException(400, 'No se encontró información con los filtros indicados');
            return new ResponsePaginator(documents, page, limit);
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.LOAD_MESSAGE, EtaskDesc.LOAD_MESSAGE);
            throw error;
        }
    }

}