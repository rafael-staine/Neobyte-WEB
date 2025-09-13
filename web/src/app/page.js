import styles from "./page.module.css";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <Banner />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
