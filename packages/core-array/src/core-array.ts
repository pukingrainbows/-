type ParameterArray<T> = {
  arrayList: Array<T>;
};

type MoveWhich<T> = {
  which: (Item: T, index: number, list: Array<T>) => boolean;
};

export type Add<T> = ParameterArray<T> & { item: T | Array<T>; index?: number };
export function add<T>(parameters: Add<T>) {
  const { arrayList, item, index } = parameters;
  if (index && index > -1 && index <= arrayList.length - 1) {
    const nextArrayList = Array.isArray(item) ? [...item] : [item];

    const mergedArrayList = [
      ...arrayList.slice(0, index),
      ...nextArrayList,
      ...arrayList.slice(index, arrayList.length),
    ];

    return mergedArrayList;
  }

  const cloneListArray = arrayList.slice(0);
  if (Array.isArray(item)) {
    item.forEach((input) => {
      cloneListArray.push(input);
    });
    return cloneListArray;
  }

  cloneListArray.push(item);
  return cloneListArray;
}

type Remove<T> = ParameterArray<T> & {
  when: (item: T, index?: number, list?: Array<T>) => boolean;
};

export function remove<T>(parameters: Remove<T>) {
  const { arrayList, when } = parameters;

  return arrayList.filter((item, index, list) => {
    /**
     * This has to be negate since the verb is WHEN and doesn't work for filter method
     * Example:
     * [1,2,3].filter(item => item === 1) // returns [1]
     * this will remove all except the item that matches the when
     * so what the user really wants to do is:
     * [1,2,3].filter(item => item !== 1) // returns [2,3]
     * therefore we need to negate the when to get the correct result
     */
    return !when(item, index, list);
  });
}

export type Move<T> = ParameterArray<T> & {
  fromIndex: number;
  toIndex: number;
};
export function move<T>(parameters: Move<T>) {
  const { arrayList, fromIndex, toIndex } = parameters;

  if (arrayList.length && fromIndex >= 0 && toIndex <= arrayList.length - 1) {
    const cloneForm = arrayList.slice(0);
    var element = cloneForm[fromIndex];
    cloneForm.splice(fromIndex, 1);
    cloneForm.splice(toIndex, 0, element);
    return cloneForm;
  }

  return arrayList;
}

export type MoveUp<T> = ParameterArray<T> & MoveWhich<T>;
export function moveUp<T>(parameters: MoveUp<T>) {
  const { arrayList, which } = parameters;
  const index = arrayList.findIndex(which);
  if (index > -1 && index - 1 > -1) {
    return move<T>({
      arrayList,
      fromIndex: index,
      toIndex: index - 1,
    });
  }
  return arrayList;
}

export type MoveDown<T> = ParameterArray<T> & MoveWhich<T>;
export function moveDown<T>(parameters: MoveDown<T>) {
  const { arrayList, which } = parameters;
  const index = arrayList.findIndex(which);
  if (index > -1 && arrayList.length - 1 <= index + 1) {
    return move<T>({
      arrayList,
      fromIndex: index,
      toIndex: index + 1,
    });
  }

  return arrayList;
}
