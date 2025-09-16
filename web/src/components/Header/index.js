"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <h1>NEOBYTE</h1>
          </a>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Pesquise aqui..." />
          <button>
            <img src="/Neobyte/pesquisa.svg" alt="Buscar" />
          </button>
        </div>

        <div className={styles.icons}>
          <Link href="/Perfil">
            <img src="/Neobyte/perfil.svg" alt="Perfil" />
          </Link>
          <Link href="/Favoritos">
            <img src="/Neobyte/favorito.svg" alt="Favorito" />
          </Link>
          <Link href="/Carrinho">
            <img src="/Neobyte/carrinho.svg" alt="Carrinho" />
          </Link>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.dropdown}>
          <button
            type="button"
            className={`${styles.departamentos} ${open ? styles.departamentosOpen : ""
              }`}
            onClick={() => setOpen(!open)}
          >
            <img src="/Neobyte/navegação.svg" alt="Menu" />
            DEPARTAMENTOS
          </button>

          {open && (
            <div className={styles.dropdownMenu}>
              <Link href="/">Placa de Vídeo</Link>
              <Link href="/">Placa Mãe</Link>
              <Link href="/">Processadores</Link>
              <Link href="/">Memória RAM</Link>
              <Link href="/">SSD/HD</Link>
              <Link href="/">Monitores</Link>
              <Link href="/">Gabinetes</Link>
              <Link href="/">Headset</Link>
              <Link href="/">Teclados</Link>
              <Link href="/">Mouses</Link>
              <Link href="/">Cadeiras</Link>
            </div>
          )}
        </div>

        <Link href="/">PROMOÇÕES</Link>
        <Link href="/">HARDWARE</Link>
        <Link href="/">GAMER</Link>
        <Link href="/">ATENDIMENTO</Link>
      </nav>
    </header>
  );
}
