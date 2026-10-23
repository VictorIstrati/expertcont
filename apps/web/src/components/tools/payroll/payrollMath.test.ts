import { describe, expect, it } from "vitest";
import { grossToNet, monthlyExemptions, netToGross, NO_EXEMPTIONS } from "./payrollMath";
import { PAYROLL_RATES } from "./rates";

const PERSONAL = { personalExemption: true, spouseExemption: false, dependants: 0 };

describe("grossToNet", () => {
  it("deducts health insurance and the personal exemption from the tax base", () => {
    const b = grossToNet(10_000, PERSONAL, PAYROLL_RATES);
    expect(b.employeeSocial).toBe(0);
    expect(b.healthInsurance).toBe(900);
    expect(b.exemptions).toBe(2_475);
    expect(b.taxableIncome).toBe(6_625);
    expect(b.incomeTax).toBe(795);
    expect(b.net).toBe(8_305);
    expect(b.employerSocial).toBe(2_400);
    expect(b.employerCost).toBe(12_400);
  });

  it("adds dependant exemptions", () => {
    const b = grossToNet(10_000, { ...PERSONAL, dependants: 1 }, PAYROLL_RATES);
    expect(b.exemptions).toBe(3_300);
    expect(b.incomeTax).toBe(696);
    expect(b.net).toBe(8_404);
  });

  it("taxes the full base without exemptions", () => {
    const b = grossToNet(10_000, NO_EXEMPTIONS, PAYROLL_RATES);
    expect(b.taxableIncome).toBe(9_100);
    expect(b.incomeTax).toBe(1_092);
    expect(b.net).toBe(8_008);
  });

  it("tests the ceiling on taxable income: gross minus health insurance and other exemptions (CF art. 12, 33)", () => {
    expect(grossToNet(32_967, PERSONAL, PAYROLL_RATES).personalExemptionApplied).toBe(true);
    expect(grossToNet(32_968, PERSONAL, PAYROLL_RATES).personalExemptionApplied).toBe(false);
    expect(grossToNet(34_780, { ...PERSONAL, dependants: 2 }, PAYROLL_RATES).personalExemptionApplied).toBe(true);
    const at = grossToNet(34_781, { ...PERSONAL, dependants: 2 }, PAYROLL_RATES);
    expect(at.personalExemptionApplied).toBe(false);
    expect(at.personalExemptionLost).toBe(true);
    expect(at.exemptions).toBe(1_650);
  });

  it("uses the increased personal exemption and the spouse exemption", () => {
    const options = {
      personalExemption: false,
      increasedPersonalExemption: true,
      spouseExemption: true,
      dependants: 0,
      disabledDependants: 1,
    };
    expect(monthlyExemptions(options, PAYROLL_RATES)).toBeCloseTo((34_620 + 21_780 * 2) / 12);
  });

  it("matches the 2026 minimum wage net of 5 045 lei without exemptions", () => {
    const b = grossToNet(6_300, NO_EXEMPTIONS, PAYROLL_RATES);
    expect(b.healthInsurance).toBe(567);
    expect(b.incomeTax).toBe(687.96);
    expect(b.net).toBe(5_045.04);
  });

  it("computes the guide example of 15 000 lei with one dependant", () => {
    const b = grossToNet(15_000, { ...PERSONAL, dependants: 1 }, PAYROLL_RATES);
    expect(b.taxableIncome).toBe(10_350);
    expect(b.incomeTax).toBe(1_242);
    expect(b.net).toBe(12_408);
    expect(b.employerCost).toBe(18_600);
  });

  it("never produces a negative tax on small salaries", () => {
    const b = grossToNet(2_000, PERSONAL, PAYROLL_RATES);
    expect(b.taxableIncome).toBe(0);
    expect(b.incomeTax).toBe(0);
    expect(b.net).toBe(1_820);
  });

  it("calculates the employer contribution on at least the minimum wage (Law 489/1999 art. 22)", () => {
    expect(grossToNet(4_000, NO_EXEMPTIONS, PAYROLL_RATES).employerSocial).toBe(1_512);
    expect(grossToNet(0, NO_EXEMPTIONS, PAYROLL_RATES).employerSocial).toBe(0);
  });
});

describe("netToGross", () => {
  it("inverts grossToNet", () => {
    expect(netToGross(8_305, PERSONAL, PAYROLL_RATES).gross).toBe(10_000);
    expect(netToGross(8_008, NO_EXEMPTIONS, PAYROLL_RATES).gross).toBe(10_000);
  });

  it("returns the smallest gross that reaches the net target", () => {
    for (const target of [0, 1_000, 2_400, 7_777.77, 24_200, 25_000, 100_000]) {
      const b = netToGross(target, { ...PERSONAL, dependants: 1 }, PAYROLL_RATES);
      expect(b.net).toBeGreaterThanOrEqual(target);
      const lower = grossToNet(b.gross - 0.01, { ...PERSONAL, dependants: 1 }, PAYROLL_RATES);
      if (b.gross > 0) expect(lower.net).toBeLessThan(target);
    }
  });

  it("crosses the personal exemption ceiling", () => {
    const b = netToGross(27_000, PERSONAL, PAYROLL_RATES);
    expect(b.personalExemptionApplied).toBe(false);
    expect(b.gross).toBeGreaterThan(32_967);
    expect(b.net).toBeGreaterThanOrEqual(27_000);
  });
});
