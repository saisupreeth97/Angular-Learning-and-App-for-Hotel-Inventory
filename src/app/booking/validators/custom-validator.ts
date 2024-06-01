import { AbstractControl, Form, FormGroup } from "@angular/forms";

export class CustomValidator {
    static validateName(control: AbstractControl) {
        const name = control.value as string;
        if (name.includes('test')) {
            return { inValidName: true };
        }
        return null;
    }

    static validateSpecialChar(char: string) {
        return (control: AbstractControl) => {
            const name = control.value as string;
            if (name.includes(char)) {
                return { inValidSpecialChar: true };
            }
            return null;
        }
    }

    // static validateDate(control: FormGroup) {
    //     const checkinDate = control.get('checkinDate')?.value;
    //     const checkoutDate = control.get('checkoutDate')?.value;
    //     if (checkinDate && checkoutDate && checkinDate > checkoutDate) {
    //         return { inValidDate: true };
    //     }
    //     return null;
    // }

    static validateDate(control: FormGroup) {
        const checkinDate: any = new Date(control.get('checkinDate')?.value);
        const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
        const diffTime = checkoutDate - checkinDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <=0) {
            control.get('checkOutDate')?.setErrors({ inValidDate: true });
            return { inValidDate: true };
        }
        return null;
    }
}