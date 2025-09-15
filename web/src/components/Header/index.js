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
          <h1>NEOBYTE</h1>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Pesquise aqui..." />
          <button>
            <img src="/Neobyte/pesquisa.svg" alt="Buscar" />
          </button>
        </div>

        <div className={styles.icons}>
          <Link href="/Cadastro">
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
            className={`${styles.departamentos} ${
              open ? styles.departamentosOpen : ""
            }`}
            onClick={() => setOpen(!open)}
          >
            <img src="/Neobyte/navegação.svg" alt="Menu" />
            DEPARTAMENTOS
          </button>

          {open && (
            <div className={styles.dropdownMenu}>
              <Link href="/placas-de-video">Placa de Vídeo</Link>
              <Link href="/placas-mae">Placa Mãe</Link>
              <Link href="/processadores">Processadores</Link>
              <Link href="/memoria-ram">Memória RAM</Link>
              <Link href="/armazenamento">SSD/HD</Link>
              <Link href="/monitores">Monitores</Link>
              <Link href="/gabinetes">Gabinetes</Link>
              <Link href="/headsets">Headset</Link>
              <Link href="/teclados">Teclados</Link>
              <Link href="/mouses">Mouses</Link>
              <Link href="/cadeiras">Cadeiras</Link>
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
