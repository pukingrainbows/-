import { describe, expect, test } from "@jest/globals";
import { Input } from "../model/inputs.model";
import {
  addInput,
  moveInputDown,
  moveInputTo,
  moveInputUp,
  removeInput,
} from "./inputs.logic";

const input0: Input = {
  id: "0",
  type: "binaryButton",
  value: {
    id: "0.0",
    currentValue: "true",
    defaultValue: "false",
    inputType: "binaryButton",
    label: "question 0",
    lastModifiedTime: "",
    lastModifiedUserId: "",
    permission: "",
  },
};

const input1: Input = {
  id: "1",
  type: "binaryButton",
  value: {
    id: "0.1",
    currentValue: "true",
    defaultValue: "false",
    inputType: "binaryButton",
    label: "question 1",
    lastModifiedTime: "",
    lastModifiedUserId: "",
    permission: "",
  },
};

const input2: Input = {
  id: "2",
  type: "binaryButton",
  value: {
    id: "0.2",
    currentValue: "true",
    defaultValue: "false",
    inputType: "binaryButton",
    label: "question 2",
    lastModifiedTime: "",
    lastModifiedUserId: "",
    permission: "",
  },
};

const input3: Input = {
  id: "3",
  type: "mediaUpload",
  value: {
    id: "0.3",
    currentValue: "image1",
    defaultValue: "",
    inputType: "mediaUpload",
    label: "question 3",
    lastModifiedTime: "",
    lastModifiedUserId: "",
    permission: "",
  },
};

const input4: Input = {
  id: "4",
  type: "text",
  value: {
    id: "0.4",
    currentValue: "text",
    defaultValue: "",
    inputType: "mediaUpload",
    label: "question 3",
    lastModifiedTime: "",
    lastModifiedUserId: "",
    permission: "",
  },
};

const input5: Input = {
  id: "5",
  type: "text",
  value: {
    id: "0.5",
    currentValue: "text",
    defaultValue: "",
    inputType: "mediaUpload",
    label: "question 3",
    lastModifiedTime: "",
    lastModifiedUserId: "",
    permission: "",
  },
};

describe.each([
  [[], input0, 1],
  [[], [input0, input4], 2],
  [[], [input0, input1, input3], 3],
])("Form.logic.ts/addInput", (inputs, item, expected) => {
  test(`addInput should have length of ${expected}`, () => {
    const nextInputs = addInput({
      inputs,
      item,
    });

    expect(nextInputs.length).toBe(expected);
  });
});

describe.each([
  [[input0, input1, input4], input1.id],
  [[input0, input2, input3], input2.id],
  [[input3, input1, input4], input1.id],
])("Form.logic.ts/moveInputUp", (inputs, inputId) => {
  test(`moveInputUp should move input to the first position first input id:${inputId}`, () => {
    const nextInputs = moveInputUp({ inputs, inputId });
    expect(nextInputs[0].id).toBe(inputId);
  });
});

describe.each([
  [[input0, input1, input4], input0.id],
  [[input0, input2, input3], input0.id],
  [[input3, input1, input4], input3.id],
])("Form.logic.ts/moveInputUp", (inputs, inputId) => {
  test(`moveInputUp should remain in the first position with id:${inputId}`, () => {
    const nextInputs = moveInputUp({ inputs, inputId });
    expect(nextInputs[0].id).toBe(inputId);
  });
});

describe.each([
  [[input0, input1, input4], input1.id],
  [[input0, input2, input3], input2.id],
  [[input3, input1, input4], input1.id],
])("Form.logic.ts/moveInputDown", (inputs, inputId) => {
  test(`moveInputDown should move input to the first position first input id:${inputId}`, () => {
    const nextInputs = moveInputDown({ inputs, inputId });
    expect(nextInputs[2].id).toBe(inputId);
  });
});

describe.each([
  [[input0, input1, input4], input4.id],
  [[input0, input2, input3], input3.id],
  [[input3, input1, input4], input4.id],
])("Form.logic.ts/moveInputDown", (inputs, inputId) => {
  test(`moveInputDown should remain in the last position with id:${inputId}`, () => {
    const nextInputs = moveInputDown({ inputs, inputId });
    expect(nextInputs[nextInputs.length - 1].id).toBe(inputId);
  });
});

describe.each([
  [[input0, input1, input4, input5], input5.id],
  [[input0, input1, input4, input3], input3.id],
  [[input0, input1, input4, input3], input3.id],
])("Form.logic.ts/moveTo", (inputs, inputId) => {
  test(`moveTo should move from index: ${inputs.length - 1} / id: ${
    inputs[inputs.length - 1].id
  } to index: 1 / id: ${inputId}`, () => {
    expect(inputs[1].id).toBe("1");
    const nextInputs = moveInputTo({
      inputs,
      fromIndex: 3,
      toIndex: 1,
    });
    expect(nextInputs[1].id).toBe(inputId);
    expect(nextInputs).toMatchSnapshot();
  });
});

describe.each([
  [[input0, input1, input4, input5], input5.id],
  [[input0, input1, input4, input3], input3.id],
  [[input0, input1, input4, input3], input3.id],
])("Form.logic.ts/removeInput", (inputs, inputId) => {
  test(`removeInput should remove id: ${inputId}`, () => {
    expect(inputs.length).toBe(4);
    expect(inputs.filter((input) => input.id === inputId).length).toBe(1);
    const nextInputs = removeInput({ inputs, inputId: inputId });
    expect(nextInputs.filter((input) => input.id === inputId).length).toBe(0);
    expect(nextInputs.length).toBe(3);
    expect(nextInputs).toMatchSnapshot();
  });
});
