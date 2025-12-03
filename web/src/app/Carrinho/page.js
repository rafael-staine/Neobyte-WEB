"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Carrinho.module.css";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        console.log('📦 Dados recebidos do carrinho:', data);

        // Verifica diferentes estruturas de resposta
        if (Array.isArray(data)) {
          setProdutos(data);
        } else if (data.carrinho && Array.isArray(data.carrinho)) {
          setProdutos(data.carrinho);
        } else if (data.produtoAdicionado && Array.isArray(data.produtoAdicionado)) {
          setProdutos(data.produtoAdicionado);
        } else if (data.carrinho) {
          setProdutos([data.carrinho]);
        } else if (data.produtoAdicionado) {
          setProdutos([data.produtoAdicionado]);
        } else {
          setProdutos([]);
        }

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
        body: JSON.stringify({
          user_id: user.id,
          produto_id,
          quantidade: newQuantity
        }),
      });

      if (!resp.ok) {
        console.error('Erro ao editar quantidade', resp.status);
        return;
      }

      // Atualizar estado local
      setProdutos((prev) =>
        prev.map((item) => {
          // Verifica diferentes estruturas
          const itemProdutoId = item.produto?.id || item.produto_id;
          if (itemProdutoId === produto_id) {
            return {
              ...item,
              quantidade: newQuantity
            };
          }
          return item;
        })
      );
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
        body: JSON.stringify({
          user_id: user.id,
          produto_id
        }),
      });

      if (!resp.ok) {
        console.error('Erro ao remover do carrinho', resp.status);
        return;
      }

      setProdutos((prev) =>
        prev.filter((item) => {
          const itemProdutoId = item.produto?.id || item.produto_id || item.id;
          return itemProdutoId !== produto_id;
        })
      );
    } catch (err) {
      console.error('Erro ao remover do carrinho', err);
    }
  };

  const handleLimparCarrinho = async () => {
    if (!confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      return;
    }

    const saved = localStorage.getItem('neobyteUser');
    if (!saved) return;
    const user = JSON.parse(saved);

    try {
      // Remove cada produto individualmente
      for (const item of produtos) {
        const produtoId = item.produto?.id || item.produto_id;
        await fetch('http://localhost:4000/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            produto_id: produtoId
          }),
        });
      }

      setProdutos([]);
    } catch (err) {
      console.error('Erro ao limpar carrinho', err);
    }
  };

  // Função para calcular totais
  const calcularTotais = () => {
    let subtotal = 0;
    let total = 0;
    let descontoPix = 0;

    produtos.forEach(item => {
      const produto = item.produto || item;
      const quantidade = item.quantidade || 1;
      const preco = produto.valor || produto.preco || 0;

      subtotal += preco * quantidade;
    });

    // 10% de desconto no PIX
    descontoPix = subtotal * 0.10;
    total = subtotal - descontoPix;

    return {
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      descontoPix: descontoPix.toFixed(2),
      parcelas: (subtotal / 10).toFixed(2)
    };
  };

  const totais = calcularTotais();

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
            <span>Quantidade</span>
            <span>Preço à vista no PIX</span>
          </div>

          <ul className={styles.pedidos}>
            {loading ? (
              <p>Carregando...</p>
            ) : produtos.length === 0 ? (
              <div className={styles.vazioCart}>
                <img className={styles.vazioCartI}
                  src='./logo/logomini.svg'
                  alt="Logomini"
                />
                <p className={styles.vazioCartT}>Não há nada por aqui.</p>
              </div>
            ) : (
              // REMOVA O { DUPLICADO AQUI:
              produtos.map((item) => {
                const produto = item.produto || item;
                const quantidade = item.quantidade || (item.quantidade === 0 ? item.quantidade : 1);
                const produtoId = produto.id || item.produto_id || item.id;

                // Formata o preço
                const precoFormatado = produto.valor
                  ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(produto.valor)
                  : 'R$ 0,00';

                return (
                  <li key={produtoId} className={styles.row}>
                    <div className={styles.produto}>
                      <img
                        src={produto.capa || produto.img || './ImgProdutos/placamae1.svg'}
                        alt={produto.nome}
                      />
                    </div>
                    <section className={styles.descGrid}>
                      <Link className={styles.linkCard} key={produto.id} href={`/Produto/${produto.id}`}>
                        <div className={styles.descricao}>
                          <p>{produto.nome}</p>
                        </div>
                      </Link>
                    </section>
                    <div className={styles.quantidade}>
                      <button onClick={() => changeQuantity(produtoId, Math.max(1, quantidade - 1))}>-</button>
                      <span>{quantidade}</span>
                      <button onClick={() => changeQuantity(produtoId, quantidade + 1)}>+</button>
                    </div>
                    <div className={styles.preco}>
                      <p>{`${quantidade} x ${precoFormatado}`}</p>
                      <small className={styles.avista}>à vista no PIX</small>
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


        </div>

        <div className={styles.cepEres}>
          <div className={styles.resumo}>
            <h2>Resumo</h2>
            <div className={styles.valores}>
              <div className={styles.linha}>
                <span>Subtotal</span>
                <span>R$ {totais.subtotal}</span>
              </div>

              <div className={styles.linha}>
                <span>Desconto PIX (10%)</span>
                <span>- R$ {totais.descontoPix}</span>
              </div>

              <div className={styles.linha}>
                <span>Total</span>
                <span>R$ {totais.total}</span>
              </div>

              <div className={styles.pixInfo}>
                <span>R$ {totais.total}</span>
                <small>À vista no pix com 10% de desconto</small>
                <small>ou</small>
                <small>até 10x de R$ {totais.parcelas}</small>
              </div>
            </div>

            <button
              className={styles.comprar}
              onClick={() => router.push('/Pagamento')}
              disabled={produtos.length === 0}
            >
              <img src="/Neobyte/sacola.svg" alt="Comprar" />
              Comprar
            </button>

            <button
              className={styles.limpar}
              onClick={handleLimparCarrinho}
              disabled={produtos.length === 0}
            >
              <img src="/Neobyte/lixeira-branca.svg" alt="Lixeira" />
              Limpar carrinho
            </button>
          </div>
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
      </div>

      <section>
        <Footer />
      </section>
    </div >
  );
}