
import { SignUpUseCase } from './SignUpUseCase'
import { IUsersRepository } from '../../repositories/IUsersRepository'


interface SutTypes {
    sut: SignUpUseCase,
    userRepositoryStub: IUsersRepository
}

const makeUserRepositoryStub = () => {
    class UserRepositoryStub implements IUsersRepository {
        get(user: any) {
            return false
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
    test('should return an error if user already exist', () => {
        const {sut, userRepositoryStub} = makeSut()
        jest.spyOn(userRepositoryStub, "get").mockImplementation(() => {
            return true
        })
        const userData = {
            name: 'anyName',
            confirmPassword: 'any',
            phone: "35997464533"
        }

        expect(()=> {sut.execute(userData)}).toThrow(Error)
        expect(()=> {sut.execute(userData)}).toThrow('User already exist')

    })

})