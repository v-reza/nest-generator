import { Exclude } from 'class-transformer';
import { Project } from './../../projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  username: string

  @Column({ select: false })
  password: string

  @OneToMany(() => Project, (project) => project.user)
  project: Project[]
}
