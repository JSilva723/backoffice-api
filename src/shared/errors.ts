export abstract class HttpError extends Error {
    abstract statusCode: number

    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
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

export class UnauthorizedError extends HttpError {
    statusCode = 401
    constructor(message: string) {
        super(message)
        this.name = 'UnauthorizedError'
    }

    public static drop(message: string) {
        return new BadRequestError(message)
    }
}

export class ForbiddenError extends HttpError {
    statusCode = 403
    constructor(message: string) {
        super(message)
        this.name = 'ForbiddenError'
    }

    public static drop(message: string) {
        return new BadRequestError(message)
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

