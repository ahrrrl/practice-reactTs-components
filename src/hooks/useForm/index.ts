import { useState } from 'react';
import { Formatters, FormData, InputChangeHandler } from './types';

const useForm = <T extends FormData>(
  initialData: T,
  formatters?: Formatters<T>
) => {
  const [formData, setFormData] = useState<T>(initialData);

  const handleInputChange: InputChangeHandler = (event) => {
    const { name, value, files } = event.target;
    const key = name as keyof T;

    let formattedValue: T[keyof T] = value as T[keyof T];

    if (files && files.length > 0) {
      formattedValue = files[0] as T[keyof T];
    }

    if (formatters && formatters[key]) {
      formattedValue = formatters[key](formattedValue);
    }

    setFormData((prevData) => ({ ...prevData, [key]: formattedValue }));
  };

  return { formData, handleInputChange };
};

export default useForm;
