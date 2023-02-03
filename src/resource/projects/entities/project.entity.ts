import { User } from 'src/resource/users/entities/user.entity';
import { Configuration } from './../../configurations/entities/configuration.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => User, (user) => user.project)
  user: User

  @OneToOne(() => Configuration, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  configuration: Configuration

}
