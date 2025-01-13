// src/migrations/InitialMigration.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE DATABASE ms-product_db;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP DATABASE ms-product_db;`);
  }
}