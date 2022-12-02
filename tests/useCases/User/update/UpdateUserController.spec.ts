import { UserController } from "@/useCases/User/UserController"
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'


describe('Update users', () => {
    test('should return 400 if no data is provided', () => {
        const sut = new UserController()
        const httpRequest = {}
        
        const httpResponse =  sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
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

        const httpResponse =  sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
})