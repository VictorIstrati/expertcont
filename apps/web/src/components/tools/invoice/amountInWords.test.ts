import { describe, expect, it } from "vitest";
import { amountInWords } from "./amountInWords";

describe("amountInWords — ro", () => {
  it.each([
    [0, "Zero lei 00 bani"],
    [1, "Un leu 00 bani"],
    [2, "Doi lei 00 bani"],
    [12, "Doisprezece lei 00 bani"],
    [19, "Nouăsprezece lei 00 bani"],
    [20, "Douăzeci de lei 00 bani"],
    [21, "Douăzeci și unu de lei 00 bani"],
    [101, "O sută unu lei 00 bani"],
    [120, "O sută douăzeci de lei 00 bani"],
    [200, "Două sute de lei 00 bani"],
    [1000, "O mie de lei 00 bani"],
    [1001, "O mie unu lei 00 bani"],
    [2000, "Două mii de lei 00 bani"],
    [12000, "Douăsprezece mii de lei 00 bani"],
    [21000, "Douăzeci și una de mii de lei 00 bani"],
    [2500.5, "Două mii cinci sute de lei 50 bani"],
    [1_000_000, "Un milion de lei 00 bani"],
    [2_300_000, "Două milioane trei sute de mii de lei 00 bani"],
    [12_000_000, "Douăsprezece milioane de lei 00 bani"],
    [2_000_000_000, "Două miliarde de lei 00 bani"],
  ])("%d MDL", (amount, expected) => {
    expect(amountInWords(amount, "MDL", "ro")).toBe(expected);
  });

  it("uses currency names for EUR and USD", () => {
    expect(amountInWords(1, "EUR", "ro")).toBe("Un euro 00 cenți");
    expect(amountInWords(1.01, "USD", "ro")).toBe("Un dolar 01 cent");
  });

  it("rounds to cents", () => {
    expect(amountInWords(0.1 + 0.2, "MDL", "ro")).toBe("Zero lei 30 bani");
  });
});

describe("amountInWords — ru", () => {
  it.each([
    [0, "Ноль леев 00 бань"],
    [1, "Один лей 00 бань"],
    [2, "Два лея 00 бань"],
    [5, "Пять леев 00 бань"],
    [11, "Одиннадцать леев 00 бань"],
    [21, "Двадцать один лей 00 бань"],
    [1000, "Одна тысяча леев 00 бань"],
    [2000, "Две тысячи леев 00 бань"],
    [5000, "Пять тысяч леев 00 бань"],
    [2500.01, "Две тысячи пятьсот леев 01 бан"],
    [1_000_000, "Один миллион леев 00 бань"],
  ])("%d MDL", (amount, expected) => {
    expect(amountInWords(amount, "MDL", "ru")).toBe(expected);
  });

  it("uses currency names for EUR and USD", () => {
    expect(amountInWords(3, "USD", "ru")).toBe("Три доллара 00 центов");
    expect(amountInWords(100.02, "EUR", "ru")).toBe("Сто евро 02 цента");
  });
});

describe("amountInWords — en", () => {
  it.each([
    [0, "Zero lei 00 bani"],
    [1, "One leu 00 bani"],
    [21, "Twenty-one lei 00 bani"],
    [1000, "One thousand lei 00 bani"],
    [2500.5, "Two thousand five hundred lei 50 bani"],
    [1_234_567, "One million two hundred thirty-four thousand five hundred sixty-seven lei 00 bani"],
  ])("%d MDL", (amount, expected) => {
    expect(amountInWords(amount, "MDL", "en")).toBe(expected);
  });

  it("uses currency names for EUR and USD", () => {
    expect(amountInWords(1, "USD", "en")).toBe("One dollar 00 cents");
    expect(amountInWords(2.01, "EUR", "en")).toBe("Two euro 01 cent");
  });
});
