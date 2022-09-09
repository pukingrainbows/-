import { Form, Input } from "../model/Form.model";

export type Move = ({
  form,
  fromIndex,
  toIndex,
}: {
  form: Form;
  fromIndex: number;
  toIndex: number;
}) => Form;

const move: Move = ({ form, fromIndex, toIndex }) => {
  const cloneForm = form.slice(0);
  var element = cloneForm[fromIndex];
  cloneForm.splice(fromIndex, 1);
  cloneForm.splice(toIndex, 0, element);
  return cloneForm;
};

export type InputFn = ({
  form,
  inputId,
}: {
  form: Form;
  inputId: string;
}) => Form;

export const moveInputUp: InputFn = ({ form, inputId }) => {
  const inputIndex = form.findIndex((input: Input) => input.id === inputId);
  if (inputIndex > -1 && form.length - 1 <= inputIndex + 1) {
    return move({ form, fromIndex: inputIndex, toIndex: inputIndex + 1 });
  }

  return form;
};

export const moveInputDown: InputFn = ({ form, inputId }) => {
  const inputIndex = form.findIndex((input: Input) => input.id === inputId);
  if (inputIndex > -1 && inputIndex - 1 > 0) {
    return move({ form, fromIndex: inputIndex, toIndex: inputIndex - 1 });
  }

  return form;
};

export const removeInput: InputFn = ({ form, inputId }) => {
  return form.filter((input: Input) => input.id !== inputId);
};

export type AddInputFn = ({
  form,
  nextInput,
  index,
}: {
  form: Form;
  nextInput: Input;
  index?: number;
}) => Form;

export const addInput: AddInputFn = ({ form, nextInput, index }) => {
  if (index) {
    return [...form.slice(0), nextInput, ...form.slice(index)];
  }

  const cloneForm = form.slice(0);
  cloneForm.push(nextInput);
  return cloneForm;
};
