import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className='input-container'>
        <input ref={ref} {...props} />
        {error && <span className='error-message'>{error}</span>}
      </div>
    );
  }
);

export default Input;
