import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'
import { StringValidator } from '../helpers/string-validation-helper'



describe('SignUp controller', () => {
    test('should return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: 'email@email.com',
                password: 'any',
                confirmPassword: 'any'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
    
    
    test('should return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'anyName',
                password: 'any',
                confirmPassword: 'any'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    }) 
    
    test('should return false if no valid email is provided', () => {
        const sut = new StringValidator()
        const email = "email"

        const validation = sut.validateEmail(email)
        expect(validation).toBe(false)
    })
})