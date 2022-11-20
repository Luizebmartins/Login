import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize'
import { sequelize } from '../database'
import Animal from './animals'

class User extends Model <InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare name: string
    declare password: string
    declare email: string
    declare score: number | null
    declare phone: string
    declare street: string
    declare homeNumber: string
    declare t_admin: boolean
    declare t_volunt: boolean
    declare t_adop: boolean


    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    declare getAnimals: HasManyGetAssociationsMixin<Animal>; // Note the null assertions!
    declare addAnimal: HasManyAddAssociationMixin<Animal, number>;
    declare addAnimals: HasManyAddAssociationsMixin<Animal, number>;
    declare setAnimals: HasManySetAssociationsMixin<Animal, number>;
    declare removeAnimal: HasManyRemoveAssociationMixin<Animal, number>;
    declare removeAnimals: HasManyRemoveAssociationsMixin<Animal, number>;
    declare hasAnimal: HasManyHasAssociationMixin<Animal, number>;
    declare hasAnimals: HasManyHasAssociationsMixin<Animal, number>;
    declare countAnimals: HasManyCountAssociationsMixin;
    declare createAnimal: HasManyCreateAssociationMixin<Animal, 'adopterId'>;
}


User.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        email: {
          type: DataTypes.CHAR(100),
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        score: {
          type: DataTypes.INTEGER,
        },
        phone: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        street: {
            type: DataTypes.TEXT,
        },
        homeNumber: {
            type: DataTypes.TEXT,
        },
        t_admin: {
            type:  DataTypes.BOOLEAN,
            defaultValue: 'false',
        },
        t_volunt: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false',
        },
        t_adop: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false',
        },
      },
      {
        tableName: 'users',
        timestamps: false,
        sequelize // passing the `sequelize` instance is required
      }
)

export default User