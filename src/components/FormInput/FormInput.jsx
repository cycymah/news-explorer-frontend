import { useForm } from 'react-hook-form';

import './FormInput.css';

const FormInput = ({
  name,
  validationConfig,
  placeholder,
  label,
  getFormValid,
  getValue,
  type,
}) => {
  const { register, errors } = useForm({ mode: 'onChange' });
  const validation = register(validationConfig);
  const onchangeValidStatus = evt => {
    getValue(evt.target.value);
    errors[name] ? getFormValid(true) : getFormValid(false);
  };

  return (
    <label className="form__label">
      {label}
      <input
        type={type}
        className="form__input"
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
