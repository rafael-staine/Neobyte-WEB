"use client";

import React from 'react';
import styles from './SobreNos.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubHeader from '@/components/SubHeader';

export default function SobreNos() {
    return (
        <>
            <Header hideUserMenu={true} />
            <SubHeader logo="/logo/logo-verde.svg" title="Sobre Nós" />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.leftSection}>
                            <h2>Integrantes</h2>
                            <div className={styles.teamGrid}>
                                <div className={styles.teamMember}>
                                    <img src="/Neobyte/" alt="Weslley Souza" className={styles.memberImage} />
                                    <span>Weslley Souza</span>
                                </div>
                                <div className={styles.teamMember}>
                                    <img src="/Neobyte/" alt="Rafael Staine" className={styles.memberImage} />
                                    <span>Rafael Staine</span>
                                </div>
                                <div className={styles.teamMember}>
                                    <img src="/Neobyte/" alt="Matheus Bugatti" className={styles.memberImage} />
                                    <span>Matheus Bugatti</span>
                                </div>
                                <div className={styles.teamMember}>
                                    <img src="/Neobyte/" alt="Daniel Custodio" className={styles.memberImage} />
                                    <span>Daniel Custodio</span>
                                </div>
                                <div className={styles.teamMember}>
                                    <img src="/Neobyte/" alt="Cássio Jhonatan" className={styles.memberImage} />
                                    <span>Cássio Jhonatan</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightSection}>
                            <h2>NEOBYTE</h2>
                            <div className={styles.description}>
                                <p>
                                    A Neobyte é uma loja online especializada em hardware, periféricos e tecnologia. Nosso objetivo é oferecer os melhores produtos para gamers, profissionais e entusiastas, sempre com preço justo, qualidade e confiança.
                                    Trabalhamos com as principais marcas do mercado e garantimos uma experiência de compra rápida, segura e prática, além de um atendimento que entende de verdade de tecnologia.
                                    Na Neobyte, você encontra tudo para montar seu setup, turbinar sua máquina e elevar sua performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}