import { Column, Entity } from "typeorm";



@Entity('service_error')
export class ServiceErrorEntity {

    @Column({ primary: true, generated: true })
    id: number;
    @Column({ nullable: true })
    success?: boolean;

    @Column({ nullable: true })
    origen?: string;

    @Column()
    method: string;

    @Column({ nullable: true })
    tack?: string;

    @Column({ nullable: true })
    message?: string;

    @Column({ nullable: true })
    channel?: string;

    @Column({ nullable: true })
    stack?: string;

    @Column({ nullable: true })
    request?: string;

    @Column({ nullable: true })
    serviceid?: string;

    @Column({ nullable: true })
    response?: string;

    
}

