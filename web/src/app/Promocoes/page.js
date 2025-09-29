import styles from "./Promocoes.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Produtos from "@/components/Produtos";
import Footer from "@/components/Footer";


export default function Promocoes() {
  return (
    <>
      <Head>
        <title>Neobyte</title>
        <meta name="description" content="O melhor e-commerce tecnológico do mercado" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <section>
        <Banner/>
        <h2 className={styles.titleHome}>Promoções</h2>
        <Produtos/>
        <Produtos/>
      </section>
      <Footer/>
    </>
  );
}