import Input from '../Input/Input';
import PasswordInput from '../Input/PasswordInput';
import { errorMessageStyle } from './FormOptions';

interface SignUpData {
  name: string;
  email: string;
  company: string;
  password: string;
  passwordCheck: string;
}

interface FormFieldProps {
  label: string;
  name: keyof SignUpData;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
}

const FormField = ({
  label,
  name,
  placeholder,
  register,
  error,
  type = 'text',
}: FormFieldProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <label className='text-14 font-semibold'>{label}</label>
      {type === 'password' ? (
        <PasswordInput
          placeholder={placeholder}
          className='h-44'
          hasError={!!error}
          {...register(name)}
        />
      ) : (
        <Input
          placeholder={placeholder}
          className='h-44'
          hasError={!!error}
          type={type}
          {...register(name)}
        />
      )}
      {error && <div className={errorMessageStyle}>{error}</div>}
    </div>
  );
};

export default FormField;
