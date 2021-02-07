import { useForm } from 'react-hook-form';

import './FormInput.css';

const FormInput = ({
  name,
  validationConfig,
  placeholder,
  label,
  getFormValid,
}) => {
  const { register, errors } = useForm({ mode: 'onChange' });
  const validation = register(validationConfig);
  const onchangeValidStatus = () =>
    errors[name] ? getFormValid(true) : getFormValid(false);

  return (
    <label className="form__label">
      {label}
      <input
        type="text"
        className="form__input"
        id={name}
        placeholder={placeholder}
        name={name}
        ref={validation}
        onChange={onchangeValidStatus}
      />
      {errors[name] && (
        <span className="form__input-error">{errors[name].message}</span>
      )}
    </label>
  );
};

export default FormInput;
