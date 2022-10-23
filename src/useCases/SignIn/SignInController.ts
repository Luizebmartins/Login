import { HttpRequest, HttpResponse} from '../utils/protocols/http'
import { MissingParamError } from '../utils/errors/missing-param-error'
import { badRequest } from '../utils/helpers/http-helper'

export class SignInController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['email', 'password']

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