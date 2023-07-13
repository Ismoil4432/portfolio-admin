import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ProjectCreationAttrs{
    project_name: string;
    description: string;
    project_link: string;
    link_github_project: string;
    project_img: string;
};

@Table({tableName: 'project'})
export class Project extends Model<Project, ProjectCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    project_name: string;

    @Column({
        type: DataType.STRING,
    })
    description: string;

    @Column({
        type: DataType.STRING,
    })
    project_link: string;

    @Column({
        type: DataType.STRING,
    })
    link_github_project: string;

    @Column({
        type: DataType.STRING,
    })
    project_img: string;
}
