import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '@entities/profile/profile.entity';
import { BaseEntity } from '@entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', width: 10, select: false, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.id, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;
}
