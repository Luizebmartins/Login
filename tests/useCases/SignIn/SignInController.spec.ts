import { HttpRequest, HttpResponse } from '@/useCases/utils/protocols/http'
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'
import { badRequest } from '@/useCases/utils/helpers/http-helper'
import { SignInController } from '@/useCases/SignIn/SignInController'


class SignInUseCase {
    execute() {
        return true
    }
}


const makeSut = (): any => {

    const signUpUseCaseMock = new SignInUseCase()
    const sut = new SignInController(signUpUseCaseMock)

    return {
        sut,
        signUpUseCaseMock
    }

}


describe("SignIn Controller", () => {
    test("should return 400 if no email is provided", () => {
        const {sut} = makeSut()

        const httpRequest = {
            body: {
                password: 'any',
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))

    })

    test("should return 400 if no password is provided", () => {
        const {sut} = makeSut()

        const httpRequest = {
            body: {
                email: 'test@gmail.com',
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))

    })


    test("should return 500 if SignInUseCase generate an error", () => {
        const {sut, signUpUseCaseMock} = makeSut()
        jest.spyOn(signUpUseCaseMock, 'execute').mockImplementation(() => {
            throw new Error()
        })

        const httpRequest = {
            body: {
                email: 'test@gmail.com',
                password: 'any'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

})

