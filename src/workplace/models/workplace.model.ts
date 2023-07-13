import { Column, DataType, Model, Table } from "sequelize-typescript";

interface WorkplaceCreationAttrs{
    company: string;
    position: string;
    start_date: string;
};

@Table({tableName: 'workplace'})
export class Workplace extends Model<Workplace, WorkplaceCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    company: string;

    @Column({
        type: DataType.STRING,
    })
    position: string;

    @Column({
        type: DataType.STRING,
    })
    start_date: string;
}
