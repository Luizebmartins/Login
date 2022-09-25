import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { StringValidator } from '../helpers/string-validation-helper'

const stringValidator = new StringValidator()
export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email']

        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        if(!stringValidator.validateEmail(httpRequest.body.email)) {
            return {
                statusCode: 400,
                body: new Error('invalid param: email')
            }
        }

        return {
            statusCode: 200,
            body: {}
        }
    }
}