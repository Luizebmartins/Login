import { UserController } from "@/useCases/User/UserController"



describe('Update users', () => {
    test('should return 400 if no data is provided', () => {
        const sut = new UserController()
        const httpRequest = {}
        
        const response =  sut.handle(httpRequest)
        expect(response.statusCode).toBe(400)
    })
})