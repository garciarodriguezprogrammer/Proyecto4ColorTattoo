"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mig11706036888910 = void 0;
class Mig11706036888910 {
    constructor() {
        this.name = 'Mig11706036888910';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`users\` (\`ID_USER\` int NOT NULL AUTO_INCREMENT, \`USER_NAME\` varchar(100) NOT NULL, \`EMAIL\` varchar(100) NOT NULL, \`PASS\` varchar(100) NOT NULL, \`ROL\` varchar(50) NOT NULL, PRIMARY KEY (\`ID_USER\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`appointments\` (\`ID_APPOINTMENT\` int NOT NULL AUTO_INCREMENT, \`DATE_TIME\` timestamp NOT NULL, \`DESCRIPTION_TATTOO\` text NOT NULL, \`iDCLIENTIDUSER\` int NULL, \`iDARTISTIDUSER\` int NULL, PRIMARY KEY (\`ID_APPOINTMENT\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_6f85bbec4920cdfd99208fa96ac\` FOREIGN KEY (\`iDCLIENTIDUSER\`) REFERENCES \`users\`(\`ID_USER\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_1a079be991b2688bd9deee9d951\` FOREIGN KEY (\`iDARTISTIDUSER\`) REFERENCES \`users\`(\`ID_USER\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_1a079be991b2688bd9deee9d951\``);
            yield queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_6f85bbec4920cdfd99208fa96ac\``);
            yield queryRunner.query(`DROP TABLE \`appointments\``);
            yield queryRunner.query(`DROP TABLE \`users\``);
        });
    }
}
exports.Mig11706036888910 = Mig11706036888910;
