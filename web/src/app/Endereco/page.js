import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

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

      <section>
        <Footer />
      </section>
    </div>
  );
}
