import bcrypt from 'bcryptjs';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(150), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @Column({ type: DataType.ENUM('user', 'admin'), defaultValue: 'user' })
  declare role: 'user' | 'admin';

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User): Promise<void> {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(12);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toSafeJSON(): Omit<UserAttributes, 'password'> {
    const { password: _password, ...safeUser } = this.toJSON() as UserAttributes;
    return safeUser;
  }
}
