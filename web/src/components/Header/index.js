"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <h1>NEOBYTE</h1>
          </Link>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Pesquise aqui..." />
          <button>
            <Image src="/Neobyte/pesquisa.svg" alt="Buscar" width={26} height={26} />
          </button>
        </div>

        <div className={styles.icons}>
          <Link href="/Perfil">
            <Image src="/Neobyte/perfil.svg" alt="Perfil" width={26} height={26} />
          </Link>
          <Link href="/Favoritos">
            <Image src="/Neobyte/favorito.svg" alt="Favorito" width={26} height={26} />
          </Link>
          <Link href="/Carrinho">
            <Image src="/Neobyte/carrinho.svg" alt="Carrinho" width={26} height={26} />
          </Link>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.departamentos} ${open ? styles.departamentosOpen : ""
              }`}
            onClick={() => setOpen(!open)}
          >
            <Image src="/Neobyte/navegação.svg" alt="Menu" width={26} height={26} />
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
        <div className={styles.headerBtnS}>
          <Link href="/" className={styles.headerBtn}>PROMOÇÕES</Link>
          <Link href="/" className={styles.headerBtn}>HARDWARE</Link>
          <Link href="/" className={styles.headerBtn}>GAMER</Link>
          <Link href="/" className={styles.headerBtn}>ATENDIMENTO</Link>
        </div>
      </nav>
    </header>
  );
}