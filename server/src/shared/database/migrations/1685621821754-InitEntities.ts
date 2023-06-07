import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1685621821754 implements MigrationInterface {
  name = 'InitEntities1685621821754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Subscription" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "from_user" integer, "to_user" integer, CONSTRAINT "PK_eb0d69496fa84cd24da9fc78edd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Video" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "is_public" boolean NOT NULL DEFAULT false, "duration" integer NOT NULL DEFAULT '0', "comments_count" integer NOT NULL DEFAULT '0', "likes" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL DEFAULT '', "views" integer NOT NULL DEFAULT '0', "video_path" character varying NOT NULL DEFAULT '', "is_processing" boolean NOT NULL DEFAULT false, "thumbnail_path" character varying NOT NULL DEFAULT '', "user_id" integer, CONSTRAINT "PK_2a23c3da7a2fc570b1696191b87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "subscribers_count" integer NOT NULL DEFAULT '0', "description" text NOT NULL DEFAULT '', "avatar_path" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Comment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "body" text NOT NULL, "user_id" integer, "video_id" integer, CONSTRAINT "PK_fe8d6bf0fcb531dfa75f3fd5bdb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_liked_videos_video" ("userId" integer NOT NULL, "videoId" integer NOT NULL, CONSTRAINT "PK_790ad99f53493514bd5a8b1a045" PRIMARY KEY ("userId", "videoId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43ac4fa88fa99db3024852035c" ON "user_liked_videos_video" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b37e27f93a951d7df719520ce6" ON "user_liked_videos_video" ("videoId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Subscription" ADD CONSTRAINT "FK_37ad6ff4060b309dfd0e6cb2e15" FOREIGN KEY ("from_user") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Subscription" ADD CONSTRAINT "FK_71309992d7fe3baca09d111bafd" FOREIGN KEY ("to_user") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "FK_287e5cf7671bef66254834de3fb" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_35807048116cf822fd0ef9c0299" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_ee3208e6011f580f1022169a56b" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_liked_videos_video" ADD CONSTRAINT "FK_43ac4fa88fa99db3024852035cb" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_liked_videos_video" ADD CONSTRAINT "FK_b37e27f93a951d7df719520ce65" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_liked_videos_video" DROP CONSTRAINT "FK_b37e27f93a951d7df719520ce65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_liked_videos_video" DROP CONSTRAINT "FK_43ac4fa88fa99db3024852035cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_ee3208e6011f580f1022169a56b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_35807048116cf822fd0ef9c0299"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "FK_287e5cf7671bef66254834de3fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Subscription" DROP CONSTRAINT "FK_71309992d7fe3baca09d111bafd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Subscription" DROP CONSTRAINT "FK_37ad6ff4060b309dfd0e6cb2e15"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b37e27f93a951d7df719520ce6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_43ac4fa88fa99db3024852035c"`,
    );
    await queryRunner.query(`DROP TABLE "user_liked_videos_video"`);
    await queryRunner.query(`DROP TABLE "Comment"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "Video"`);
    await queryRunner.query(`DROP TABLE "Subscription"`);
  }
}
