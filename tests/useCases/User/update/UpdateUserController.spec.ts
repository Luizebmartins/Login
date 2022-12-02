
class UserController {
    handle(request: any): any {
        if(!request.body) {
            return {
                statusCode: 400
            }
        }

        return {
            statusCode: 200
        }
    }
}

describe('Update users', () => {
    test('should return 400 if no data is provided', () => {
        const sut = new UserController()
        const httpRequest = {}
        
        const response =  sut.handle(httpRequest)
        expect(response.statusCode).toBe(400)
    })
})