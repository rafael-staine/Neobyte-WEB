import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export default function Favoritos() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader 
          logo="/Neobyte/carrinho.svg"
          title="Escolha o Metodos de Pagamento"
        />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
