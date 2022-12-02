import { HttpRequest, HttpResponse} from '../utils/protocols/http'
import { MissingParamError } from '../utils/errors/missing-param-error'
import { badRequest } from '../utils/helpers/http-helper'
import { login } from '../utils/helpers/http-helper'
import { InternalServerError } from '../utils/helpers/http-helper'
import { SignInUseCase } from './SignInUseCase'

export class SignInController {
    constructor(
        private signInUseCase: SignInUseCase
    ) {}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['email', 'password']

        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))            
            }
        }

        try {
            const token = await this.signInUseCase.execute(httpRequest.body)
            return login(token)
        } catch (error) {
            return InternalServerError(new Error(error.message))
        }

    }
}