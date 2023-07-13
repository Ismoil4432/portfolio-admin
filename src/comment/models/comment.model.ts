import { BelongsTo, Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Blog } from "../../blog/mdels/blog.model";

interface CommentCreationAttrs{
    user_id: number;
    blog_id: number;
    content: string;
};

@Table({tableName: 'comment'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;

    @ForeignKey(() => Blog)
    @Column({
        type: DataType.INTEGER,
    })
    blog_id: number;

    @Column({
        type: DataType.STRING,
    })
    content: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Blog)
    blog: Blog;

}
