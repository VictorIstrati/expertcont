import { useState } from "react";
import { Icon, type IconName } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

interface Strings {
  title: string;
  subtitle: string;
  step1: string;
  step2: string;
  step3: string;
  stepDone: string;
  serviceLabel: string;
  services: { slug: string; name: string; icon: string }[];
  dateLabel: string;
  timeLabel: string;
  modeLabel: string;
  modeOnline: string;
  modeOffice: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  notesLabel: string;
  summaryLabel: string;
  prev: string;
  next: string;
  confirm: string;
  cancel: string;
  close: string;
  doneTitle: string;
  doneMsg: string;
  bookedLabel: string;
  dayNames: string[];
  monthNames: string[];
}

const strings: Record<Locale, Strings> = {
  ro: {
    title: "Programează consultație",
    subtitle: "Completează pașii de mai jos — confirmăm în < 4 ore",
    step1: "Serviciu",
    step2: "Data & Ora",
    step3: "Date contact",
    stepDone: "Confirmat",
    serviceLabel: "Pentru ce serviciu?",
    services: [
      { slug: "contabilitate", name: "Contabilitate", icon: "file-text" },
      { slug: "audit", name: "Audit", icon: "search" },
      { slug: "juridic", name: "Juridic", icon: "briefcase" },
      { slug: "consultanta", name: "Consultanță", icon: "lightbulb" },
      { slug: "hr", name: "HR", icon: "users" },
      { slug: "it", name: "IT & Soft", icon: "code" },
    ],
    dateLabel: "Alege ziua",
    timeLabel: "Alege ora",
    modeLabel: "Format",
    modeOnline: "Online",
    modeOffice: "La birou",
    nameLabel: "Nume complet",
    emailLabel: "Email",
    phoneLabel: "Telefon",
    notesLabel: "Detalii suplimentare (opțional)",
    summaryLabel: "Rezumat programare",
    prev: "Înapoi",
    next: "Continuă",
    confirm: "Confirmă programarea",
    cancel: "Anulează",
    close: "Închide",
    doneTitle: "Programare trimisă!",
    doneMsg: "Vă vom contacta în mai puțin de 4 ore în zile lucrătoare pentru confirmare.",
    bookedLabel: "Programare confirmată",
    dayNames: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
    monthNames: [
      "Ian",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Iun",
      "Iul",
      "Aug",
      "Sep",
      "Oct",
      "Noi",
      "Dec",
    ],
  },
  ru: {
    title: "Записаться на консультацию",
    subtitle: "Заполните шаги ниже — подтвердим за < 4 часа",
    step1: "Услуга",
    step2: "Дата и время",
    step3: "Контакты",
    stepDone: "Подтверждено",
    serviceLabel: "Для какой услуги?",
    services: [
      { slug: "contabilitate", name: "Бухгалтерия", icon: "file-text" },
      { slug: "audit", name: "Аудит", icon: "search" },
      { slug: "juridic", name: "Юридические", icon: "briefcase" },
      { slug: "consultanta", name: "Консалтинг", icon: "lightbulb" },
      { slug: "hr", name: "HR", icon: "users" },
      { slug: "it", name: "IT и ПО", icon: "code" },
    ],
    dateLabel: "Выберите день",
    timeLabel: "Выберите время",
    modeLabel: "Формат",
    modeOnline: "Онлайн",
    modeOffice: "В офисе",
    nameLabel: "Полное имя",
    emailLabel: "Email",
    phoneLabel: "Телефон",
    notesLabel: "Дополнительные сведения (необязательно)",
    summaryLabel: "Сводка записи",
    prev: "Назад",
    next: "Продолжить",
    confirm: "Подтвердить запись",
    cancel: "Отмена",
    close: "Закрыть",
    doneTitle: "Запись отправлена!",
    doneMsg: "Мы свяжемся с вами менее чем за 4 часа в рабочие дни для подтверждения.",
    bookedLabel: "Запись подтверждена",
    dayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthNames: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
  },
  en: {
    title: "Book a consultation",
    subtitle: "Fill in the steps below — we confirm in < 4 hours",
    step1: "Service",
    step2: "Date & Time",
    step3: "Contact",
    stepDone: "Confirmed",
    serviceLabel: "Which service?",
    services: [
      { slug: "contabilitate", name: "Accounting", icon: "file-text" },
      { slug: "audit", name: "Audit", icon: "search" },
      { slug: "juridic", name: "Legal", icon: "briefcase" },
      { slug: "consultanta", name: "Consulting", icon: "lightbulb" },
      { slug: "hr", name: "HR", icon: "users" },
      { slug: "it", name: "IT & Software", icon: "code" },
    ],
    dateLabel: "Choose a day",
    timeLabel: "Choose a time",
    modeLabel: "Format",
    modeOnline: "Online",
    modeOffice: "At office",
    nameLabel: "Full name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    notesLabel: "Additional details (optional)",
    summaryLabel: "Booking summary",
    prev: "Back",
    next: "Continue",
    confirm: "Confirm booking",
    cancel: "Cancel",
    close: "Close",
    doneTitle: "Booking sent!",
    doneMsg: "We'll reach out within 4 business hours to confirm.",
    bookedLabel: "Booking confirmed",
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

const TIMES = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function buildDays(): Date[] {
  const today = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  }).filter((d) => d.getDay() !== 0 && d.getDay() !== 6);
}

export function BookingModal({ open, onClose, locale }: Props) {
  const t = strings[locale];
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: "contabilitate",
    date: null as Date | null,
    time: null as string | null,
    mode: "online",
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const days = buildDays();
  const STEPS = [t.step1, t.step2, t.step3, t.stepDone];

  const canNext =
    step === 0
      ? !!data.service
      : step === 1
        ? !!data.date && !!data.time
        : step === 2
          ? !!data.name.trim() && !!data.email.trim()
          : false;

  const handleClose = () => {
    setStep(0);
    setData({
      service: "contabilitate",
      date: null,
      time: null,
      mode: "online",
      name: "",
      email: "",
      phone: "",
      note: "",
    });
    onClose();
  };

  const footer =
    step < 3 ? (
      <div className="flex justify-between gap-3">
        <button
          className="btn btn-ghost btn-md"
          onClick={step === 0 ? handleClose : () => setStep(step - 1)}
        >
          {step === 0 ? t.cancel : t.prev}
        </button>
        <button
          className={`btn btn-primary btn-md ${canNext ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
          onClick={() => setStep(step + 1)}
          disabled={!canNext}
        >
          {step === 2 ? t.confirm : t.next}
        </button>
      </div>
    ) : (
      <div className="flex justify-center">
        <button className="btn btn-primary btn-md" onClick={handleClose}>
          {t.close}
        </button>
      </div>
    );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t.title}
      subtitle={t.subtitle}
      size="lg"
      footer={footer}
    >
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {STEPS.map((lbl, i) => {
          const reached = i <= step;
          const past = i < step;
          return (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    reached ? "bg-primary text-white" : "bg-border text-text-secondary"
                  }`}
                >
                  {past ? <Icon name="check" size={12} /> : i + 1}
                </span>
                <span
                  className={`text-sm font-semibold hidden sm:inline ${
                    reached ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {lbl}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-6 h-px ml-1 ${past ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 0: Service */}
      {step === 0 && (
        <div>
          <h4 className="mb-4">{t.serviceLabel}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.services.map((s) => {
              const active = data.service === s.slug;
              return (
                <button
                  key={s.slug}
                  onClick={() => setData({ ...data, service: s.slug })}
                  className={`p-4 text-left flex items-center gap-3 border-[1.5px] rounded-sm cursor-pointer transition-all duration-150 ${
                    active
                      ? "border-primary bg-primary-50"
                      : "border-border bg-transparent"
                  }`}
                >
                  <span className="w-9 h-9 rounded-xs bg-bg-card text-primary flex items-center justify-center shrink-0 border border-border">
                    <Icon name={s.icon as IconName} size={16} />
                  </span>
                  <span className="text-sm font-semibold">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div>
          <h4 className="mb-4">{t.dateLabel}</h4>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
            {days.map((d, i) => {
              const sel = !!data.date && data.date.toDateString() === d.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => setData({ ...data, date: d })}
                  className={`min-w-20 py-3 px-2 flex flex-col items-center gap-1 border-[1.5px] rounded-sm shrink-0 cursor-pointer transition-all duration-150 ${
                    sel
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-transparent text-inherit"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase opacity-70">
                    {t.dayNames[d.getDay()]}
                  </span>
                  <span className="text-xl font-extrabold leading-none">{d.getDate()}</span>
                  <span className="text-xs opacity-70">{t.monthNames[d.getMonth()]}</span>
                </button>
              );
            })}
          </div>

          <h4 className="mb-4">{t.timeLabel}</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
            {TIMES.map((tm) => {
              const active = data.time === tm;
              return (
                <button
                  key={tm}
                  onClick={() => setData({ ...data, time: tm })}
                  className={`py-3 px-2 border-[1.5px] rounded-sm text-sm font-semibold cursor-pointer transition-all duration-150 ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-transparent text-inherit"
                  }`}
                >
                  {tm}
                </button>
              );
            })}
          </div>

          <h4 className="mb-3">{t.modeLabel}</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "online", l: t.modeOnline, i: "code" },
              { k: "office", l: t.modeOffice, i: "map-pin" },
            ].map((m) => {
              const active = data.mode === m.k;
              return (
                <button
                  key={m.k}
                  onClick={() => setData({ ...data, mode: m.k })}
                  className={`p-4 flex items-center gap-3 border-[1.5px] rounded-sm cursor-pointer transition-all duration-150 ${
                    active
                      ? "border-primary bg-primary-50"
                      : "border-border bg-transparent"
                  }`}
                >
                  <Icon name={m.i as IconName} size={18} />
                  <span className="text-sm font-semibold">{m.l}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Contact */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="field">
            <label>{t.nameLabel} *</label>
            <input
              className="input"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Ion Popescu"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label>{t.emailLabel} *</label>
              <input
                className="input"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="ion@firma.md"
              />
            </div>
            <div className="field">
              <label>{t.phoneLabel}</label>
              <input
                className="input"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+373 ..."
              />
            </div>
          </div>
          <div className="field">
            <label>{t.notesLabel}</label>
            <textarea
              className="textarea min-h-20"
              value={data.note}
              onChange={(e) => setData({ ...data, note: e.target.value })}
              placeholder="Ce te interesează în mod special..."
            />
          </div>
          {data.date && (
            <div className="p-4 bg-bg-section-alt rounded-sm text-sm text-text-secondary">
              <div className="flex items-center gap-2 mb-2 font-semibold text-text-primary">
                <Icon name="calendar" size={14} />
                {t.summaryLabel}
              </div>
              {data.date.toLocaleDateString(
                locale === "ru" ? "ru-RU" : locale === "en" ? "en-US" : "ro-RO",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                },
              )}{" "}
              · {data.time ?? "—"} · {data.mode === "online" ? t.modeOnline : t.modeOffice}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Done */}
      {step === 3 && (
        <div className="text-center py-8 px-4">
          <div className="w-20 h-20 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-5">
            <Icon name="check" size={36} />
          </div>
          <h3 className="mb-3">{t.doneTitle}</h3>
          <p className="text-text-secondary max-w-[420px] mx-auto mb-8 leading-relaxed">
            {t.doneMsg}
          </p>
          {data.date && (
            <div className="inline-flex flex-col py-5 px-8 bg-bg-section-alt rounded-md border border-border text-left gap-2">
              <div className="text-xs font-bold text-primary tracking-widest uppercase">
                {t.bookedLabel}
              </div>
              <div className="text-base font-bold">
                {data.date.toLocaleDateString(
                  locale === "ru" ? "ru-RU" : locale === "en" ? "en-US" : "ro-RO",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  },
                )}{" "}
                · {data.time}
              </div>
              <div className="text-sm text-text-secondary">
                {t.services.find((s) => s.slug === data.service)?.name} ·{" "}
                {data.mode === "online" ? t.modeOnline : t.modeOffice}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
