import { FormData, Validators } from '../../../hooks/useForm/types';

const sanitizeInput = (input: string): string => {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
};

export const createValidators = <T extends FormData>(): Validators<T> =>
  ({
    vanilla: (value: string) => {
      const sanitized = sanitizeInput(value);
      if (sanitized.trim().length === 0) return '내용을 입력해 주세요.';
      if (sanitized.length > 80)
        return `내용은 최대 80자까지 입력할 수 있습니다. 현재: ${sanitized.length}자`;
      if (sanitized !== value)
        return '내용에 허용되지 않는 문자가 포함되어 있습니다.';
      return undefined;
    },
    changeNumber: (value: string) => {
      const sanitized = sanitizeInput(value);
      if (sanitized.trim().length === 0) return '가격을 입력해 주세요.';
      if (sanitized.length > 16)
        return `가격은 최대 16자까지 입력할 수 있습니다. 현재: ${sanitized.length}자`;
      if (sanitized !== value)
        return '가격에 허용되지 않는 문자가 포함되어 있습니다.';
      return undefined;
    },
  } as Validators<T>);
