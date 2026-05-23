import { useMemo, useState } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import type { CalcStrings } from "./types";

interface Props {
  calc: CalcStrings;
  locale: Locale;
}

export function PriceCalculator({ calc, locale }: Props) {
  const [legal, setLegal] = useState(1);
  const [docs, setDocs] = useState(60);
  const [emp, setEmp] = useState(8);
  const [vat, setVat] = useState(true);
  const [extras, setExtras] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const price = useMemo(() => {
    let p = 800;
    p += [0, 350, 600][legal] ?? 0;
    p += Math.max(0, docs - 20) * 9;
    p += emp * 90;
    if (vat) p += 380;
    Object.values(extras).forEach((v) => {
      if (v) p += 450;
    });
    return Math.round(p / 10) * 10;
  }, [legal, docs, emp, vat, extras]);

  return (
    <section id="calculator" className="section section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4 justify-center">{calc.calcTitle}</div>
          <h2 className="text-white mb-4">{calc.calcHeading}</h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">{calc.calcSubtitle}</p>
        </div>

        <div className="card calc-card p-10 bg-white/5 border-white/15 backdrop-blur-[20px] text-white">
          <div className="calc-grid grid grid-cols-[1.4fr_1fr] gap-12">
            <div className="calc-inputs flex flex-col gap-8">
              <div>
                <label className="text-sm font-bold mb-3 block text-white/85">
                  {calc.calcLegalForm}
                </label>
                <div className="calc-legal-grid grid grid-cols-3 gap-2">
                  {calc.calcLegalOpts.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => setLegal(i)}
                      className={`px-2 py-3 text-sm font-semibold rounded-sm min-h-12 cursor-pointer border ${
                        legal === i
                          ? "bg-accent text-[#1A1A2E] border-accent"
                          : "bg-white/5 text-white border-white/15"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-slider-row">
                <div className="flex justify-between items-baseline mb-3 gap-2">
                  <label className="text-sm font-bold text-white/85">{calc.calcDocs}</label>
                  <span className="text-2xl font-extrabold text-[#DFB741] tracking-tight leading-none">
                    {docs}
                    {docs >= 300 ? "+" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={docs}
                  onChange={(e) => setDocs(+e.target.value)}
                  className="calc-slider"
                  aria-label={calc.calcDocs}
                />
                <div className="calc-slider-ticks">
                  <span>10</span>
                  <span>150</span>
                  <span>300+</span>
                </div>
              </div>

              <div className="calc-slider-row">
                <div className="flex justify-between items-baseline mb-3 gap-2">
                  <label className="text-sm font-bold text-white/85">{calc.calcEmployees}</label>
                  <span className="text-2xl font-extrabold text-[#DFB741] tracking-tight leading-none">
                    {emp}
                    {emp >= 50 ? "+" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={emp}
                  onChange={(e) => setEmp(+e.target.value)}
                  className="calc-slider"
                  aria-label={calc.calcEmployees}
                />
                <div className="calc-slider-ticks">
                  <span>0</span>
                  <span>25</span>
                  <span>50+</span>
                </div>
              </div>

              <label
                className={`flex items-center gap-3 cursor-pointer px-4 py-4 rounded-sm border border-white/15 min-h-[52px] ${
                  vat ? "bg-[rgba(223,183,65,0.08)]" : "bg-white/5"
                }`}
              >
                <input
                  type="checkbox"
                  checked={vat}
                  onChange={(e) => setVat(e.target.checked)}
                  className="w-5 h-5 accent-[#DFB741]"
                />
                <span className="text-sm font-semibold">{calc.calcVat}</span>
              </label>

              <div>
                <label className="text-sm font-bold mb-3 block text-white/85">
                  {calc.calcServices}
                </label>
                <div className="calc-extras-grid grid grid-cols-2 gap-2">
                  {calc.calcAddServices.map((svc, i) => (
                    <label
                      key={svc}
                      className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-sm border text-sm font-medium min-h-12 ${
                        extras[i]
                          ? "border-[rgba(223,183,65,0.4)] bg-[rgba(223,183,65,0.08)]"
                          : "border-white/15 bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!extras[i]}
                        onChange={(ev) => setExtras({ ...extras, [i]: ev.target.checked })}
                        className="w-5 h-5 accent-[#DFB741] shrink-0"
                      />
                      <span className="leading-snug">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="calc-result flex flex-col justify-center items-center text-center p-6 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]">
              <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase mb-3">
                {calc.calcEstimateLabel}
              </div>
              <div className="calc-price text-[64px] font-extrabold tracking-tighter text-white leading-none">
                {price.toLocaleString(localeTag(locale))}
              </div>
              <div className="text-base font-semibold text-white/70 mt-2">{calc.calcPerMonth}</div>
              <p className="text-xs text-white/55 mt-4 leading-normal">{calc.calcDisclaimer}</p>
              <button
                className="btn btn-primary mt-6 w-full justify-center inline-flex items-center gap-2"
                onClick={() => openModal("booking")}
              >
                {calc.calcRequestOffer} <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .calc-slider-row {
          padding: 0 14px;
          margin: 0 -14px;
        }
        .calc-slider {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 8px;
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          margin: 0; padding: 0;
          box-sizing: border-box;
          display: block;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #DFB741;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: grab;
          transition: transform 0.12s ease;
        }
        .calc-slider::-webkit-slider-thumb:active { transform: scale(1.1); cursor: grabbing; }
        .calc-slider::-moz-range-thumb {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #DFB741;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: grab;
        }
        .calc-slider-ticks {
          display: flex; justify-content: space-between;
          margin-top: 10px;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.04em;
        }
        @media (max-width: 900px) {
          .calc-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          .calc-card { padding: 20px !important; }
          .calc-inputs { gap: 24px !important; min-width: 0 !important; }
          .calc-price { font-size: 48px !important; }
          .calc-result { padding: 28px 20px !important; }
          .calc-extras-grid { grid-template-columns: 1fr !important; }
          .calc-slider::-webkit-slider-thumb { width: 30px; height: 30px; }
          .calc-slider::-moz-range-thumb { width: 30px; height: 30px; }
          .calc-slider { height: 10px; }
          .calc-slider-row { padding: 0 16px; margin: 0 -16px; }
        }
        @media (max-width: 400px) {
          .calc-legal-grid { grid-template-columns: 1fr !important; }
          .calc-card { padding: 16px !important; }
        }
      `}</style>
    </section>
  );
}
