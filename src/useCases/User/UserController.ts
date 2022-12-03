import { HttpRequest, HttpResponse} from '../utils/protocols/http'
import { badRequest, unauthorized, forbidden, updated, internalServerError } from '../utils/helpers/http-helper'
import { MissingBodyError } from '../utils/errors/missing-body-error'
import { MissingParamError } from '../utils/errors/missing-param-error'
import { MissingTokenError } from '../utils/errors/missing-token-error'
import { UnauthorizedError } from '../utils/errors/unauthorized-error'

export class UserController {
    constructor(
        private userUseCase: any,
    ) {}

    update(request: HttpRequest): HttpResponse {
        try {
            if(!request.authentication) {
                return unauthorized(new MissingTokenError())
            }
            if(request.authentication.id !== request.params.id) {
                return forbidden(new UnauthorizedError())
            }
            if(!request.body) {
                return badRequest(new MissingBodyError())
            }

            if(!request.body.password) {
                return badRequest(new MissingParamError('password'))
            }

            const update = this.userUseCase.update(request.body)
            if(update.success) {
                return updated()
            } else {
                throw new Error('Error when updating user')
            }

        } catch (error) {
            return internalServerError(error)
        }

    }
}