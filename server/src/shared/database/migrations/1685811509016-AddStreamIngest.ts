import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamIngest1685811509016 implements MigrationInterface {
  name = 'AddStreamIngest1685811509016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Video" ADD "stream_ingest" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Video" DROP COLUMN "stream_ingest"`);
  }
}
