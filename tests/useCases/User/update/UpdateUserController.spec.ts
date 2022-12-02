import { UserController } from "@/useCases/User/UserController"
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'
import { MissingBodyError } from '@/useCases/utils/errors/missing-body-error'

describe('Update users', () => {
    test('should return 400 if no data is provided', () => {
        const sut = new UserController()
        const httpRequest = {}
        
        const httpResponse =  sut.update(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingBodyError())
    })

    test('should return 400 if no password is provided', () => {
        const sut = new UserController()
        const httpRequest = {
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
})