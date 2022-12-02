export class UserController {
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