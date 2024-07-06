import { useState, FormEvent } from 'react';
import {
  FormData,
  FormErrors,
  FormRefs,
  Formatters,
  InputChangeHandler,
  ValidatorFn,
} from './types';
import { validateForm } from './utils/validateForm';

const useForm = <T extends FormData>(
  initialData: T,
  validators?: { [K in keyof T]: ValidatorFn<T[K]> },
  formatters?: Formatters<T>
) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleInputChange: InputChangeHandler = (event) => {
    const { name, value, files } = event.target;
    const key = name as keyof T;
    let formattedValue: T[keyof T];

    if (files && files.length > 0) {
      formattedValue =
        formatters && formatters[key]
          ? formatters[key]!(files[0] as T[keyof T])
          : (files[0] as T[keyof T]);
    } else {
      formattedValue =
        formatters && formatters[key]
          ? formatters[key]!(value as T[keyof T])
          : (value as T[keyof T]);
    }

    setFormData((prevData) => ({ ...prevData, [key]: formattedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: undefined }));
  };

  const validateFormData = (): boolean => {
    if (!validators) return true;
    const newErrors = validateForm(formData, validators);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    refs: FormRefs<T>,
    onSubmit: (formData: T, refs: FormRefs<T>) => void,
    onError: (errors: FormErrors<T>, refs: FormRefs<T>) => void
  ) => {
    event.preventDefault();

    if (validateFormData()) {
      onSubmit(formData, refs);
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        onError(newErrors, refs);
        const errorKey = Object.keys(newErrors)[0] as keyof FormRefs<T>;
        refs[errorKey].current?.focus();
        return newErrors;
      });
    }
  };

  return { formData, setFormData, errors, handleInputChange, handleSubmit };
};

export default useForm;
