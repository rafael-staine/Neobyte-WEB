import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Favoritos.module.css";

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

      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
