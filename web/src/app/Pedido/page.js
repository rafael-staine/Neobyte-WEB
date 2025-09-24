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

      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
