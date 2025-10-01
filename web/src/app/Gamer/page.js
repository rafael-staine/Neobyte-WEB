import styles from "./Gamer.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";


export default function Gamer() {
  return (
    <>
      <Head>
        <title>Neobyte</title>
        <meta
          name="description"
          content="O melhor e-commerce tecnológico do mercado"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <Banner />

        <div className={styles.containerCards}>
          <h2 className={styles.titleHome}>Gamer</h2>

          <div className={styles.gridCards}>
            <Card
              nomeProduto="Headset Gamer Havit, Drivers 53mm, Microfone Plugável, 3.5mm, PC, PS4, XBOX ONE, Preto"
              imagemProd="/ImgProdutos/headset1.svg"
              desconto="237.64"
              preco="169.99"
            />
            <Card
              nomeProduto="Fonte Gamer Redragon RGPS, 400W, 80 Plus White, PFC Ativo, Sem Cabo, Preto"
              imagemProd="/ImgProdutos/fonte2.svg"
              preco="224.21"
            />
            <Card
              nomeProduto="Controle Sony DualSense PS5, Sem Fio, Midnight Black"
              imagemProd="/ImgProdutos/controle1.svg"
              desconto="499.00"
              preco="398.97"
            />
            <Card
              nomeProduto="SSD Rise Mode Gamer M.2 Zeus Series Pro 512GB M.2, NVMe, Gen4, Leitura 7000MB/s e Gravação 5200MB/s"
              imagemProd="/ImgProdutos/ssd2.svg"
              preco="354.99"
            />
            <Card
              nomeProduto="Gabinete Gamer Rise Mode Galaxy Glass M Mini, M-ATX, Lateral e Frontal em Vidro Temperado, Preto"
              imagemProd="/ImgProdutos/gabinete1.svg"
              desconto="352.93"
              preco="209.99"
            />
            <Card
              nomeProduto="Gabinete Gamer Rise Mode X4 Glass, Barra de LED ARGB, Lateral em Vidro Fumê, Preto"
              imagemProd="/ImgProdutos/gabinete3.svg"
              preco="179.99"
            />
            <Card
              nomeProduto="Teclado Mecânico Gamer Redragon Kumara, Anti-Ghosting, RGB, Switch Outemu Blue, ABNT2, Branco"
              imagemProd="/ImgProdutos/teclado1.svg"
              desconto="322.90"
              preco="219.99"
            />
            <Card
              nomeProduto="Mouse Gamer Sem Fio Logitech G305 LIGHTSPEED, 12000 DPI, 6 Botões, Preto"
              imagemProd="/ImgProdutos/mouse1.svg"
              desconto="505.87"
              preco="243.99"
            />
            <Card
              nomeProduto="Gabinete Gamer Rise Mode Wave White, Mid Tower, Lateral em Vidro Fumê, ARGB, ATX, 3 Cooler Fan ARGB, Branco"
              imagemProd="/ImgProdutos/gabinete2.svg"
              desconto="352.93"
              preco="199.99"
            />
            <Card
              nomeProduto="Teclado Mecânico Gamer Husky Anchorage Full Size, RGB, Switch Gateron EF Red, ABNT2, Preto"
              imagemProd="/ImgProdutos/teclado2.svg"
              desconto="263.05"
              preco="199.90"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}