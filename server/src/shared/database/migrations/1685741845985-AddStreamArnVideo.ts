import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamArnVideo1685741845985 implements MigrationInterface {
  name = 'AddStreamArnVideo1685741845985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Video" ADD "is_stream" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD "is_active_stream" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD "stream_arn" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Video" DROP COLUMN "stream_arn"`);
    await queryRunner.query(
      `ALTER TABLE "Video" DROP COLUMN "is_active_stream"`,
    );
    await queryRunner.query(`ALTER TABLE "Video" DROP COLUMN "is_stream"`);
  }
}
