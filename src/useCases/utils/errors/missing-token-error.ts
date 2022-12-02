export class MissingTokenError extends Error {
    constructor () {
        super(`Missing token`)
        this.name = 'MissingTokenError'
    }
}