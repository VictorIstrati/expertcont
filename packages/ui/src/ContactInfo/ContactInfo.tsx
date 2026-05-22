import { Trans } from "@lingui/react/macro";
import styles from "./ContactInfo.module.css";

export interface ContactInfoProps {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export function ContactInfo({ address, phone, email, hours }: ContactInfoProps) {
  return (
    <dl className={styles.list}>
      <div className={styles.row}>
        <dt>
          <Trans>Address</Trans>
        </dt>
        <dd>{address}</dd>
      </div>
      <div className={styles.row}>
        <dt>
          <Trans>Phone</Trans>
        </dt>
        <dd>
          <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
        </dd>
      </div>
      <div className={styles.row}>
        <dt>
          <Trans>Email</Trans>
        </dt>
        <dd>
          <a href={`mailto:${email}`}>{email}</a>
        </dd>
      </div>
      <div className={styles.row}>
        <dt>
          <Trans>Hours</Trans>
        </dt>
        <dd>{hours}</dd>
      </div>
    </dl>
  );
}
