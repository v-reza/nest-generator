import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Idatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true})
  code: string

  @Column()
  name: string
}
