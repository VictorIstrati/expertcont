export interface BookingData {
  service: string;
  date: Date | null;
  time: string | null;
  mode: string;
  name: string;
  email: string;
  phone: string;
  note: string;
}

export interface Strings {
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
  sending: string;
  errorGeneric: string;
  cancel: string;
  close: string;
  doneTitle: string;
  doneMsg: string;
  bookedLabel: string;
}

export const TIMES = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const INITIAL_DATA: BookingData = {
  service: "contabilitate",
  date: null,
  time: null,
  mode: "online",
  name: "",
  email: "",
  phone: "",
  note: "",
};
