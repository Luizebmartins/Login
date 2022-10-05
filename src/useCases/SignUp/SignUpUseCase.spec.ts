
import { SignUpUseCase } from './SignUpUseCase'


describe('Sign Up Use Case', () => {
    test('should return an error if user already exist', () => {
        const sut = new SignUpUseCase()
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