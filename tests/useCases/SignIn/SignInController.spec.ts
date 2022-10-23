import { HttpRequest, HttpResponse } from '@/useCases/utils/protocols/http'
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'
import { badRequest } from '@/useCases/utils/helpers/http-helper'

class SignInController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['email']

        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))            
            }
        }

        return {
            statusCode: 200,
            body: ""
        }
    }
}

describe("SignIn Controller", () => {
    test("should return 400 if no email is provided", () => {
        const sut = new SignInController()

        const httpRequest = {
            body: {
                password: 'any',
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))

    })
})

