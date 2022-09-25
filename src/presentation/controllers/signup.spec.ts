import {SignUpController} from './signup'


describe('SignUp controller', () => {
    test('should return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'email@email.com',
                password: 'any',
                confirmPassword: 'any'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)

    })
})