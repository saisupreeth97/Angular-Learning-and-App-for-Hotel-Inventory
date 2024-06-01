import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.error('An error occurred:', error.message);
    }
}