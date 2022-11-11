import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, AllowNull, Unique} from 'sequelize-typescript'

@Table
class User extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id: number

    @Column
    @AllowNull(false)
    name: string

    @Column
    @AllowNull(false)
    @Unique
    email: string

    @Column
    @AllowNull(false)
    password: string


    @Column
    @AllowNull(false)
    phone: string

    @Column
    street: string

    @Column
    number: number

    @Column
    site: string

    @Column
    @Default(0)
    score: number

    @Column
    @Default(false)
    t_admin: string

    @Column
    @Default(false)
    t_volunt: string

    @Column
    @Default(false)
    t_adop: string
}

module.exports = {
    User
}