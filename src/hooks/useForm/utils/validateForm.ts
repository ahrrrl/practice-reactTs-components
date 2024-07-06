import { FormData, FormErrors, Validators } from '../types';

export const validateForm = <T extends FormData>(
  data: T,
  validators: Validators<T>
): FormErrors<T> => {
  const errors: FormErrors<T> = {};
  if (validators)
    (Object.keys(data) as Array<keyof T>).forEach((key) => {
      if (validators[key]) {
        const error = validators[key](data[key]);
        if (error) {
          errors[key] = error;
        }
      }
    });

  return errors;
};
