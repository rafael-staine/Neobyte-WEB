import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Pedidos.module.css";

export default function Pedidos() {
  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/pedidos.svg" title="Pedidos" />

      <section>
        <div className={styles.container}>
          <ul className={styles.pedidos}>
            <li>
              <img src="./imgProdutos/placamae1.svg" alt="Placa mae" className={styles.imgCard} />
              <div className={styles.info}>
                <p>
                  Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto
                </p>
                <p>Quantidade: 1</p>
                <p>R$ 575,99</p>
                <p>Em processamento</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
