"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SubHeader.module.css";

export default function SubHeader({ logo, title, hideMenu }) {
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.icons}>
                    {logo && <img src={logo} alt="logo" />}
                    <span className={styles.info}>{title}</span>
                </div>

                <Link href="/" className={styles.Voltar}>
                    <img src="/Neobyte/sair.svg" alt="Voltar" /> Voltar
                </Link>
            </header>

            {!hideMenu && <nav className={styles.menu}>
                <Link
                    href="/Perfil"
                    className={`${styles.tab} ${pathname === "/Perfil" ? styles.active : ""}`}
                >
                    Meus Dados
                </Link>
                <Link
                    href="/Favoritos"
                    className={`${styles.tab} ${pathname === "/Favoritos" ? styles.active : ""}`}
                >
                    Meus Favoritos
                </Link>
                <Link
                    href="/Carrinho"
                    className={`${styles.tab} ${pathname === "/Carrinho" ? styles.active : ""}`}
                >
                    Meu Carrinho
                </Link>
                <Link
                    href="/Pedido"
                    className={`${styles.tab} ${pathname === "/Pedido" ? styles.active : ""}`}
                >
                    Meus Pedidos
                </Link>
                <Link
                    href="/Endereco"
                    className={`${styles.tab} ${pathname === "/Endereco" ? styles.active : ""}`}
                >
                    Meus Endereços
                </Link>
            </nav>}
        </div>
    );
}
