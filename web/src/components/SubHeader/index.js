"use client"; // precisa porque usamos hook do Next

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SubHeader.module.css";
import Image from "next/image";

export default function SubHeader({ logo, title }) {
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.icons}>
                    <Image src={logo} alt="logo" width={26} height={26} />
                    <span className={styles.info}>{title}</span>
                </div>

                <Link href="/" className={styles.sair}>
                    <Image src="/Neobyte/sair.svg" alt="Sair" width={26} height={26} /> Sair
                </Link>
            </header>

            <nav className={styles.menu}>
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
                    href="/Pedidos"
                    className={`${styles.tab} ${pathname === "/Pedidos" ? styles.active : ""}`}
                >
                    Meus Pedidos
                </Link>
                <Link
                    href="/Endereco"
                    className={`${styles.tab} ${pathname === "/Endereco" ? styles.active : ""}`}
                >
                    Meus Endereços
                </Link>
            </nav>
        </div>
    );
}
