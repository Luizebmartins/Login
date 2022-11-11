import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, AllowNull, Unique} from 'sequelize-typescript'

@Table
class Animal extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id: number

    @Column
    breed: string

    @Column
    @AllowNull(false)
    color: string

    @Column
    name: string

    @Column
    @AllowNull(false)
    vaccinated: boolean


    @Column
    @AllowNull(false)
    castrated: string
}

module.exports = {
    Animal
}