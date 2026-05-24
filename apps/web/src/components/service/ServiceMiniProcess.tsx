interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

interface ServiceMiniProcessProps {
  steps: ProcessStep[];
  heading: string;
}

export function ServiceMiniProcess({ steps, heading }: ServiceMiniProcessProps) {
  return (
    <>
      <h2 className="text-4xl mb-5">{heading}</h2>
      <div className="flex flex-col gap-0 mb-12">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex gap-6 pb-6 ${i === 0 ? "pt-0" : "pt-6 border-t border-border"}`}
          >
            <div className="text-3xl font-extrabold text-accent tracking-tight min-w-[50px]">
              {step.n}
            </div>
            <div>
              <h4 className="mb-2">{step.t}</h4>
              <p className="text-base text-text-secondary leading-relaxed m-0">{step.d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
