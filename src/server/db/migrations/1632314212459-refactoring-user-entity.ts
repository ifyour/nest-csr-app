import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from '../../api/users/user.entity';

export class refactoringUserEntity1632314212459 implements MigrationInterface {
    name = 'refactoringUserEntity1632314212459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "isActive" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "isActive") SELECT "id", "isActive" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_3021ae0235cf9c4a6d59663f859" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "isActive") SELECT "id", "isActive" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);

        await this.seed();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "isActive" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "user"("id", "isActive") SELECT "id", "isActive" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "gender" integer NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "user"("id", "isActive") SELECT "id", "isActive" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

    private async seed(): Promise<void> {
        await getRepository(User).save([
            {
                id: 1,
                username: 'ifyour',
                password: '123456',
                isActive: true,
            },
            {
                id: 2,
                username: 'teng',
                password: 'qq123',
                isActive: true,
            },
            {
                id: 3,
                username: 'json',
                password: 'password',
                isActive: true,
            },
        ]);
    }

}
