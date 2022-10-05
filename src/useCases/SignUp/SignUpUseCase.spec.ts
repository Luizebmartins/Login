
import { SignUpUseCase } from './SignUpUseCase'


const makeSut = (): SignUpUseCase => {
    return new SignUpUseCase() 
}


describe('Sign Up Use Case', () => {
    test('should return an error if user already exist', () => {
        const sut = makeSut()
        const userData = {
            name: 'anyName',
            confirmPassword: 'any',
            phone: "35997464533"
        }

        //const newUser = sut.execute(userData)
        expect(()=> {sut.execute(userData)}).toThrow(Error)
        expect(()=> {sut.execute(userData)}).toThrow('User already exist')

    })
})