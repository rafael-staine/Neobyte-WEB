"use client";

import React, { useState } from 'react';
import styles from './SobreNos.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubHeader from '@/components/SubHeader';
import IntegrantePopup from '@/components/IntegrantePopup';

export default function SobreNos() {
    const [selectedIntegrante, setSelectedIntegrante] = useState(null);
    console.log('Estado selectedIntegrante:', selectedIntegrante);

    const handleIntegranteClick = (integrante) => {
        console.log('Clicou no integrante:', integrante);
        setSelectedIntegrante(integrante);
    };

    const integrantes = [
        {
            nome: "Weslley Souza",
            imagem: "https://suap.ifsp.edu.br/media/alunos/fotos/2024/ASlVdQk-WukwzGgdzje__ovnR_AbLfUqKkk1jjUHB_o.jpg",
            funcao: "Front-end Developer",
            descricao: "Especialista em React e Next.js, responsável pela interface e experiência do usuário na Neobyte.",
            instagram: "weessouza"
        },
        {
            nome: "Rafael Staine",
            imagem: "https://suap.ifsp.edu.br/media/alunos/fotos/2024/7zazMk1aqh3R00FO2ldkqTRzCJy8drUgfYjpw_esi68.jpg",
            funcao: "Front-end Developer",
            descricao: "Desenvolvedor front-end com foco em React, CSS e usabilidade, garantindo interfaces modernas e responsivas.",
            instagram: "rafael_staine00"
        },
        {
            nome: "Matheus Bugatti",
            imagem: "https://suap.ifsp.edu.br/media/alunos/fotos/2024/K7qd5hF2mRanvo3BBiwdFBIubX1r6zCN1iGSVQNIGrY.jpg",
            funcao: "Full-stack Developer",
            descricao: "Desenvolvedor versátil, atuando tanto no front-end quanto no back-end do projeto com integração completa.",
            instagram: "@boga.lol"
        },
        {
            nome: "Daniel Custodio",
            imagem: "https://suap.ifsp.edu.br/media/alunos/fotos/2024/qq7G7GVhqFnznNBiASP06poLXPQyXbDyj2k331ft2Bc.jpg",
            funcao: "Full-stack Developer",
            descricao: "Profissional com foco em desenvolvimento completo, unindo lógica de negócio e experiência do usuário.",
            instagram: "dandan_do_21"
        },
        {
            nome: "Cássio Jhonatan",
            imagem: "https://suap.ifsp.edu.br/media/alunos/fotos/2024/JJ5pgdmwTRILkK4ymvwY0rJDFtY9nq4ipG-oElLucKE.jpg",
            funcao: "Front-end Developer",
            descricao: "Desenvolvedor front-end responsável por criar interfaces dinâmicas e garantir a performance visual do sistema.",
            instagram: "ce_jota0"
        }
    ];

    return (
        <>
            <Header hideUserMenu={true} />
            <SubHeader title="Sobre Nós" hideMenu={true} />

            <div className={styles.NeobyteLogos}>
                <img src="/logo/logo-branca.svg" alt="Neobyte Logo" className={styles.logo} />
                <img src="/logo/text-branco.svg" alt="Neobyte Text" className={styles.text} />
            </div>

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.content}>

                        <div className={styles.leftSection}>
                            <h2>Integrantes</h2>
                            <div className={styles.integrContainer}>

                                {/* Weslley */}
                                <div className={styles.integrante}>
                                    <img
                                        src="/Integrantes/weslley.svg"
                                        alt="Weslley Souza"
                                        className={styles.imgIntegrante}
                                        onClick={() => handleIntegranteClick(integrantes[0])}
                                    />
                                    <span>Weslley Souza</span>
                                    <a
                                        href="https://instagram.com/weessouza"
                                        className={styles.instaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/Neobyte/instagram.svg" alt="Instagram" className={styles.instaIcon} />
                                        <span>@weessouza</span>
                                    </a>
                                </div>

                                {/* Rafael */}
                                <div className={styles.integrante}>
                                    <img
                                        src="/Integrantes/rafael.svg"
                                        alt="Rafael Staine"
                                        className={styles.imgIntegrante}
                                        onClick={() => handleIntegranteClick(integrantes[1])}
                                    />
                                    <span>Rafael Staine</span>
                                    <a
                                        href="https://instagram.com/rafael_staine00"
                                        className={styles.instaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/Neobyte/instagram.svg" alt="Instagram" className={styles.instaIcon} />
                                        <span>@rafael_staine00</span>
                                    </a>
                                </div>

                                {/* Matheus */}
                                <div className={styles.integrante}>
                                    <img
                                        src="/Integrantes/matheus.svg"
                                        alt="Matheus Bugatti"
                                        className={styles.imgIntegrante}
                                        onClick={() => handleIntegranteClick(integrantes[2])}
                                    />
                                    <span>Matheus Bugatti</span>
                                    <a
                                        href="https://instagram.com/teste"
                                        className={styles.instaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/Neobyte/instagram.svg" alt="Instagram" className={styles.instaIcon} />
                                        <span>@boga.lol</span>
                                    </a>
                                </div>

                                {/* Daniel */}
                                <div className={styles.integrante}>
                                    <img
                                        src="/Integrantes/daniel.svg"
                                        alt="Daniel Custodio"
                                        className={styles.imgIntegrante}
                                        onClick={() => handleIntegranteClick(integrantes[3])}
                                    />
                                    <span>Daniel Custodio</span>
                                    <a
                                        href="https://instagram.com/dandan_do_21"
                                        className={styles.instaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/Neobyte/instagram.svg" alt="Instagram" className={styles.instaIcon} />
                                        <span>@dandan_do_21</span>
                                    </a>
                                </div>

                                {/* Cássio */}
                                <div className={styles.integrante}>
                                    <img
                                        src="/Integrantes/cassio.svg"
                                        alt="Cássio Jhonatan"
                                        className={styles.imgIntegrante}
                                        onClick={() => handleIntegranteClick(integrantes[4])}
                                    />
                                    <span>Cássio Jhonatan</span>
                                    <a
                                        href="https://instagram.com/ce_jota0"
                                        className={styles.instaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/Neobyte/instagram.svg" alt="Instagram" className={styles.instaIcon} />
                                        <span>@ce_jota0</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightSection}>
                            <h2>NEOBYTE</h2>
                            <div className={styles.descricao}>
                                <p>
                                    A Neobyte é uma loja online especializada em hardware, periféricos e tecnologia.
                                    Nosso objetivo é oferecer os melhores produtos para gamers, profissionais e entusiastas,
                                    sempre com preço justo, qualidade e confiança. Trabalhamos com as principais marcas do mercado
                                    e garantimos uma experiência de compra rápida, segura e prática, além de um atendimento que entende
                                    de verdade de tecnologia. Na Neobyte, você encontra tudo para montar seu setup, turbinar sua máquina
                                    e elevar sua performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {selectedIntegrante && (
                <IntegrantePopup
                    integrante={selectedIntegrante}
                    onClose={() => setSelectedIntegrante(null)}
                />
            )}

            <Footer />
        </>
    );
}
