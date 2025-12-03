"use client"

import styles from "./Promocoes.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Link from "next/link";
import { getProdutos } from '@/services/produtoService';
import { useEffect, useState } from "react";

export default function Promocoes() {
  const [produtos, setProdutos] = useState([]);
  const [produtosComDesconto, setProdutosComDesconto] = useState([]);
  const [produtosAleatorios, setProdutosAleatorios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função para selecionar produtos aleatórios sem repetição
  const selectProdRnd = (array, quantidade) => {
    if (!array || array.length === 0) return [];

    // Se houver menos produtos que a quantidade solicitada, retorna todos
    if (array.length <= quantidade) {
      return [...array];
    }

    const selecionados = new Set();
    while (selecionados.size < quantidade) {
      const indexAleatorio = Math.floor(Math.random() * array.length);
      selecionados.add(array[indexAleatorio]);
    }

    return Array.from(selecionados);
  };

  useEffect(() => {
    async function carregarProdutos() {
      try {
        setCarregando(true);
        setErro(null);
        const produtosDoBanco = await getProdutos();

        // Filtra apenas produtos com desconto
        const produtosComDesconto = produtosDoBanco.filter(
          produto => produto.valordesconto === true
        );

        console.log('Total de produtos com desconto:', produtosComDesconto.length);

        // Seleciona até 20 produtos aleatórios com desconto
        const produtosAleatorios = selectProdRnd(produtosComDesconto, 20);

        console.log('Produtos selecionados aleatoriamente:', produtosAleatorios.length);

        setProdutos(produtosDoBanco);
        setProdutosComDesconto(produtosComDesconto);
        setProdutosAleatorios(produtosAleatorios);
      } catch (error) {
        setErro('Erro ao carregar produtos');
        console.error('Erro:', error);
      } finally {
        setCarregando(false);
      }
    }
    carregarProdutos();
  }, []);

  if (carregando) {
    return <div className={styles.carregando}>Carregando promoções...</div>;
  }

  if (erro) {
    return (
      <div className={styles.erro}>
        <p>{erro}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Promoções - Neobyte</title>
        <meta
          name="description"
          content="As melhores promoções tecnológicas do mercado"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <Banner />

        <div className={styles.containerCards}>
          <h2 className={styles.titleHome}>Promoções</h2>

          {produtosAleatorios.length > 0 ? (
            <div className={styles.gridCards}>
              {produtosAleatorios.map((produto) => (
                <Link
                  className={styles.linkCard}
                  key={produto.id}
                  href={`/Produto/${produto.id}`}
                >
                  <Card
                    nomeProduto={produto.nome}
                    preco={produto.valor}
                    // Calcula o preço original (aumenta 16% para mostrar como "preço antigo")
                    desconto={produto.valor * 1.16}
                    imagemProd={produto.capa || '/imagem-padrao.jpg'}
                    temDesconto={true} // Todos os produtos nesta página têm desconto
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.semPromocoes}>
              <p>Nenhuma promoção disponível no momento.</p>
            </div>
          )}

          {/* Mostra informações sobre quantidade de produtos */}
          <div className={styles.infoQuantidade}>
            <p>
              Mostrando {produtosAleatorios.length} de {produtosComDesconto.length} promoções disponíveis
            </p>
            {produtosComDesconto.length > 20 && (
              <p className={styles.note}>
                * Os produtos são selecionados aleatoriamente a cada carregamento
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}