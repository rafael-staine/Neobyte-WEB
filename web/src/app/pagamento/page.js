import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>

      <section>
        <SubHeader 
          logo="/Neobyte/carrinho.svg"
          title="Metodos de Pagamento"
        />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
