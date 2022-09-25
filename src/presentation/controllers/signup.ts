export class SignUpController {
    handle(httpRequest: any): any {
        if(!httpRequest.body.nane) {
            return {
                statusCode: 400,
                body: new Error('Missing param: name')
            }    
        }
    }
}