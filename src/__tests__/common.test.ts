jest.mock('../common', () => require('../__mocks__/configMock'));

import { describe, jest, test } from "@jest/globals";
import { expect } from "@jest/globals";
import { ShortenUrlRegex } from "../common";

describe("Hex string extraction regex", () => {  
    const testCases = [
      { input: "https://short.ivanenkomak.com/AC01E8D0", expected: "AC01E8D0" },
      { input: "AC01E8D0", expected: "AC01E8D0" },
      { input: "short.ivanenkomak.com/AC01E8D0", expected: "AC01E8D0" },
      { input: "short.ivanenkomak.com/ZZZZZZZZ", expected: null }, // Invalid hex
      { input: "00FFAA11", expected: "00FFAA11" }, // Valid hex
      { input: "A1B2C3D", expected: null }, // Only 7 characters, should fail
      { input: "ABC123456", expected: null }, // More than 8 characters, should fail
    ];
  
    testCases.forEach(({ input, expected }) => {
      test(`should extract hex from "${input}"`, () => {
        const match = input.match(ShortenUrlRegex);
        expect(match ? match[0] : null).toBe(expected);
      });
    });
  });
  