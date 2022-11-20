import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize'
import { sequelize } from '../database'
import User from './user'

class Animal extends Model <InferAttributes<Animal>, InferCreationAttributes<Animal>> {
    declare id: CreationOptional<number>
    declare breed: string
    declare color: string
    declare name: string
    declare vaccinated: boolean
    declare castrated: boolean
    declare adopterId: ForeignKey<User['id']>
}

Animal.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        breed: {
          type: DataTypes.TEXT,
        },
        color: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
        },
        vaccinated: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false',
        },
        castrated: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false',
        }
      },
      {
        tableName: 'animals',
        timestamps: false,
        sequelize // passing the `sequelize` instance is required
      }
)

User.hasMany(Animal, {
    sourceKey: 'id',
    foreignKey: 'adopterId',
    as: 'animals' // this determines the name in `associations`!
});

export default Animal