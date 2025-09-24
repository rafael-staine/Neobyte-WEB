import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Perfil.module.css";

export default function Cadastro() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader
          logo="/Neobyte/perfil.svg"
          title="Olá, Usuário"
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
