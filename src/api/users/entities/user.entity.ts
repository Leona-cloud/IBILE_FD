import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: String, unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}
