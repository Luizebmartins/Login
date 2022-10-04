import { SignUpController } from './SignUpController'
import { MissingParamError } from '../utils/errors/missing-param-error'
import { InvalidParamError } from '../utils/errors/invalid-param-error'
import { StringValidator } from '../utils/helpers/string-validation-helper'

const emailValidator = new StringValidator

describe('SignUp controller', () => {
    test('should return 400 if no name is provided', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                email: 'email@email.com',
                password: 'any',
                confirmPassword: 'any',
                phone: "35997464533"
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
    
    
    test('should return 400 if no email is provided', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                name: 'anyName',
                password: 'any',
                confirmPassword: 'any',
                phone: "35997464533"
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    }) 


    test('should return 400 if no valid email is provided', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'email@.com',
                password: 'any',
                confirmPassword: 'any',
                phone: "35997464533"
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    }) 

    test('should return 400 if no password is provided', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'email@teste.com',
                confirmPassword: 'any',
                phone: "35997464533"
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    }) 

    test('should return 400 if no confirmPassword is provided', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'email@teste.com',
                password: 'any',
                phone: "35997464533"
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
    }) 

    test('should return 400 if no phone is provided', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'email@teste.com',
                password: 'any',
                confirmPassword: 'any',
            
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('phone'))
    }) 

    test('should return 400 if confirmPassword is different from password', () => {
        const sut = new SignUpController(emailValidator)
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'email@teste.com',
                password: 'any',
                confirmPassword: 'anypassword',
                phone: "35997464533"
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    }) 
})