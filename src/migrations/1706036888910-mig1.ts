import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig11706036888910 implements MigrationInterface {
    name = 'Mig11706036888910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`ID_USER\` int NOT NULL AUTO_INCREMENT, \`USER_NAME\` varchar(100) NOT NULL, \`EMAIL\` varchar(100) NOT NULL, \`PASS\` varchar(100) NOT NULL, \`ROL\` varchar(50) NOT NULL, PRIMARY KEY (\`ID_USER\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`ID_APPOINTMENT\` int NOT NULL AUTO_INCREMENT, \`DATE_TIME\` timestamp NOT NULL, \`DESCRIPTION_TATTOO\` text NOT NULL, \`iDCLIENTIDUSER\` int NULL, \`iDARTISTIDUSER\` int NULL, PRIMARY KEY (\`ID_APPOINTMENT\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_6f85bbec4920cdfd99208fa96ac\` FOREIGN KEY (\`iDCLIENTIDUSER\`) REFERENCES \`users\`(\`ID_USER\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_1a079be991b2688bd9deee9d951\` FOREIGN KEY (\`iDARTISTIDUSER\`) REFERENCES \`users\`(\`ID_USER\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_1a079be991b2688bd9deee9d951\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_6f85bbec4920cdfd99208fa96ac\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
