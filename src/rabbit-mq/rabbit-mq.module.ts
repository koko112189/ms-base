import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBIT_MQ',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
                    queue: 'transaction-queeue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class RabbitMqModule {}
