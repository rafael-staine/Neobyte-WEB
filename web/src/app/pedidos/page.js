import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export default function Home() {
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

      <section>
        <Footer />
      </section>
    </div>
  );
}
