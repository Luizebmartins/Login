import { UserController } from "@/useCases/User/UserController"
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'
import { MissingBodyError } from '@/useCases/utils/errors/missing-body-error'
import { MissingTokenError } from '@/useCases/utils/errors/missing-token-error'

const makeUserUseCaseStub = () => {
    class UserUseCase {
        update(data: any) {
            return {
                success: true
            }
        }
    }

    return new UserUseCase()
}

const makeSut = () => {
        const userUseCaseStub =  makeUserUseCaseStub()
        const sut = new UserController(userUseCaseStub)

        return {sut, userUseCaseStub}
}

describe('Update users', () => {
    test('should return 400 if no data is provided', () => {
        const {sut} = makeSut()
        const httpRequest = {
        params: {
            id: 'any'
        },
        authentication: {
            id: 'any'
        }
    }
        
        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingBodyError())
    })

    test('should return 400 if no password is provided', () => {
        const {sut} = makeSut()
        const httpRequest = {
            params: {
                id: 'any'
            },
            authentication: {
                id: 'any'
            },
            body: {
                updateData: {
                    email: 'email@email.com',
                }
            }
        }

        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('should return 401 if authorization token is missing', () => {
        const {sut} = makeSut()

        const httpRequest = {
            body: {
                password: 'any',
                updateData: {
                    email: 'email@email.com',
                }
            }
        }

        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(new MissingTokenError())
    })

    test('should return 403 if user does not have permission', () => {
        const {sut} = makeSut()
        const httpRequest = {
            params: {
                id: 'other'
            },
            authentication: {
                id: 'any'
            },
            body: {
                updateData: {
                    email: 'email@email.com',
                }
            }
        }
        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new Error('Unauthorized'))

    })

    test('should return true and status 200 if user is updated', () => {
        const {sut} = makeSut()
        const httpRequest = {
            params: {
                id: 'any'
            },
            authentication: {
                id: 'any'
            },
            body: {
                password: 'any',
                updateData: {
                    email: 'email@email.com',
                }
            }
        }

        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.success).toBe(true)

    })

    test('should return 500 if UserUseCase generate an error', () => {
        const {sut, userUseCaseStub} = makeSut()
        jest.spyOn(userUseCaseStub, 'update').mockImplementation(() => {
            throw new Error()
        })

        const httpRequest = {
            params: {
                id: 'any'
            },
            authentication: {
                id: 'any'
            },
            body: {
                password: 'any',
                updateData: {
                    email: 'email@email.com',
                }
            }
        }

        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('should return 500 if UserUseCase does not update and does not generate error', () => {
        const {sut, userUseCaseStub} = makeSut()
        jest.spyOn(userUseCaseStub, 'update').mockImplementation(() => {
            return {
                success: false,
                body: {}
            }
        })

        const httpRequest = {
            params: {
                id: 'any'
            },
            authentication: {
                id: 'any'
            },
            body: {
                password: 'any',
                updateData: {
                    email: 'email@email.com',
                }
            }
        }

        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new Error('Error when updating user'))
    })
})