import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TypeOfVisit {
  OFFICIAL = 'official',
  PRIVATE = 'private',
}

export enum ComingBack {
  YES = 'yes',
  NO = 'no',
}

@Entity('visitors')
export class VisitorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  visitors_name: string;

  @Column()
  visitors_address: string;

  @Column()
  whom_to_see: string;

  @Column({ type: Boolean, default: false })
  any_appointment: boolean;

  @Column()
  type_of_visit: TypeOfVisit;

  @Column()
  purpose_of_visit: string;

  @Column()
  are_you_coming_back: ComingBack;

  @Column()
  return_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
