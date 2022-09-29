import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { StringValidator } from '../helpers/string-validation-helper'
import { InvalidParamError } from '../errors/invalid-param-error'

const stringValidator = new StringValidator()
export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password']

        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        if(!stringValidator.validateEmail(httpRequest.body.email)) {
            return  badRequest(new InvalidParamError('email'))
        }

        return {
            statusCode: 200,
            body: {}
        }
    }
}