import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity("staff")
export class Staff {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  rol: string;
}
