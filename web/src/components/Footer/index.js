import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.contentWrapper}>
                <div className={styles.leftBox}>
                    <div className={styles.logo}>
                        <h1>NEOBYTE</h1>
                    </div>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.topRow}>
                        <div className={styles.centerContent}>
                            <span className={styles.sac}>SAC: 3888-8899</span>
                            <a href="/" className={styles.link}>Sobre nós</a>
                        </div>
                        <div className={styles.icons}>
                            <img src="/Neobyte/facebook.svg" alt="Facebook" />
                            <img src="/Neobyte/instagram.svg" alt="Instagram" />
                            <img src="/Neobyte/twitter.svg" alt="Twitter" />
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
