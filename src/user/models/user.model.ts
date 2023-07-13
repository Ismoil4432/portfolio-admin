import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";


interface UserCreationAttrs{
    full_name: string;
    username: string;
    email: string;
    hashed_password: string;
};

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;
}
