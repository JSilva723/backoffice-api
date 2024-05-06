export abstract class HttpError extends Error {
    abstract statusCode: number

    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class NotFoundError extends HttpError {
    statusCode = 404
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }

    public static drop(message: string) {
        return new NotFoundError(message)
    }
}

export class BadRequestError extends HttpError {
    statusCode = 400
    constructor(message: string) {
        super(message)
        this.name = 'BadRequestError'
    }

    public static drop(message: string) {
        return new BadRequestError(message)
    }
}