"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import AuthPrompt from "@/components/AuthPrompt";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
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

  useEffect(() => {
    try {
      const isLogged = localStorage.getItem("neobyteLoggedIn") === "true";
      setLoggedIn(isLogged);
    } catch (err) {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "neobyteLoggedIn") {
        setLoggedIn(e.newValue === "true");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleRequireAuth(e) {
    e.preventDefault();
    setShowAuthPrompt(true);
  }

  const scrollToAtendimento = (e) => {
    e.preventDefault();
    const target = document.getElementById("numeroAtendimento");
    if (target) {
      // First, calculate the target position
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 50;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Duration in milliseconds
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth acceleration and deceleration
        const ease = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Add highlight effect after scrolling
          target.classList.add(styles.highlight);
          setTimeout(() => {
            target.classList.remove(styles.highlight);
          }, 1500);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <a href="/" className={styles.logoLink}>
            <img src="/logo/logo-branca.svg" alt="Logo Neobyte" />
              <h1>NEOBYTE</h1>
            </a>
          </div>

          <div className={styles.search}>
            <input type="text" placeholder="Pesquise aqui..." />
            <a href="/Pesquisa" className={styles.searchButton}>
              <img src="/Neobyte/pesquisa.svg" alt="Buscar" />
            </a>
          </div>

          <div className={styles.iconsArea}>
            {!loggedIn && (
              <div className={styles.loginArea}>
                <Link href="/Entrar" className={styles.loginLink}>
                  Entrar
                </Link>
                <span className={styles.divisor}>ou</span>
                <Link href="/Cadastro" className={styles.cadastrarLink}>
                  Cadastrar-se
                </Link>
              </div>
            )}

            <div className={styles.icons}>
              {loggedIn ? (
                <Link href="/Perfil">
                  <img src="/Neobyte/perfil.svg" alt="Perfil" />
                </Link>
              ) : (
                <a href="#" onClick={handleRequireAuth} aria-label="Abrir login">
                  <img src="/Neobyte/perfil.svg" alt="Perfil" />
                </a>
              )}

              {loggedIn ? (
                <>
                  <Link href="/Favoritos">
                    <img src="/Neobyte/favorito.svg" alt="Favorito" />
                  </Link>
                  <Link href="/Carrinho">
                    <img src="/Neobyte/carrinho.svg" alt="Carrinho" />
                  </Link>
                </>
              ) : (
                <>
                  <a href="#" onClick={handleRequireAuth} aria-label="Favoritos">
                    <img src="/Neobyte/favorito.svg" alt="Favorito" />
                  </a>
                  <a href="#" onClick={handleRequireAuth} aria-label="Carrinho">
                    <img src="/Neobyte/carrinho.svg" alt="Carrinho" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.dropdown} ref={dropdownRef}>
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
                <Link href="./PlacaDeVideo">Placa de Vídeo</Link>
                <Link href="./PlacaMae">Placa Mãe</Link>
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

          <div className={styles.mainLinks}>
            <Link href="./Promocoes">PROMOÇÕES</Link>
            <Link href="./Hardware">HARDWARE</Link>
            <Link href="./Gamer">GAMER</Link>
          </div>

          <a
            href="#footer"
            className={styles.mainLinks}
            onClick={scrollToAtendimento}
          >
            ATENDIMENTO
          </a>
        </nav>
      </header>
      <AuthPrompt open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
    </>
  );
}
