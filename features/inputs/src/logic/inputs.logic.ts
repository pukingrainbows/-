import {
  add,
  moveUp,
  moveDown,
  move,
  remove,
  replace,
} from "@pukingrainbows/core-array";

import { Input } from "../model/inputs.model";

type InputsParameters = {
  inputs: Array<Input>;
};

type MoveInputDown = InputsParameters & { inputId: string };
export const moveInputDown = (parameters: MoveInputDown) => {
  const { inputs, inputId } = parameters;
  return moveDown<Input>({
    arrayList: inputs,
    which: (input) => input.id === inputId,
  });
};

type MoveInputUp = InputsParameters & { inputId: string };
export const moveInputUp = (parameters: MoveInputUp) => {
  const { inputs, inputId } = parameters;
  return moveUp<Input>({
    arrayList: inputs,
    which: (input) => input.id === inputId,
  });
};

export type MoveInputToParameters = InputsParameters & {
  fromIndex: number;
  toIndex: number;
};

export const moveInputTo = (parameters: MoveInputToParameters) => {
  const { inputs, fromIndex, toIndex } = parameters;

  return move<Input>({
    arrayList: inputs,
    fromIndex,
    toIndex,
  });
};

type RemoveInput = InputsParameters & { inputId: string };
export const removeInput = (parameters: RemoveInput) => {
  const { inputs, inputId } = parameters;
  return remove<Input>({
    arrayList: inputs,
    when(input) {
      return input.id === inputId;
    },
  });
};

type AddInputParameters = InputsParameters & {
  item: Input | Array<Input>;
  index?: number;
};
export const addInput = (parameters: AddInputParameters) => {
  const { inputs, item, index } = parameters;
  return add<Input>({
    arrayList: inputs,
    item,
    index,
  });
};

type ReplaceInputParameters = InputsParameters & {
  nextItem: Input | Array<Input>;
  which: (input: Input) => boolean;
};

export const replaceInput = (parameters: ReplaceInputParameters) => {
  const { inputs, nextItem, which } = parameters;
  return replace<Input>({
    arrayList: inputs,
    which,
    nextItem,
  });
};
