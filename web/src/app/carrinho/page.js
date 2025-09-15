import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

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

      <section>
        <Footer />
      </section>
    </div>
  );
}
