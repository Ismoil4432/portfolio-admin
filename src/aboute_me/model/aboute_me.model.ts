import { BelongsTo, Column, DataType, Model, Table, ForeignKey, HasMany } from "sequelize-typescript";

interface AbouteMeCreationAttrs{
    social_network: string;
    image_link: string;
};

@Table({tableName: 'aboute_me', createdAt: false, updatedAt: false})
export class AbouteMe extends Model<AbouteMe, AbouteMeCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    social_network: string;
    
    @Column({
        type: DataType.STRING,
    })
    image_link: string;
}
