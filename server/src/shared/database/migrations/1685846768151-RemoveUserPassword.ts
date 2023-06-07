import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserPassword1685846768151 implements MigrationInterface {
  name = 'RemoveUserPassword1685846768151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "password"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ADD "password" character varying NOT NULL`,
    );
  }
}
