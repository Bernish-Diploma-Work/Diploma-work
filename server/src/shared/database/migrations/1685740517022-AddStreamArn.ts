import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamArn1685740517022 implements MigrationInterface {
  name = 'AddStreamArn1685740517022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ADD "streamArn" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "streamArn"`);
  }
}
