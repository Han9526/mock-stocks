import { ShowDetail } from 'src/showdetail/entities/showdetail.entity';
import { Ticketing } from 'src/ticketing/entities/ticketing.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'show',
})
export class Show {
  @PrimaryGeneratedColumn({ name: 'show_id' })
  showId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'bigint', name: 'user_id' })
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

  @ManyToOne(() => User, (user) => user.show, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' }) // 외래 키 정의
  user: User;

  @OneToOne(() => ShowDetail, (showDetail) => showDetail.show)
  show_detail: ShowDetail;

  @OneToMany(() => Ticketing, (ticketing) => ticketing.show)
  ticketing: Ticketing[];
}
