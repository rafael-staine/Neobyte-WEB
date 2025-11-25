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
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregarProdutos() {
      try {
        setCarregando(true)
        setErro(null)
        const produtosDoBanco = await getProdutos()
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

  // Função para selecionar produtos aleatórios
  const selectProdRnd = (array, quantidade) => {
    if (!array || array.length === 0) return [];

    if (array.length <= quantidade) {
      return [...array];
    }

    const embaralhado = [...array].sort(() => Math.random() - 0.5);
    return embaralhado.slice(0, quantidade);
  }

  // Atualiza produtos aleatórios quando os produtos carregam
  useEffect(() => {
    if (produtos.length > 0) {
      const aleatorios = selectProdRnd(produtos, 10)
      setProdutosAleatorios(aleatorios)
    }
  }, [produtos])

  // Função para recarregar com novos produtos aleatórios
  const reloadRnd = () => {
    if (produtos.length > 0) {
      const newRnd = selectProdRnd(produtos, 10)
      setProdutosAleatorios(newRnd)
    }
  }

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
            <button
              onClick={reloadRnd}
              className={styles.botaoAleatorio}
              disabled={produtos.length === 0}
            >
              🔄 Novas Sugestões
            </button>
          </div>

          <div className={styles.gridCards1}>
            {produtosAleatorios.map((produto) => (
              <Card
                key={produto.id}
                nomeProduto={produto.nome}
                preco={produto.valor}
                desconto={produto.valordesconto ? produto.valordesconto / 100 : null}
                imagemProd={produto.capa || '/imagem-padrao.jpg'}
              />
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
            {/* Seus cards estáticos aqui */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}