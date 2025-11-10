"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Carrinho.module.css";
import { useEffect } from "react";

export default function Carrinho() {
  useEffect(async () => {
    const response = await fetch(`http://localhost:4000/cart/${user_id}`);
    console.log(response);
  }, []);

  const produtos = [
    {
      id: 1,
      img: "./ImgProdutos/placamae1.svg",
      nome: "Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto",
      preco: "1 x R$ 575,99",
    },
    // {
    //   id: 2,
    //   img: "/processador.png",
    //   nome: "Processador AMD Ryzen 5 5500, 3.6GHz (4.2GHz Max Turbo), Cache 19MB, AM4, Sem Vídeo",
    //   preco: "1 x R$ 549,99",
    // },
    // {
    //   id: 3,
    //   img: "/monitor.png",
    //   nome: 'Monitor Gamer Curvo MSI MAG 27" FHD, 280Hz, 0.5ms, VA, Adaptive-Sync, DP e HDMI, HDR, Preto',
    //   preco: "1 x R$ 1.999,99",
    // },
  ];

  return (
    <div>
      <section>
        <Header />
      </section>

      <section>
        <SubHeader logo="/Neobyte/carrinho.svg" title="Carrinho" />
      </section>

      <div className={styles.container}>
        <div className={styles.cartContainer}>
          <div className={styles.headerCard}>
            <span>Produtos</span>
            <span>Descrição</span>
            <span>Qtdd</span>
            <span>Preço à vista no PIX</span>
            <span></span>
          </div>

          <ul className={styles.pedidos}>
            {produtos.map((item) => (
              <li key={item.id} className={styles.row}>
                <div className={styles.produto}>
                  <img src={item.img} alt={item.nome} />
                </div>
                <div className={styles.descricao}>
                  <p>{item.nome}</p>
                </div>
                <div className={styles.quantidade}>
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <div className={styles.preco}>
                  <p>{item.preco}</p>
                  <small>à vista no PIX</small>
                </div>
                <div className={styles.acao}>
                  <button className={styles.lixeiraBtn}>
                    <img src="/Neobyte/lixeira-vermelha.svg" alt="Lixeira" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.cupomContainer}>
            <div className={styles.cupomInput}>
              <label>Frete</label>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Cep:" />
                <button>Aplicar</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.resumo}>
          <h2>Resumo</h2>
          <div className={styles.valores}>
            <div className={styles.linha}>
              <span>Subtotal</span>
              <span>R$ 579,99</span>
            </div>

            <div className={styles.linha}>
              <span>Total</span>
              <span>R$ 579,99</span>
            </div>

            <div className={styles.pixInfo}>
              <span>R$ 579,99</span>
              <small>À vista no pix com 10% de desconto</small>
              <small>ou</small>
              <small>até 10x de R$ 57,60</small>
            </div>
          </div>

          <button className={styles.comprar}>
            <img src="/Neobyte/sacola.svg" alt="Comprar" />
            Comprar
          </button>

          <button className={styles.limpar}>
            <img src="/Neobyte/lixeira-branca.svg" alt="Lixeira" />
            Limpar carrinho
          </button>
        </div>
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
