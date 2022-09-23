export type InputTypes =
  | "text"
  | "selectDropdown"
  | "selectButton"
  | "multiSelectDropdown"
  | "richContent"
  | "mediaUpload"
  | "binaryButton"
  | "nodeTree";

export type Value = {
  id: string;
  currentValue: string | number;
  defaultValue: string | number;

  label: string;
  error?: string;
  help?: string;
  hint?: string;
  placeholder?: string;
  required?: string;

  inputType: InputTypes;
  lastModifiedTime: string;
  lastModifiedUserId: string;

  permission: "";
};

export interface Input {
  id: string;
  type: InputTypes;
  value: Value;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  lastModifiedTime: string;
  lastModifiedUserId: string;
  inputs: Array<Input>;
}
