import { HttpRequest, HttpResponse } from '../utils/protocols/http'
import { MissingParamError } from '../utils/errors/missing-param-error'
import { badRequest } from '../utils/helpers/http-helper'
import { StringValidator } from '../utils/helpers/string-validation-helper'
import { InvalidParamError } from '../utils/errors/invalid-param-error'

const stringValidator = new StringValidator()
export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'confirmPassword']

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