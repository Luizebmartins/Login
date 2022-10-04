export class notMatchParamError extends Error {
    constructor (paramName: string, matchParamName: string) {
        super(`Do no match Params: ${paramName} and ${matchParamName}`)
        this.name = 'notMatchParamError'
    }
}