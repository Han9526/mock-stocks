import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('phone', ['phone'], { unique: true })
@Entity({
  name: 'profile',
})
export class Profile {
  @PrimaryGeneratedColumn({ name: 'profile_id' })
  profileId: number;

  @Column({
    name: 'img_url',
    type: 'varchar',
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    nullable: false,
  })
  imgUrl: string;

  @Column({ type: 'varchar', default: '안녕하세요', nullable: false })
  description: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

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

  @Column({ name: 'user_id', type: 'int', unique: true, nullable: false })
  userId: number;

  @OneToOne(() => User, (user) => user.profile, { cascade: true }) // User 엔터티와의 관계 설정
  @JoinColumn({ name: 'user_id' }) // 외래 키 정의
  user: User; // User 엔터티와의 관계를 표시하는 필드
}
