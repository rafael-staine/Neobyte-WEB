import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Favoritos.module.css";
import Card from "@/components/Card";
import Link from "next/link";

export default function Favoritos() {
  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/favorito.svg" title="Favoritos" />
      <section>
        <div className={styles.cardsContainer}>
          <Link href="/ProdutoPlacaMae" className={styles.linkCard}>
              <Card
                nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
                imagemProd="/ImgProdutos/placamae1.svg"
                desconto="788.22"
                preco="575.99"
              />
            </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
