import styles from "./Hardware.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";


export default function Hardware() {
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
          <h2 className={styles.titleHome}>Hardware</h2>

          <div className={styles.gridCards}>
            <Card
              nomeProduto="Fonte MSI MAG A650BN, 650W, 80 Plus Bronze, PFC Ativo, Com Cabo, Preto"
              imagemProd="/ImgProdutos/fonte1.svg"
              preco="319.99"
            />
            <Card
              nomeProduto="Memória RAM Kingston Fury Beast, 8GB, 3200MHz, DDR4, CL16, Preto"
              imagemProd="/ImgProdutos/ram1.svg"
              preco="154.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo2.svg"
              desconto="1894.99"
              preco="1599.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placamae1.svg"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Processador AMD Ryzen 7 9800X3D, Cache 8MB, 8 Núcleos, 16 Threads, AM5"
              imagemProd="/ImgProdutos/processador2.svg"
              desconto="4111.10"
              preco="2849.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo4.svg"
              desconto="1888.88"
              preco="1599.99"
            />
            <Card
              nomeProduto="SSD Kingston NV3, 1 TB, M.2 2280, PCIe 4.0 x4, NVMe, Leitura: 6000 MB/s, Gravação: 4000 MB/s, Azul"
              imagemProd="/ImgProdutos/ssd1.svg"
              desconto="666.66"
              preco="444.99"
            />
            <Card
              nomeProduto="Fonte Gamer Redragon RGPS, 400W, 80 Plus White, PFC Ativo, Sem Cabo, Preto"
              imagemProd="/ImgProdutos/fonte2.svg"
              preco="224.21"
            />
            <Card
              nomeProduto="Processador AMD Ryzen 5 5500, 3.6GHz (4.2GHz Max Turbo), Cache 19MB, AM4, Sem Vídeo"
              imagemProd="/ImgProdutos/processador1.svg"
              desconto="1086.95"
              preco="549.99"
            />
            <Card
              nomeProduto="Placa de Vídeo ASRock RX 6400 CLI 4G AMD Radeon, 4GB, GDDR6, DirectX 12 Ultimate, RDNA 2"
              imagemProd="/ImgProdutos/placadevideo6.svg"
              desconto="1152.21"
              preco="999.99"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}