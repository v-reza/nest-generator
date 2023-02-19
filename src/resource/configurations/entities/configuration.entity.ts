import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
@Entity()
export class Configuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { nullable: true, default: null })
  database: any;

  @Column({ nullable: true })
  database_host: string;

  @Column({ nullable: true })
  database_port: number;

  @Column({ nullable: true })
  database_name: string;

  @Column({ nullable: true })
  database_username: string;

  @Column({ nullable: true })
  database_password: string;

  @Column({ nullable: false })
  application_name: string;

  @Column('json', { nullable: true, default: null })
  framework: any;

  @OneToOne(() => Project, (project) => project.configuration, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  project: Project;
}
