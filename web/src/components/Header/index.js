"use client";

import React, { useState } from "react";
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
          <img src="/Neobyte/perfil.svg" alt="Perfil" />
          <img src="/Neobyte/favorito.svg" alt="Favorito" />
          <img src="/Neobyte/carrinho.svg" alt="Carrinho" />
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.dropdown}>
          <button
            type="button"
            className={`${styles.departamentos} ${open ? styles.departamentosOpen : ""}`}
            onClick={() => setOpen(!open)}
          >
            <img src="/Neobyte/navegação.svg" alt="Menu" />
            DEPARTAMENTOS
          </button>

          {open && (
            <div className={styles.dropdownMenu}>
              <a href="#">Placa de Vídeo</a>
              <a href="#">Placa Mãe</a>
              <a href="#">Processadores</a>
              <a href="#">Memória RAM</a>
              <a href="#">SSD/HD</a>
              <a href="#">Monitores</a>
              <a href="#">Gabinetes</a>
              <a href="#">Headeset</a>
              <a href="#">Teclados</a>
              <a href="#">Mouses</a>
              <a href="#">Cadeiras</a>
            </div>
          )}
        </div>

        <a href="#">PROMOÇÕES</a>
        <a href="#">HARDWARE</a>
        <a href="#">GAMER</a>
        <a href="#">ATENDIMENTO</a>
      </nav>
    </header>
  );
}
