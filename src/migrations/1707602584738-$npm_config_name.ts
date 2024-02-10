import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1707602584738 implements MigrationInterface {
  name = " $npmConfigName1707602584738";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointment_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "detail" character varying NOT NULL, CONSTRAINT "PK_160dcd4a616d24da928a512b95f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO appointment_type (detail) VALUES ('ortopedia')`
    );
    await queryRunner.query(
      `INSERT INTO appointment_type (detail) VALUES ('neurologia')`
    );
    await queryRunner.query(
      `INSERT INTO appointment_type (detail) VALUES ('cardiologia')`
    );
    await queryRunner.query(
      `INSERT INTO appointment_type (detail) VALUES ('pediatria')`
    );
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO patients (email, full_name, password) VALUES ('patient-amaris@test.com', 'Juan Pablo Diaz Echeverry', 'test123')`
    );
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type_id" uuid, "patient_id" uuid, "doctor_id" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO doctors (full_name) VALUES ('Luis Ortega')`
    );
    await queryRunner.query(
      `INSERT INTO doctors (full_name) VALUES ('Carlos Ochoa')`
    );
    await queryRunner.query(
      `INSERT INTO doctors (full_name) VALUES ('Susana Oria')`
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "rol" character varying NOT NULL, CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO staff (email, full_name, password, rol) VALUES ('staff-amaris@test.com', 'Julian Vargas', 'admin123', 'admin')`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_bd08b84824a9e041f87b986007f" FOREIGN KEY ("type_id") REFERENCES "appointment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_3330f054416745deaa2cc130700" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_4cf26c3f972d014df5c68d503d2" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_4cf26c3f972d014df5c68d503d2"`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_3330f054416745deaa2cc130700"`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_bd08b84824a9e041f87b986007f"`
    );
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "doctors"`);
    await queryRunner.query(`DROP TABLE "appointments"`);
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(`DROP TABLE "appointment_type"`);
  }
}
