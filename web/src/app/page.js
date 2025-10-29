import styles from "./page.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home() {
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
          <h2 className={styles.titleHome}>Mais Vendidos</h2>

          <div className={styles.gridCards1}>
            <Link href="/ProdutoPlacaMae" className={styles.linkCard}>
              <Card
                nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
                imagemProd="/ImgProdutos/placamae1.svg"
                desconto="788.22"
                preco="575.99"
              />
            </Link>
            <Card
              nomeProduto="Headset Gamer Havit, Drivers 53mm, Microfone Plugável, 3.5mm, PC, PS4, XBOX ONE, Preto"
              imagemProd="/ImgProdutos/headset1.svg"
              desconto="237.64"
              preco="169.99"
            />
            <Card
              nomeProduto="Memória RAM Kingston Fury Beast, 8GB, 3200MHz, DDR4, CL16, Preto"
              imagemProd="/ImgProdutos/ram1.svg"
              preco="154.99"
            />
            <Card
              nomeProduto="Processador AMD Ryzen 5 5500, 3.6GHz (4.2GHz Max Turbo), Cache 19MB, AM4, Sem Vídeo"
              imagemProd="/ImgProdutos/processador1.svg"
              desconto="1086.95"
              preco="549.99"
            />
            <Card
              nomeProduto="Fonte MSI MAG A650BN, 650W, 80 Plus Bronze, PFC Ativo, Com Cabo, Preto"
              imagemProd="/ImgProdutos/fonte1.svg"
              preco="319.99"
            />
            <Card
              nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
              imagemProd="/ImgProdutos/placadevideo2.svg"
              desconto="1894.99"
              preco="1599.99"
            />
            <Card
              nomeProduto="Controle Sony DualSense PS5, Sem Fio, Midnight Black"
              imagemProd="/ImgProdutos/controle1.svg"
              desconto="499.00"
              preco="398.97"
            />
            <Card
              nomeProduto="SSD Kingston NV3, 1 TB, M.2 2280, PCIe 4.0 x4, NVMe, Leitura: 6000 MB/s, Gravação: 4000 MB/s, Azul"
              imagemProd="/ImgProdutos/ssd1.svg"
              desconto="666.66"
              preco="444.99"
            />
            <Card
              nomeProduto="Kit Com 3 Ventoinhas Rise Mode Laser, 120mm, ARGB, Preto"
              imagemProd="/ImgProdutos/fan2.svg"
              preco="81.99"
            />
            <Card
              nomeProduto="Gabinete Gamer Rise Mode Galaxy Glass M Mini, M-ATX, Lateral e Frontal em Vidro Temperado, Preto"
              imagemProd="/ImgProdutos/gabinete1.svg"
              desconto="352.93"
              preco="209.99"
            />
          </div>

          <h2 className={styles.titleHome}>Acabaram de Chegar</h2>

          <div className={styles.gridCards2}>
            <Card
              nomeProduto="Placa de Vídeo RTX 5090 AORUS MASTER ICE 32G Gigabyte NVIDIA GeForce, 32GB GDDR7, 512bits, RGB, DLSS, Ray Tracing"
              imagemProd="/ImgProdutos/placadevideo.svg"
              desconto="23333.22"
              preco="19679.99"
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
              nomeProduto="Kit com 3 Ventoinhas Rise Mode X, 120mm, Led ARGB, Branco"
              imagemProd="/ImgProdutos/fan1.svg"
              preco="43.99"
            />
            <Card
              nomeProduto="Monitor Gamer Curvo MSI MAG 27 FHD, 280Hz, 0.5ms, VA, Adaptive-Sync, DP e HDMI, HDR, Preto"
              imagemProd="/ImgProdutos/monitor1.svg"
              preco="1999.99"
            />
            <Card
              nomeProduto="Processador AMD Ryzen 7 9800X3D, Cache 8MB, 8 Núcleos, 16 Threads, AM5"
              imagemProd="/ImgProdutos/processador2.svg"
              desconto="4111.10"
              preco="2849.99"
            />
            <Card
              nomeProduto="SSD Rise Mode Gamer M.2 Zeus Series Pro 512GB M.2, NVMe, Gen4, Leitura 7000MB/s e Gravação 5200MB/s"
              imagemProd="/ImgProdutos/ssd2.svg"
              preco="354.99"
            />
            <Card
              nomeProduto="Fonte Gamer Redragon RGPS, 400W, 80 Plus White, PFC Ativo, Sem Cabo, Preto"
              imagemProd="/ImgProdutos/fonte2.svg"
              preco="224.21"
            />
            <Card
              nomeProduto="Mousepad Maxprint, Pequeno, 220x178mm, Preto"
              imagemProd="/ImgProdutos/mousepad1.svg"
              preco="9.99"
            />
            <Card
              nomeProduto="Headset Gamer Sem Fio Logitech G435, Lightspeed e Bluetooth, Dolby Atmos, USB, PC, PS4, PS5, Mobile, Drivers 40mm, Azul"
              imagemProd="/ImgProdutos/headset2.svg"
              preco="599.99"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}