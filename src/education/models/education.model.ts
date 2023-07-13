import { Column, DataType, Model, Table } from "sequelize-typescript";

interface EducationCreationAttrs{
    institution: string;
    degree: string;
    graduation_year: string;
};

@Table({tableName: 'education'})
export class Education extends Model<Education, EducationCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    institution: string;

    @Column({
        type: DataType.STRING,
    })
    degree: string;

    @Column({
        type: DataType.STRING,
    })
    graduation_year: string;

}
