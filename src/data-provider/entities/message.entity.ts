import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class MessageEntity {
    @Column({ primary: true, generated: true })
    id: number;
    @Column({ type: 'varchar', length: 300 })
    idMesage: string;
    @Column({ type: 'varchar', length: 300 })
    description: string;
    @Column({ type: 'text' })
    message: string;
}
