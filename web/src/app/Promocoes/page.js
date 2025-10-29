import styles from "./Promocoes.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";


export default function Promocoes() {
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
          <h2 className={styles.titleHome}>Promoções</h2>

          <div className={styles.gridCards}>
            <Card
              nomeProduto="Placa de Vídeo XFX AMD RADEON RX 7600 Gaming Graphics Card, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo1.svg"
              desconto="2352.93"
              preco="1699.99"
            />
            <Card
              nomeProduto="Headset Gamer Havit, Drivers 53mm, Microfone Plugável, 3.5mm, PC, PS4, XBOX ONE, Preto"
              imagemProd="/ImgProdutos/headset1.svg"
              desconto="237.64"
              preco="169.99"
            />
            <Card
              nomeProduto="Mouse Gamer Sem Fio Logitech G305 LIGHTSPEED, 12000 DPI, 6 Botões, Preto"
              imagemProd="/ImgProdutos/mouse1.svg"
              desconto="505.87"
              preco="243.99"
            />
            <Card
              nomeProduto="Controle Sony DualSense PS5, Sem Fio, Midnight Black"
              imagemProd="/ImgProdutos/controle1.svg"
              desconto="499.00"
              preco="398.97"
            />
            <Card
              nomeProduto="Processador AMD Ryzen 5 5500, 3.6GHz (4.2GHz Max Turbo), Cache 19MB, AM4, Sem Vídeo"
              imagemProd="/ImgProdutos/processador1.svg"
              desconto="1086.95"
              preco="549.99"
            />
            <Card
              nomeProduto="Teclado Mecânico Gamer Redragon Kumara, Anti-Ghosting, RGB, Switch Outemu Blue, ABNT2, Branco"
              imagemProd="/ImgProdutos/teclado1.svg"
              desconto="322.90"
              preco="219.99"
            />
            <Card
              nomeProduto="SSD Kingston NV3, 1 TB, M.2 2280, PCIe 4.0 x4, NVMe, Leitura: 6000 MB/s, Gravação: 4000 MB/s, Azul"
              imagemProd="/ImgProdutos/ssd1.svg"
              desconto="666.66"
              preco="444.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 7600 Challenger ASRock AMD Radeon, 8GB GDDR6"
              imagemProd="/ImgProdutos/placadevideo5.svg"
              desconto="2176.46"
              preco="1799.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placamae1.svg"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Gabinete Gamer Rise Mode Wave White, Mid Tower, Lateral em Vidro Fumê, ARGB, ATX, 3 Cooler Fan ARGB, Branco"
              imagemProd="/ImgProdutos/gabinete2.svg"
              desconto="352.93"
              preco="199.99"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}