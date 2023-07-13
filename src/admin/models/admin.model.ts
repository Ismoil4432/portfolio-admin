import { Column, DataType, Table, Model } from "sequelize-typescript";

interface AdminAttr {
    full_name: string;
    username: string;
    phone_number: string;
    email: string;
    hashed_password: string;
    role: string;
}

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, AdminAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    full_name: string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
    })
    username: string;

    @Column({
        type:DataType.STRING,
    })
    phone_number: string;

    @Column({
        type:DataType.STRING,
    })
    email: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type:DataType.STRING,
    })
    role: string;
}
