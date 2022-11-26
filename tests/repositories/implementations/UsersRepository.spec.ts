import { IUsersRepository } from '@/repositories/IUsersRepository'
import { UsersRepository } from '@/repositories/Implementations/UsersRepository'
import { UserPostgres } from '@/data/user/userData'
import User from '@/infra/models/user'



const makeSut = (): IUsersRepository => {
    const userPostgres = new UserPostgres()
    return new UsersRepository(userPostgres)
}

describe("Users Repository", () => {
    test("ensure return user if exist", async () => {
        const sut = makeSut()
        const userData = {
            name: 'luiz',
            email: 'luiz@email.com                                                                                      ',
            password: 'any',
            phone: "35997464533"
        }
        const user = new User(userData)
        
        const userGet = await sut.get(user.email)
        expect(userGet).toBeInstanceOf(User)
    })

    test("ensure successful user creation", async () => {
        const sut = makeSut()
        const userData = {
            name: 'anyName',
            email: 'email2@teste.com',
            password: 'any',
            phone: "35997464533"
        }
        const userCreated = await sut.save(userData)
        expect(userCreated).toBeInstanceOf(User)
    })
    
    test.only('ensure delete user if exist', async () => {
        const sut = makeSut()
        const userData = {
            name: 'deleteUser',
            email: 'deleteuser@teste.com',
            password: 'any',
            phone: "35997464533"
        }
        const userCreated = await sut.save(userData)
        expect(userCreated).toBeInstanceOf(User)

        const removedUser = await sut.delete(userData.email)
        console.log(removedUser)
        expect(removedUser).toBe(1)
    })
})