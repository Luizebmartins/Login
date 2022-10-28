import { HttpRequest, HttpResponse } from '@/useCases/utils/protocols/http'
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'
import { badRequest } from '@/useCases/utils/helpers/http-helper'
import { SignInController } from '@/useCases/SignIn/SignInController'


const makeSut = (): any => {

    const sut = new SignInController

    return {
        sut,
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

})

