
import { SignUpUseCase } from '@/useCases/SignUp/SignUpUseCase'
import { IUsersRepository } from '@/repositories/IUsersRepository'
import { User } from '@/entities/User'

interface SutTypes {
    sut: SignUpUseCase,
    userRepositoryStub: IUsersRepository
}

const makeUserRepositoryStub = () => {
    class UserRepositoryStub implements IUsersRepository {
        get(user: any) {
            return false
        }

        save(user: User) {
            return true
        }
        delete(email: string) {
            return true
        }
    }
    return new UserRepositoryStub
}

const makeSut = (): SutTypes => {
    const userRepositoryStub = makeUserRepositoryStub()
    const sut = new SignUpUseCase(userRepositoryStub) 

    return {
        sut,
        userRepositoryStub,
    }
}



describe('Sign Up Use Case', () => {
    test('should return an error if user already exist', async () => {
        const {sut, userRepositoryStub} = makeSut()
        jest.spyOn(userRepositoryStub, "get").mockImplementation(() => {
            return true
        })
        const userData = {
            name: 'anyName',
            email: 'any@gmail',
            password: "any",
            phone: '999999'
        }

        try {
            await sut.execute(userData)
        } catch (error: any) {
            expect(error.message).toBe("User already exist")

        }
    })

    test('should return a success message if the user is created', async () => {
        const {sut, userRepositoryStub} = makeSut()
        jest.spyOn(userRepositoryStub, "save").mockImplementation(()=> {
            return true
        })
        const userData = {
            name: 'anyName',
            email: 'any@gmail',
            password: "any",
            phone: '999999'

        }

        const response = await sut.execute(userData)
        expect(response.message).toBe("User created successfully!")
    })

})