"use client"

import styles from "./page.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Link from "next/link";
import { getProdutos } from '../services/produtoService'
import { useEffect, useState } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [produtosAleatorios, setProdutosAleatorios] = useState([])
  const [produtosAleatorios2, setProdutosAleatorios2] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Dentro do useEffect que carrega os produtos
  useEffect(() => {
    async function carregarProdutos() {
      try {
        setCarregando(true)
        setErro(null)
        const produtosDoBanco = await getProdutos()
        console.log('Produtos carregados:', produtosDoBanco) // Adicione esta linha
        console.log('Produtos com desconto:', produtosDoBanco.filter(p => p.valordesconto === true)) // Verifique produtos com desconto
        setProdutos(produtosDoBanco)
      } catch (error) {
        setErro('Erro ao carregar produtos')
        console.error('Erro:', error)
      } finally {
        setCarregando(false)
      }
    }
    carregarProdutos()
  }, [])

  // Função para selecionar produtos aleatórios sem repetição
  const selectProdRnd = (array, quantidade) => {
    if (!array || array.length === 0) return [];

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

  // Atualiza produtos aleatórios quando os produtos carregam
  useEffect(() => {
    if (produtos.length > 0) {
      const aleatorios = selectProdRnd(produtos, 10);
      setProdutosAleatorios(aleatorios);
    }
  }, [produtos]);

  const selectProdRnd2 = (array, quantidade) => {
    if (!array || array.length === 0) return [];

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

  // Atualiza produtos aleatórios quando os produtos carregam
  useEffect(() => {
    if (produtos.length > 0) {
      const aleatorios = selectProdRnd2(produtos, 10);
      setProdutosAleatorios2(aleatorios);
    }
  }, [produtos]);


  if (carregando) {
    return <div className={styles.carregando}>Carregando produtos...</div>
  }

  if (erro) {
    return (
      <div className={styles.erro}>
        <p>{erro}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Neobyte</title>
        <meta
          name="description"
          content="O melhor e-commerce tecnológico do mercado"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <Banner />

        <div className={styles.containerCards}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.titleHome}>Mais Vendidos</h2>
          </div>

          <div className={styles.gridCards1}>
            {produtosAleatorios.map((produto) => (
              <Link className={styles.linkCard} key={produto.id} href={`/Produto/${produto.id}`}>
                <Card
                  nomeProduto={produto.nome}
                  preco={produto.valor}
                  // Se valordesconto for 1, calcula o preço original (aumenta 16% para mostrar como "preço antigo")
                  desconto={produto.valordesconto === true ? produto.valor * 1.16 : null}
                  imagemProd={produto.capa || '/imagem-padrao.jpg'}
                  temDesconto={produto.valordesconto === true} // Adiciona nova prop para controlar o desconto
                />
              </Link>
            ))}
          </div>

          {produtosAleatorios.length === 0 && !carregando && (
            <div className={styles.sem_produtos}>
              Nenhum produto encontrado
            </div>
          )}

          {/* Seção estática (mantida do seu código original) */}
          <h2 className={styles.titleHome}>Acabaram de Chegar</h2>
          <div className={styles.gridCards2}>
            {produtosAleatorios2.map((produto) => (
              <Link className={styles.linkCard} key={produto.id} href={`/Produto/${produto.id}`}>
                <Card
                  nomeProduto={produto.nome}
                  preco={produto.valor}
                  // Se valordesconto for 1, calcula o preço original (aumenta 16% para mostrar como "preço antigo")
                  desconto={produto.valordesconto === true ? produto.valor * 1.16 : null}
                  imagemProd={produto.capa || '/imagem-padrao.jpg'}
                  temDesconto={produto.valordesconto === true} // Adiciona nova prop para controlar o desconto
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}