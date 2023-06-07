import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSub1685845701282 implements MigrationInterface {
  name = 'AddUserSub1685845701282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ADD "sub" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" ADD CONSTRAINT "UQ_c8fbb12b7cdfa7ebb4cb8b55393" UNIQUE ("sub")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c8fbb12b7cdfa7ebb4cb8b5539" ON "User" ("sub") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8fbb12b7cdfa7ebb4cb8b5539"`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" DROP CONSTRAINT "UQ_c8fbb12b7cdfa7ebb4cb8b55393"`,
    );
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "sub"`);
  }
}
