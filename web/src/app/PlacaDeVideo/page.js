import styles from "./PlacaDeVideo.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";


export default function PlacaDeVideo() {
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
          <h2 className={styles.titleHome}>Placa de Video</h2>

          <div className={styles.gridCards}>
            <Card
              nomeProduto="Placa de Vídeo XFX AMD RADEON RX 7600 Gaming Graphics Card, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo1.svg"
              desconto="2352.93"
              preco="1699.99"
            />
            <Card
              nomeProduto="Placa de Vídeo MSI RTX 5060 Ti 16G VENTUS 2X OC PLUS NVIDIA GeForce, 16GB GDDR7, 2617 MHz, FP4 and DLSS 4, Ray Tracing"
              imagemProd="/ImgProdutos/placadevideo9.svg"
              desconto="4322.21"
              preco="3999.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo2.svg"
              desconto="1894.73"
              preco="1599.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RTX 3060 Ventus 2X 12G OC MSI GeForce, 12GB GDDR6, 15 Gbps, Ray Tracing"
              imagemProd="/ImgProdutos/placadevideo10.svg"
              desconto="2294.11"
              preco="1999.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6, 128bits, RGB"
              imagemProd="/ImgProdutos/placadevideo3.svg"
              desconto="2352.93"
              preco="1769.99"
            />
            <Card
              nomeProduto="Placa de Vídeo Gigabyte RTX 3050 Windforce OC NVIDIA GeForce, 6GB, GDDR6, DLSS, Ray Tracing"
              imagemProd="/ImgProdutos/placadevideo11.svg"
              desconto="1722.21"
              preco="1599.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo4.svg"
              desconto="1888.88"
              preco="1599.99"
            />
            <Card
              nomeProduto="Placa de Vídeo ASUS TUF RTX 5060 TI OC 16G GAMING NVIDIA Geforce, 16GB, GDDR7, OpenGL 4.6, Triple Fan, DLSS 4"
              imagemProd="/ImgProdutos/placadevideo12.svg"
              desconto="4222.21"
              preco="3999.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 7600 Challenger ASRock AMD Radeon, 8GB GDDR6"
              imagemProd="/ImgProdutos/placadevideo5.svg"
              desconto="2176.46"
              preco="1799.99"
            />
            <Card
              nomeProduto="Placa de Vídeo ASUS DUAL RTX 5060 O8G NVIDIA GeForce, 8GB GDDR7, 2565MHz, 128 bits, OpenGL 4.6, DLSS 4, Ray Tracing"
              imagemProd="/ImgProdutos/placadevideo13.svg"
              preco="2499.99"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}