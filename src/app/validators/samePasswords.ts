import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const samePasswords = (control: any) => {
  let password = control.get("password");
  let confirmPassword = control.get("confirmPassword");

  return password.value === confirmPassword.value
    ? null
    : { noSamePasswords: true }
}
