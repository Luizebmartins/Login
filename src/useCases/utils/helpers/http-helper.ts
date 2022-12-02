import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}

export const unauthorized = (error: Error): HttpResponse => {
    return {
        statusCode: 401,
        body: error
    }
}

export const InternalServerError =  (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        body: error
    }
}

export const Created = (object: any): HttpResponse => {
    return {
        statusCode: 201,
        body: object
    }
}

export const login = (token: string): HttpResponse => {
    return {
        statusCode: 200,
        body: {
            token: token
        } 
    }
}