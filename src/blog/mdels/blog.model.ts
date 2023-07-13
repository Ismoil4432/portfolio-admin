import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "../../user/models/user.model";

interface BlogCreationAttrs{
    title: string;
    content: string;
    img_link: string;
};

@Table({tableName: 'blog'})
export class Blog extends Model<Blog, BlogCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.STRING,
    })
    content: string;
    
    @Column({
        type: DataType.STRING,
    })
    img_link: string;
}
