import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Endereco.module.css";

export default function Endereco() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader
          logo="/Neobyte/endereco.svg"
          title="Endereços"
        />
      </section>

      <div className={styles.container}>

        <div className={styles.containerEnderecos}>
          <div className={styles.enderecos}>
            <h2>Minha casa</h2>
            <p>Rua Oceano Pacifico</p>
            <p>Número 000, Indaia</p>
            <p>CEP: 01234-567, Caraguatatuba</p>
          </div>

          <div className={styles.enderecos}>
            <h2>Trabalho</h2>
            <p>Rua Oceano Pacifico</p>
            <p>Número 000, Indaia</p>
            <p>CEP: 01234-567, Caraguatatuba</p>
          </div>

          <div className={styles.enderecos}>
            <h2>Loja Neobyte</h2>
            <p>Rua Oceano Pacifico</p>
            <p>Número 000, Indaia</p>
            <p>CEP: 01234-567, Caraguatatuba</p>
          </div>
        </div>

      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
