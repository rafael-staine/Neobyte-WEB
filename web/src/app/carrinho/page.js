import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import Link from "next/link";

export default function Home() {
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
