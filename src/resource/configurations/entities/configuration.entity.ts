import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('json', { nullable: true, default: null })
  database: any

  @Column({ nullable: true })
  database_host: string

  @Column({ nullable: true })
  database_port: number

  @Column({ nullable: true })
  database_name: string

  @Column({ nullable: true })
  database_username: string

  @Column({ nullable: true })
  database_password: string

  @Column({ nullable: false })
  application_name: string

  @Column('json', { nullable: true, default: null })
  framework: any
}
