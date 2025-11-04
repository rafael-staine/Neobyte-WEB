import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer} id="footer">
            <div className={styles.contentWrapper}>
                <div className={styles.leftBox}>
                    <a href="/" className={styles.logo}>
                        <img src="/logo/logo-branca.svg" alt="Logo Neobyte" />
                        <h1>NEOBYTE</h1>
                    </a>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.topRow}>
                        <div className={styles.centerContent}>
                            <span className={styles.sac} id="numeroAtendimento">SAC: 3888-8899</span>
                            <a href="/" className={styles.link}>Sobre nós</a>
                        </div>
                        <div className={styles.icons}>
                            <a href="#">
                                <img src="/Neobyte/facebook.svg" alt="Facebook" />
                            </a>
                            <a href="#">
                                <img src="/Neobyte/instagram.svg" alt="Instagram" />
                            </a>
                            <a href="#">
                                <img src="/Neobyte/twitter.svg" alt="Twitter" />
                            </a>
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
