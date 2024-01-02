import { Show } from 'src/show/entities/show.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'show_detail',
})
export class ShowDetail {
  @PrimaryGeneratedColumn({ name: 'show_detail_id' })
  showDetailId: number;

  @Column({ type: 'varchar', default: '없음', nullable: false })
  subtitle: string;

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'varchar', nullable: false })
  seat: number;

  @Column({ name: 'start_date', type: 'varchar', nullable: false })
  startDate: string;

  @Column({ name: 'end_date', type: 'varchar', nullable: false })
  endDate: string;

  @Column({ name: 'show_id', type: 'bigint' })
  showId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @OneToOne(() => Show, (show) => show.show_detail, { cascade: true })
  @JoinColumn({ name: 'show_id' })
  show: Show;
}
