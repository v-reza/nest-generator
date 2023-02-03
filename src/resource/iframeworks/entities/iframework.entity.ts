import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Iframework {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  code: string

  @Column()
  name: string
}
