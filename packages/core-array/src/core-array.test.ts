import { describe, expect, test } from "@jest/globals";
import { add, moveDown, moveUp, move, remove } from ".";

type Value = {
  id: string;
  value: number;
};

const value0: Value = {
  id: "0",
  value: 0,
};

const value1: Value = {
  id: "1",
  value: 1,
};

const value2: Value = {
  id: "2",
  value: 2,
};

const value3: Value = {
  id: "3",
  value: 3,
};

const value4: Value = {
  id: "4",
  value: 4,
};

const value5: Value = {
  id: "5",
  value: 5,
};

/**
 * add can received either a value or an array of values
 */
describe.each([
  [[], value0, 1],
  [[], [value0, value4], 2],
  [[], [value0, value1, value3], 3],
])("core-array.ts/add", (arrayList, item, expected) => {
  test(`add should have length of ${expected}`, () => {
    const nextArrayList = add({
      arrayList,
      item,
    });

    expect(nextArrayList.length).toBe(expected);
    expect(nextArrayList).toMatchSnapshot();
  });
});

describe.each([
  [[value1, value3], [value0, value4], 1, 4],
  [[value1, value3, value4, value5], [value2], 1, 5],
])("core-array.ts/add", (arrayList, item, expectedIndex, expectedLength) => {
  test(`add should insert the value on index ${expectedIndex}`, () => {
    const nextArrayList = add({
      arrayList,
      item,
      index: expectedIndex,
    });

    expect(nextArrayList.length).toBe(expectedLength);
    expect(nextArrayList).toMatchSnapshot();
  });
});

describe.each([
  [[value0, value1, value4], value1, value1.id],
  [[value0, value2, value3], value2, value2.id],
  [[value3, value1, value4], value1, value1.id],
])("core-array.ts/moveUp", (arrayList, item, expected) => {
  test(`moveUp should move value to the first position first value id:${expected}`, () => {
    const nextArrayList = moveUp({
      arrayList,
      which: (value) => value.id === item.id,
    });
    expect(nextArrayList[0].id).toBe(expected);
  });
});

describe.each([
  [[value0, value1, value4], value0, value0.id],
  [[value0, value2, value3], value0, value0.id],
  [[value3, value1, value4], value3, value3.id],
])("core-array.ts/moveUp", (arrayList, item, expected) => {
  test(`moveUp should remain in the first position with id:${expected}`, () => {
    const nextArrayList = moveUp({
      arrayList,
      which: (value) => value.id === item.id,
    });
    expect(nextArrayList[0].id).toBe(expected);
  });
});

describe.each([
  [[value0, value1, value4], value1, value1.id],
  [[value0, value2, value3], value2, value2.id],
  [[value3, value1, value4], value1, value1.id],
])("core-array.ts/moveDown", (arrayList, item, expected) => {
  test(`moveDown should move value to the first position first value id:${expected}`, () => {
    const nextArrayList = moveDown({
      arrayList,
      which: (value) => value.id === item.id,
    });
    expect(nextArrayList[2].id).toBe(expected);
  });
});

describe.each([
  [[value0, value1, value4], value4, value4.id],
  [[value0, value2, value3], value3, value3.id],
  [[value3, value1, value4], value4, value4.id],
])("core-array.ts/moveDown", (arrayList, item, expected) => {
  test(`moveDown should remain in the last position with id:${expected}`, () => {
    const nextArrayList = moveDown({
      arrayList,
      which: (value) => value.id === item.id,
    });
    expect(nextArrayList[nextArrayList.length - 1].id).toBe(expected);
  });
});

describe.each([
  [[value0, value1, value2, value3, value4, value5], value2.id],
  [[value0, value1, value3, value1], value3.id],
  [[value0, value1, value4, value3], value4.id],
])("core-array.ts/move", (arrayList, expected) => {
  test(`move should move from index: ${arrayList.length - 1} / id: ${
    arrayList[arrayList.length - 1].id
  } to index: 1 / id: ${expected}`, () => {
    expect(arrayList[1].id).toBe("1");
    const nextArrayList = move({
      arrayList,
      fromIndex: 2,
      toIndex: 0,
    });

    expect(nextArrayList[0].id).toBe(expected);
    expect(nextArrayList).toMatchSnapshot();
  });
});

describe.each([
  [[value0, value1, value4, value5], value5.id],
  [[value0, value1, value4, value3], value3.id],
  [[value0, value1, value4, value3], value3.id],
])("core-array.ts/remove", (arrayList, expected) => {
  test(`remove should remove id: ${expected}`, () => {
    expect(arrayList.length).toBe(4);
    expect(arrayList.filter((value) => value.id === expected).length).toBe(1);
    const nextArrayList = remove({
      arrayList,
      when: (value) => {
        return value.id === expected;
      },
    });

    expect(nextArrayList.filter((value) => value.id === expected).length).toBe(
      0
    );
    expect(nextArrayList.length).toBe(3);
    expect(nextArrayList).toMatchSnapshot();
  });
});
