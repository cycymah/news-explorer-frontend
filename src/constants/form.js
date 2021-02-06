const emailValidationConfig = {
  required: {
    value: true,
    message: 'Поле обязательно для заполнения',
  },
  minLength: {
    value: 5,
    message: 'Минимальный текст 3 симовлова.',
  },
  pattern: {
    value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    message: 'Введите почту',
  },
};

const passwordValidationConfig = {
  required: {
    value: true,
    message: 'Поле обязательно для заполнения',
  },
  minLength: {
    value: 8,
    message: 'Минимальный текст 8 симовлова.',
  },
};

const nameValidationConfig = {
  required: {
    value: true,
    message: 'Поле обязательно для заполнения',
  },
  minLength: {
    value: 2,
    message: 'Минимальный текст 2 симовлова.',
  },
};

export {
  emailValidationConfig,
  nameValidationConfig,
  passwordValidationConfig,
};
