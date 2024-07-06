import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import { customFormatters } from './utils/formatters';

const ExForm = () => {
  const initialValue = {
    vanilla: '',
    changeNumber: '',
  };
  const { formData, handleInputChange } = useForm(
    initialValue,
    customFormatters
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(
      `기본: ${formData.vanilla} 변화: ${formData.changeNumber.replace(
        /,/g,
        ''
      )}`
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='vanilla'>그냥 인풋</label>
      <Input
        id='vanilla'
        name='vanilla'
        value={formData.vanilla}
        onChange={handleInputChange}
      ></Input>
      <label htmlFor='changeNumber'>숫자만 가능 인풋</label>
      <Input
        id='changeNumber'
        name='changeNumber'
        value={formData.changeNumber}
        onChange={handleInputChange}
      ></Input>
      <button>입력</button>
    </form>
  );
};

export default ExForm;
