import styles from "./page.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Produtos from "@/components/Produtos";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

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
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
          </div>

          <h2 className={styles.titleHome}>Acabaram de Chegar</h2>

          <div className={styles.gridCards2}>
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
            <Card
              nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
              imagemProd="/ImgProdutos/placa-mae.png"
              desconto="788.22"
              preco="575.99"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}