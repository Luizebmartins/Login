export class SignUpUseCase {
    execute(data: any): any {
        throw new Error('User already exist')
    }
}