import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamKey1685742917872 implements MigrationInterface {
  name = 'AddStreamKey1685742917872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Video" ADD "stream_key" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Video" DROP COLUMN "stream_key"`);
  }
}
