import { Formatters, FormData } from '../../../hooks/useForm/types';

export const createFormatters = <T extends FormData>(): Formatters<T> =>
  ({
    changeNumber: (value: string) =>
      Number(value.replace(/[^\d]/g, '')).toLocaleString(),
  } as Formatters<T>);
