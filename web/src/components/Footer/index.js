import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.logo}>NEOBYTE</div>

                <div className={styles.links}>
                    <span className={styles.sac}>SAC: 3888-8899</span>
                    <a href="/sobre" className={styles.link}>
                        Sobre nós
                    </a>
                </div>

                <div className={styles.social}>
                    <img src="/Neobyte/facebook.svg" alt="Perfil" />
                    <img src="/Neobyte/instagram.svg" alt="Favorito" />
                    <img src="/Neobyte/twitter.svg" alt="Carrinho" />
                </div>
            </div>

            {/* Linha divisória */}
            <div className={styles.copy}>
                © 2025 Todos os direitos garantidos por Neobyte
            </div>
        </footer>
    );
}
