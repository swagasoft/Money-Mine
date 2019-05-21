import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { ValidationErrors, AbstractControl } from '@angular/forms';

export class UserValidator {
 static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true};
    }

    return null;
  }
}
