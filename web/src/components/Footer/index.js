import styles from "./Footer.module.css";
import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={styles.footer} id="footer">
            <div className={styles.contentWrapper}>
                <div className={styles.leftBox}>
                    <Link href="/" className={styles.logo}>
                        <h1>NEOBYTE</h1>
                    </Link>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.topRow}>
                        <div className={styles.centerContent}>
                            <span className={styles.sac} id="numeroAtendimento">SAC: 3888-8899</span>
                            <Link href="/" className={styles.link}>Sobre nós</Link>
                        </div>
                        <div className={styles.icons}>
                            <Image src="/Neobyte/facebook.svg" alt="Facebook" width={26} height={26} />
                            <Image src="/Neobyte/instagram.svg" alt="Instagram" width={26} height={26} />
                            <Image src="/Neobyte/twitter.svg" alt="Twitter" width={26} height={26} />
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.copy}>
                        © 2025 Todos os direitos garantidos por Neobyte
                    </div>
                </div>
            </div>
        </footer>
    );
}
