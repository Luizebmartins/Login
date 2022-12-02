import { HttpRequest, HttpResponse} from '../utils/protocols/http'
import { badRequest } from '../utils/helpers/http-helper'
import { MissingBodyError } from '../utils/errors/missing-body-error'

export class UserController {
    handle(request: HttpRequest): HttpResponse {
        if(!request.body) {
            return badRequest(new MissingBodyError())
        }

        return {
            statusCode: 200,
            body: {}
        }
    }
}