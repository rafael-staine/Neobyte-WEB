"use client";

import Footer from "@/components/Footer";
import styles from "./Pagamento.module.css";
import Link from "next/link";

export default function Pagamento() {
  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icons}>
            <img src="/Neobyte/Pagamento.svg" alt="logo" />
            <span className={styles.info}>Métodos de Pagamento</span>
          </div>

          <Link href="/" className={styles.sair}>
            <img src="/Neobyte/sair.svg" alt="Sair" /> Sair
          </Link>
        </header>

        <div className={styles.containerPagamento}>
          <h2 className={styles.title}>ESCOLHA O MÉTODO DE PAGAMENTO</h2>

          <div className={styles.containerMetodos}>
            <label className={styles.metodos}>
              <input type="radio" name="metodo" />
              <img src="/Neobyte/pix.svg" alt="PIX" />
              <span>PIX</span>
            </label>

            <label className={styles.metodos}>
              <input type="radio" name="metodo" />
              <img src="/Neobyte/cartao.svg" alt="Cartão de Crédito" />
              <span>Cartão de Crédito</span>
            </label>

            <label className={styles.metodos}>
              <input type="radio" name="metodo" />
              <img src="/Neobyte/boleto.svg" alt="Boleto Flash" />
              <span>Boleto Flash</span>
            </label>

          </div>

          <div className={styles.containerTotal}>
            <p>Total: <strong>R$ 575,99</strong></p>
            <p className={styles.desconto}>Desconto: R$ 00,00</p>
          </div>

          <button className={styles.button}>Confirmar Pedido</button>
        </div>
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}