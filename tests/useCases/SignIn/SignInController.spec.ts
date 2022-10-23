import {HttpRequest, HttpResponse } from '@/useCases/utils/protocols/http'


class SignInController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['email']

        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return {
                    statusCode: 400,
                    body: "error"
                }            
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
    })
})

