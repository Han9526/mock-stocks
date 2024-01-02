import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'ticketing',
})
export class Ticketing {
  @PrimaryGeneratedColumn({ name: 'ticketing_id' })
  ticketingId: number;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  seat: string;

  @Column({ name: 'show_id', type: 'bigint' })
  showId: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(2)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(2)',
  })
  updatedAt: Date;

  @ManyToOne(() => Show, (show) => show.ticketing)
  @JoinColumn({ name: 'show_id' })
  show: Show[];

  @ManyToOne(() => User, (user) => user.ticketing)
  @JoinColumn({ name: 'user_id' })
  user: User[];
}
