import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SkillCreationAttrs{
    name: string;
    skill_icon: string;
};

@Table({tableName: 'skills'})
export class Skill extends Model<Skill, SkillCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    skill_icon: string;
}
