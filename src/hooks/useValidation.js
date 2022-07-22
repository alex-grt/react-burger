import { useCallback, useMemo, useState } from 'react';
const validator = require('validator');

export function useFormWithValidation(defaultValues, defaultFields = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [fieldsValid, setFieldsValid] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [fieldsPartialSend, setFieldsPartialSend] = useState(defaultFields);
  const [partialSend, setPartialSend] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setValues({...values, [name]: value});

    if (name === 'email') {
      !validator.isEmail(value)
        ? setErrors({...errors, [name]: 'Некорректные данные в поле E-mail' })
        : setErrors({...errors, [name]: '' });
    } else if (name === 'password') {
      !(value.length >= 6 && value.length <= 20)
      ? setErrors({...errors, [name]: 'Введите пароль длиной от 6 до 20 символов' })
      : setErrors({...errors, [name]: '' });
    } else {
      value.length === 0
      ? setErrors({...errors, [name]: 'Заполните данное поле' })
      : setErrors({...errors, [name]: '' });
    }

    if (name === 'email') {
      setFieldsValid({...fieldsValid, [name]: validator.isEmail(value)});
      setFieldsPartialSend({...fieldsPartialSend, [name]: validator.isEmail(value)});
    } else if (name === 'password') {
      setFieldsValid({
        ...fieldsValid, [name]: value.length >= 6 && value.length <= 20
      });
      setFieldsPartialSend({
        ...fieldsPartialSend, [name]: value.length >= 6 && value.length <= 20
      });
    } else {
      setFieldsValid({...fieldsValid, [name]: value.length !== 0});
      setFieldsPartialSend({
        ...fieldsPartialSend, [name]: value.length !== 0
      });
    }
  };

  useMemo(() => {
    setIsValid(
      Object.keys(defaultValues).length === Object.keys(fieldsValid).length &&
        !Object.values(fieldsValid).some(item => item === false)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldsValid]);

  useMemo(() => {
    setPartialSend(!Object.values(fieldsPartialSend).some(item => item === false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldsPartialSend]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newPartialSend = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setPartialSend(newPartialSend);
    },
    [setValues, setErrors, setIsValid, setPartialSend]
  );

  return { values, handleChange, errors, isValid, partialSend, resetForm };
}
