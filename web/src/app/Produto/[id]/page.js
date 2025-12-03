"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './Produto.module.css';

export default function Produto() {
  const params = useParams(); // Obtém os parâmetros da rota
  const id = params?.id; // Extrai o ID do produto

  console.log('ID do produto:', id);

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (id) {
      // Função para buscar os dados do produto
      const fetchProduto = async () => {
        try {
          const response = await fetch(`http://localhost:4000/product/${id}`);
          const data = await response.json();
          console.log('Dados do produto recebidos:', data);
          console.log('valordesconto:', data.product?.valordesconto);
          setProduto(data.product);
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
        } finally {
          setCarregando(false);
        }
      };

      fetchProduto();
    }
  }, [id]);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!produto) {
    return <p>Produto não encontrado.</p>;
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  // Verifica se o produto tem desconto
  const temDesconto = produto.valordesconto === true;

  // Calcula o preço original (para mostrar riscado) quando há desconto
  const precoOriginal = temDesconto ? produto.valor * 1.16 : null;

  return (
    <>
      <Head>
        <title>Neobyte - {produto.nome}</title>
        <meta
          name="description"
          content={produto.descricao || "Descrição do produto"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <div className={styles.topProduto}>
          <div className={styles.imgProdtudo}>
            <img src={produto.capa || '/imagem-padrao.jpg'} alt={produto.nome} />
          </div>

          <div className={styles.sobreProduto}>
            <div className={styles.avaliacao}>
              <div className={styles.estrelas}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span>
              </div>
            </div>

            <h1 className={styles.tituloProduto1}>
              {produto.nome}
            </h1>

            <h3 className={styles.subtituloProduto}>Categoria</h3>
            <p className={styles.sobreProduto}>
              {produto.categoria}
            </p>
            <h3 className={styles.subtituloProduto}>Descrição</h3>
            <p className={styles.textoProduto}>
              {produto.descricao}
            </p>
          </div>

          <div className={styles.caixaCompra}>
            {/* Mostra o preço original riscado apenas se temDesconto for true */}
            {temDesconto && (
              <p className={styles.precoDesconto}>{formatarMoeda(precoOriginal)}</p>
            )}

            <p className={styles.preco}>{formatarMoeda(produto.valor)}</p>

            {/* Mostra a porcentagem de desconto apenas se temDesconto for true */}
            <p className={styles.precoPix}>
              À vista no PIX com <strong>{temDesconto ? '14%' : '10%'} de desconto</strong>
            </p>

            <p className={styles.precoParcelado}>
              {formatarMoeda(produto.valor)} em até 10x de {formatarMoeda(produto.valor / 10)} sem juros <br />
              ou 1x com <strong>{temDesconto ? '14%' : '10%'} de desconto</strong> no cartão
            </p>

            {/* Badge de desconto visível apenas se temDesconto for true */}
            {temDesconto && (
              <div className={styles.badgeDescontoProduto}>
                <span className={styles.textoBadgeProduto}>-14% OFF</span>
              </div>
            )}

            <div className={styles.botoesProduto}>
              <a href="/Pagamento" onClick={(e) => { if (!requireAuth(e)) return; }}>
                <button className={styles.btnComprar}>
                  <img
                    src="/neobyte/sacola.svg"
                    alt="Comprar"
                    className={styles.iconSac}
                  />
                  Comprar
                </button>
              </a>

              <a href="#" >
                <button className={styles.btnCarrinho}>
                  <img
                    src="/neobyte/carrinho.svg"
                    alt="Adicionar ao carrinho"
                    className={styles.iconCar}
                  />
                  Adicionar ao carrinho
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divisor}></div>
        <section>
          {/* Outras seções do produto podem vir aqui */}
        </section>
      </section>
      <Footer />
    </>
  );
}