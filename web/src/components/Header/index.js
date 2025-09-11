import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <h1>NEOBYTE</h1>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Pesquise aqui..." />
          <button>
            <img src="/buscar.svg" alt="Buscar" />
          </button>
        </div>

        <div className={styles.icons}>
          <img src="/Neobyte/perfil.svg" alt="Perfil" />
          <img src="/Neobyte/favorito.svg" alt="Favorito" />
          <img src="/Neobyte/carrinho.svg" alt="Carrinho" />
        </div>
      </div>

      <nav className={styles.nav}>
        <button className={styles.departamentos}>
          <img src="/menu.svg" alt="Menu" />
          DEPARTAMENTOS
        </button>
        <a href="#">PROMOÇÕES</a>
        <a href="#">HARDWARE</a>
        <a href="#">GAMER</a>
        <a href="#">ATENDIMENTO</a>
      </nav>
    </header>
  );
}
