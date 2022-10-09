import { HttpRequest, HttpResponse } from '../utils/protocols/http'
import { MissingParamError } from '../utils/errors/missing-param-error'
import { badRequest } from '../utils/helpers/http-helper'
import { InternalServerError } from '../utils/helpers/http-helper'
import { Created } from '../utils/helpers/http-helper'
import { StringValidator } from '../utils/helpers/string-validation-helper'
import { InvalidParamError } from '../utils/errors/invalid-param-error'
import { notMatchParamError } from '../utils/errors/not-match-param-error'
import { SignUpUseCase } from './SignUpUseCase'

export class SignUpController {
    
    constructor(
        private stringValidator: StringValidator,
        private signUpUseCase: SignUpUseCase
    ) {}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['name', 'email', 'password', 'confirmPassword']

        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        if(!this.stringValidator.validateEmail(httpRequest.body.email)) {
            return  badRequest(new InvalidParamError('email'))
        }


        if(httpRequest.body.password !== httpRequest.body.confirmPassword) {
            return badRequest(new notMatchParamError('password', 'confirmPassword'))
        }
        try {
            const reponse = await this.signUpUseCase.execute(httpRequest.body)

            return Created(reponse)
        } catch (error: any) {
            return InternalServerError(new Error(error.message))
        }
    
    }
}