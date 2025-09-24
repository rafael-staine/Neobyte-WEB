import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Carrinho.module.css";

export default function Carrinho() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader
          logo="/Neobyte/carrinho.svg"
          title="Carrinho"
        />
      </section>

      <div className={styles.container}>
      
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
