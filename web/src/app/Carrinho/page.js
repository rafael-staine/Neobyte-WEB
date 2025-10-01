import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Carrinho.module.css";

export default function Carrinho() {
  /*
  const produtos = [
    {
      id: 1,
      img: "./imgProdutos/placamae1.svg",
      nome: "Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto",
      preco: "1 x R$ 575,99",
    },
    
    {
      id: 2,
      img: "/processador.png",
      nome: "Processador AMD Ryzen 5 5500, 3.6GHz (4.2GHz Max Turbo), Cache 19MB, AM4, Sem Vídeo",
      preco: "1 x R$ 549,99",
    },
    {
      id: 3,
      img: "/monitor.png",
      nome: 'Monitor Gamer Curvo MSI MAG 27" FHD, 280Hz, 0.5ms, VA, Adaptive-Sync, DP e HDMI, HDR, Preto',
      preco: "1 x R$ 1.999,99",
    },
  ];*/

  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/carrinho.svg" title="Carrinho" />

      <section>
        <div className={styles.container}>
          {/* Lista de Produtos */}
          <div className={styles.produtos}>
            <div className={styles.header}>
              <span>Produtos</span>
              <span>Descrição</span>
              <span>Qtdd</span>
              <span>Preço à vista no PIX</span>
            </div>
            {/* Item 1 */}
            <div className={styles.item}>
              {/* Imagem */}
              <img
                src="./imgProdutos/placamae1.svg"
                alt="Gabinete Gamer"
                className={styles.imgProduto}
              />

              {/* Título */}
              <p className={styles.nomeProduto}>
                Gabinete Gamer Rise Mode Galaxy Glass M Mini, M-ATX, Lateral e
                Frontal em Vidro Temperado, Preto
              </p>

              {/* Quantidade */}
              <div className={styles.qtd}>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              {/* Preço */}
              <p className={styles.preco}>R$ 575,99</p>

              {/* Lixeira */}
              <button className={styles.btnRemover}>
                <img src="./Neobyte/lixeira-vermelha.svg" alt="Remover" />
              </button>
            </div>

            {/* Frete */}
            <div className={styles.frete}>
              <p>Frete</p>
              <div className={styles.freteInput}>
                <input type="text" placeholder="Cep:" />
                <button>Aplicar</button>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className={styles.resumo}>
            <h2>Resumo</h2>
            <div className={styles.linha}>
              <span>Subtotal</span>
              <span>R$ 575,99</span>
            </div>
            <div className={styles.linha}>
              <span>Total</span>
              <span className={styles.total}>R$ 575,99</span>
            </div>
            <p className={styles.avista}>
              R$ 575,99 <br /> À vista no pix com 10% de desconto <br /> ou até
              10x de R$ 57,60
            </p>
            <div className={styles.btnsResumo}>
              <a href="/Pagamento">
                <button className={styles.btnComprar}>Comprar</button>
              </a>
              <button className={styles.btnLimpar}>Limpar carrinho</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

  /*return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/carrinho.svg" title="Carrinho" />

      <section>
        <div className={styles.container}>
          <div className={styles.header}>
            <span>Produtos</span>
            <span>Descrição</span>
            <span>Qtdd</span>
            <span>Preço à vista no PIX</span>
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
                </div>
                <div className={styles.iconeTrash}>
                  <img src="/Neobyte/lixeira-vermelha.svg" alt="Lixeira" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );*/
}
