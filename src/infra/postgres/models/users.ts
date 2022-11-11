import { Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript'

@Table
class User extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id: number

    @Column
    name: string

    @Column
    email: string

    @Column
    phone: string

    @Column
    street: string

    @Column
    number: number

    @Column
    site: string
}

module.exports = {
    User
}