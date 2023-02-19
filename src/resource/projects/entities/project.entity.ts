import { User } from './../../users/entities/user.entity';
import { Configuration } from './../../configurations/entities/configuration.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.project)
  user: User;

  @OneToOne(() => Configuration, (configuration) => configuration.project, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'configuration_id',
  })
  configuration: Configuration;
}
