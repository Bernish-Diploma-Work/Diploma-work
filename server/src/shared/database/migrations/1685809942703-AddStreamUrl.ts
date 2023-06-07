import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamUrl1685809942703 implements MigrationInterface {
  name = 'AddStreamUrl1685809942703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Video" ADD "stream_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Video" DROP COLUMN "stream_url"`);
  }
}
