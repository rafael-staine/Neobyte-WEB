"use client";

import React from "react";
import Link from "next/link";
import styles from "./AuthPrompt.module.css";

export default function AuthPrompt({ open, onClose, message }) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Fechar">×</button>

        <div className={styles.content}>
          <h3>Você precisa entrar</h3>
          <p>{message || "Para continuar, faça login ou cadastre-se."}</p>

          <div className={styles.actions}>
            <Link href="/Entrar" className={styles.btnPrimary}>
              Entrar
            </Link>
            <Link href="/Cadastro" className={styles.btnSecondary}>
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
