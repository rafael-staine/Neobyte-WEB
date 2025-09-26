import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Favoritos.module.css";
import Card from "@/components/Card";

export default function Favoritos() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader
          logo="/Neobyte/favorito.svg"
          title="Favoritos"
        />
      </section>

      <div className={styles.container}>
        <Card
          nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
          imagemProd="/ImgProdutos/placa-mae.png"
          desconto="788.22"
          preco="575.99"
        />
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
