import Link from "next/link";
import styles from "./SubHeader.module.css";

export default function SubHeader({ logo, title }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.icons}>
                    <img src={logo} alt="logo" />
                    <span className={styles.info}>{title}</span>
                </div>

                <Link href="/" className={styles.sair}>
                    <img src="/Neobyte/sair.svg" alt="Sair" /> Sair
                </Link>
            </header>

            <nav className={styles.menu}>
                <Link href="/Cadastro" className={`${styles.tab} ${styles.active}`}>
                    Meu Cadastro
                </Link>
                <Link href="/Pedidos" className={styles.tab}>
                    Meus Pedidos
                </Link>
                <Link href="/Endereco" className={styles.tab}>
                    Meus Endereços
                </Link>
                <Link href="/Favoritos" className={styles.tab}>
                    Meus Favoritos
                </Link>
            </nav>
        </div>
    );
}



