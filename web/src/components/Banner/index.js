import Image from "next/image";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.banner}>
      <Image
        src="/banner.png"
        alt="Banner"
        fill
        priority
        className={styles.bannerImage}
      />
    </section>
  );
}
