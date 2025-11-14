"use client";

    import { useEffect, useState } from "react";
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import SubHeader from "@/components/SubHeader";
    import styles from "./Carrinho.module.css";

    export default function Carrinho() {
      const [produtos, setProdutos] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const saved = localStorage.getItem('neobyteUser');
        if (!saved) {
          setProdutos([]);
          setLoading(false);
          return;
        }
        const user = JSON.parse(saved);

        (async () => {
          try {
            const resp = await fetch(`http://localhost:4000/cart/${user.id}`);
            if (!resp.ok) {
              console.error('Erro ao buscar carrinho', resp.status);
              setLoading(false);
              return;
            }

            const data = await resp.json();
            // data expected as array of carrinho entries
            setProdutos(data || data.produtoAdicionado || []);
            // backend returns an array directly under the response in controllers
            // getByUserIdCartController returns { carrinho: ... } or { produtoAdicionado }? conservatively check
            if (data.carrinho) setProdutos(data.carrinho);
            if (data.produtoAdicionado) setProdutos(data.produtoAdicionado);
            if (data.produtoAdicionado === undefined && data.carrinho === undefined && Array.isArray(data)) setProdutos(data);
            setLoading(false);
          } catch (err) {
            console.error('Erro ao buscar carrinho', err);
            setLoading(false);
          }
        })();
      }, []);

      const changeQuantity = async (produto_id, newQuantity) => {
        const saved = localStorage.getItem('neobyteUser');
        if (!saved) return;
        const user = JSON.parse(saved);

        try {
          const resp = await fetch('http://localhost:4000/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, produto_id, quantidade: newQuantity }),
          });

          if (!resp.ok) {
            console.error('Erro ao editar quantidade', resp.status);
            return;
          }

          // atualizar estado local
          setProdutos((prev) => prev.map((p) => {
            if (p.produto && p.produto.id === produto_id) {
              return { ...p, quantidade: newQuantity };
            }
            // caso a estrutura seja diferente
            if (p.produto_id === produto_id) {
              return { ...p, quantidade: newQuantity };
            }
            return p;
          }));
        } catch (err) {
          console.error('Erro ao editar quantidade', err);
        }
      };

      const handleRemove = async (produto_id) => {
        const saved = localStorage.getItem('neobyteUser');
        if (!saved) return;
        const user = JSON.parse(saved);

        try {
          const resp = await fetch('http://localhost:4000/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, produto_id }),
          });

          if (!resp.ok) {
            console.error('Erro ao remover do carrinho', resp.status);
            return;
          }

          setProdutos((prev) => prev.filter((p) => {
            const id = p.produto ? p.produto.id : p.produto_id || p.id;
            return id !== produto_id;
          }));
        } catch (err) {
          console.error('Erro ao remover do carrinho', err);
        }
      };

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
                {loading ? (
                  <p>Carregando...</p>
                ) : produtos.length === 0 ? (
                  <p>Seu carrinho está vazio.</p>
                ) : (
                  produtos.map((item) => {
                    const produto = item.produto || item;
                    const quantidade = item.quantidade || item.quantidade === 0 ? item.quantidade : 1;
                    const produtoId = produto.id || item.produto_id || item.id;
                    return (
                      <li key={produtoId} className={styles.row}>
                        <div className={styles.produto}>
                          <img src={produto.capa || produto.img || './ImgProdutos/placamae1.svg'} alt={produto.nome} />
                        </div>
                        <div className={styles.descricao}>
                          <p>{produto.nome}</p>
                        </div>
                        <div className={styles.quantidade}>
                          <button onClick={() => changeQuantity(produtoId, Math.max(1, quantidade - 1))}>-</button>
                          <span>{quantidade}</span>
                          <button onClick={() => changeQuantity(produtoId, quantidade + 1)}>+</button>
                        </div>
                        <div className={styles.preco}>
                          <p>{`1 x R$ ${produto.valor || produto.preco || '0,00'}`}</p>
                          <small>à vista no PIX</small>
                        </div>
                        <div className={styles.acao}>
                          <button className={styles.lixeiraBtn} onClick={() => handleRemove(produtoId)}>
                            <img src="/Neobyte/lixeira-vermelha.svg" alt="Lixeira" />
                          </button>
                        </div>
                      </li>
                    );
                  })
                )}
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
                  <span>R$ 0,00</span>
                </div>

                <div className={styles.linha}>
                  <span>Total</span>
                  <span>R$ 0,00</span>
                </div>

                <div className={styles.pixInfo}>
                  <span>R$ 0,00</span>
                  <small>À vista no pix com 10% de desconto</small>
                  <small>ou</small>
                  <small>até 10x de R$ 0,00</small>
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
