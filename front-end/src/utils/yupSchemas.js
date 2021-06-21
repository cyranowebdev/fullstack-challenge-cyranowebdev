import * as yup from 'yup';

const required = 'Campo obrigatório.';
const invalid = 'Campo incorreto.';
const invalidEmail = 'Formato de email incorreto.';
const invalidPass = 'Campo de senha incorreto.';
const shortString = 'Texto muito curto.';

const passwordLength = 6;
const stringLength = 6;
const typeLength = 1;

const login = yup.object().shape({
  email: yup.string().email(invalidEmail).required(required),
  password: yup.string().min(passwordLength, invalidPass).required(required),
});

const register = yup.object().shape({
  name: yup.string().matches(/^[a-z ,.'-]{12,}$/i, invalid).required(required),
  email: yup.string().email(invalidEmail).required(required),
  password: yup.string().min(passwordLength, invalid).required(required),
});

const newSchool = yup.object().shape({
  name: yup.string().required(required),
  address: yup.string().min(stringLength, shortString).required(required),
  type: yup.string().min(typeLength, invalid).required(required),
});

const update = yup.object().shape({
  name: yup.string().matches(/^[a-z ,.'-]{12,}$/i, invalid).required(required),
});

export default { login, register, newSchool, update };
