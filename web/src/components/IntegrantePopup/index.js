"use client";

import React from 'react';
import styles from './IntegrantePopup.module.css';

export default function IntegrantePopup({ integrante, onClose }) {
    if (!integrante) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.content}>
                    <img src={integrante.imagem} alt={integrante.nome} className={styles.foto} />
                    <h2>{integrante.nome}</h2>
                    <h3 className={styles.funcao}>{integrante.funcao}</h3>
                    <p className={styles.descricao}>{integrante.descricao}</p>
                    <a href={`https://instagram.com/${integrante.instagram}`} 
                       className={styles.instaLink}
                       target="_blank"
                       rel="noopener noreferrer">
                        <img src="/Neobyte/instagram.svg" alt="Instagram" className={styles.instaIcon} />
                        <span>@{integrante.instagram}</span>
                    </a>
                </div>
            </div>
        </div>
    );
}