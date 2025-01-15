import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('service_tracing')
export class ServiceTracingEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ type: 'varchar', length: 300 })
    transactionId: string;
    @Column({ type: 'varchar', length: 300 })
    task: string;
    @Column({ type: 'varchar', length: 300 })
    origen: string;
    @Column({ type: 'text' })
    method: string;
    @Column({ type: 'text' })
    status: string;
    @Column({ type: 'text', nullable: true })
    request: string;
    @Column({ type: 'text', nullable: true })
    response: string;
    @Column({ type: 'int', nullable: true })
    processingTime: number

}

