import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from '../../api/users/user.entity';

export class generateAndSeedUsersTable1632214107313 implements MigrationInterface {
    name = 'generateAndSeedUsersTable1632214107313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1))`);
        // 初始化种子数据
        await this.seed();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

    private async seed(): Promise<void> {
        await getRepository(User).save([
            {
                id: 1,
                firstName: 'wang',
                lastName: 'mingming',
                isActive: true,
            },
            {
                id: 2,
                firstName: 'teng',
                lastName: 'dan',
                isActive: true,
            },
            {
                id: 3,
                firstName: 'Jason',
                lastName: 'White',
                isActive: true,
            },
        ]);
    }

}
