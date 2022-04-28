export enum CustomErrors {
    NOT_FOUND,
    SERVER_ERROR,
    UNAUTHORIZED
}

export class GroceryAppError extends Error {
    errorType: CustomErrors;
    constructor(message: string, errorType: CustomErrors) {
        super(message);
        this.errorType = errorType;
    }
}

// throw new Error('something went wrong');
// throw new GroceryAppError('something went wrong', CustomErrors.NOT_FOUND);