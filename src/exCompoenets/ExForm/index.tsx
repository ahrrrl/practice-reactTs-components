import { useRef } from 'react';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import { FormRefs } from '../../hooks/useForm/types';
import { createValidators } from './utils/validators';
import { createFormatters } from './utils/formatters';

const ExForm = () => {
  const initialValue = {
    vanilla: '',
    changeNumber: '',
  };
  const validators = createValidators<typeof initialValue>();
  const formatters = createFormatters<typeof initialValue>();
  const { formData, handleInputChange, handleSubmit, errors } = useForm(
    initialValue,
    validators,
    formatters
  );

  const refs: FormRefs<typeof initialValue> = {
    vanilla: useRef<HTMLInputElement>(null),
    changeNumber: useRef<HTMLInputElement>(null),
  };

  const onSuccess = () => {
    alert(
      `기본: ${formData.vanilla} 변화: ${formData.changeNumber.replace(
        /,/g,
        ''
      )}`
    );
  };

  const onError = () => {};
  return (
    <form onSubmit={(event) => handleSubmit(event, refs, onSuccess, onError)}>
      <label htmlFor='vanilla'>그냥 인풋</label>
      <Input
        id='vanilla'
        name='vanilla'
        value={formData.vanilla}
        onChange={handleInputChange}
        ref={refs.vanilla}
        error={errors.vanilla}
      ></Input>
      <label htmlFor='changeNumber'>숫자만 가능 인풋</label>
      <Input
        id='changeNumber'
        name='changeNumber'
        value={formData.changeNumber}
        onChange={handleInputChange}
        ref={refs.changeNumber}
        error={errors.changeNumber}
      ></Input>
      <button>입력</button>
    </form>
  );
};

export default ExForm;
