import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'varchar', length:300 })
    createdBy: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'varchar', length:300 })
    updatedBy: string;
}