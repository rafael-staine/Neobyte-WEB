import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Pedidos.module.css";

export default function Pedidos() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader
          logo="/Neobyte/pedidos.svg"
          title="Pedidos"
        />
      </section>

      <div className={styles.container}>
        <ul className={styles.pedidos}>
          <li>
            <img src="/gabinete.png" alt="Gabinete Gamer" />
            <div className={styles.info}>
              <p>Gabinete Gamer Rise Mode Galaxy Glass M Mini, M-ATX, Lateral e Frontal em Vidro Temperado, Preto</p>
              <p>Quantidade: 1</p>
              <p>R$209,99</p>
              <p>Em processamento</p> 
            </div>
          </li>
        </ul>
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
