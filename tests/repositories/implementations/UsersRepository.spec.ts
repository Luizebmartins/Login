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
            name: 'anyName',
            email: 'email@teste.com',
            password: 'any',
            phone: "35997464533"
        }
        const user = new User(userData)
        const userCreated = await sut.save(user)
        
        const userGet = await sut.get(user.email)
        expect(userGet).toBeInstanceOf(User)
    })

    test.only("ensure successful user creation", async () => {
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
    
    test('ensure delete user if exist', async () => {
        const sut = makeSut()
        const userData = {
            name: 'anyName',
            email: 'email@teste.com',
            password: 'any',
            phone: "35997464533"
        }
        const user = new User(userData)
        const userCreated = await sut.save(user)
        expect(userCreated).toBe(true)

        const removedUser = await sut.delete(user.email)
        expect(removedUser).toBe(true)
    })
})