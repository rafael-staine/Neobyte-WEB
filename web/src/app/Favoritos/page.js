"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import Card from "@/components/Card";
import Link from "next/link";
import styles from "./Favoritos.module.css";

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [removendoId, setRemovendoId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("neobyteUser");
    const isLoggedIn = localStorage.getItem("neobyteLoggedIn") === "true";

    if (userData && isLoggedIn) {
      try {
        const user = JSON.parse(userData);
        setUsuarioLogado(user);
        fetchFavoritos(user.id);
      } catch (error) {
        console.error("Erro ao parsear usuário:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFavoritos = async (userId) => {
    try {
      const resp = await fetch(`http://localhost:4000/favorite/${userId}`);
      if (!resp.ok) {
        console.error("Erro ao buscar favoritos", resp.status);
        setLoading(false);
        return;
      }

      const data = await resp.json();
      console.log("Favoritos recebidos:", data);
      setFavorites(data.favorites || []);
    } catch (err) {
      console.error("Erro ao buscar favoritos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (product_id, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!usuarioLogado) return;

    setRemovendoId(product_id);

    try {
      const resp = await fetch("http://localhost:4000/favorite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: usuarioLogado.id,
          produto_id: product_id,
        }),
      });

      if (!resp.ok) {
        console.error("Erro ao remover favorito", resp.status);
        return;
      }

      // Atualizar lista local
      setFavorites((prev) => prev.filter((f) => f.produto_id !== product_id));
    } catch (err) {
      console.error("Erro ao remover favorito", err);
    } finally {
      setRemovendoId(null);
    }
  };

  // Verificar se o usuário está logado
  if (!usuarioLogado && !loading) {
    return (
      <>
        <Head>
          <title>Neobyte - Favoritos</title>
          <meta name="description" content="Seus produtos favoritos na Neobyte" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <SubHeader logo="/Neobyte/favorito.svg" title="Favoritos" />
        <section className={styles.container}>
          <div className={styles.loginMessage}>
            <div className={styles.heartIcon}>❤️</div>
            <h3>Faça login para ver seus favoritos</h3>
            <p>Entre na sua conta para visualizar e gerenciar seus produtos favoritos.</p>
            <Link href="/Login" className={styles.loginBtn}>
              Fazer Login
            </Link>
            <Link href="/Cadastro" className={styles.cadastroBtn}>
              Criar Conta
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Neobyte - Favoritos</title>
        <meta name="description" content="Seus produtos favoritos na Neobyte" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <SubHeader logo="/Neobyte/favorito.svg" title="Favoritos" />
      <section className={styles.container}>
        <div className={styles.headerContent}>
          <h1 className={styles.tituloPagina}>
            Meus Favoritos
          </h1>
          {favorites.length > 0 && (
            <div className={styles.contador}>
              <span className={styles.contadorNumero}>{favorites.length}</span>
              {favorites.length === 1 ? ' produto salvo' : ' produtos salvos'}
            </div>
          )}
        </div>

        {loading ? (
          <div className={styles.carregandoContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando seus favoritos...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <img className={styles.vazioFavI}
              src='./logo/logomini.svg'
              alt="Logomini"
            />
            <h3>Sua lista de favoritos está vazia</h3>
            <p>Adicione produtos aos favoritos clicando no coração na página do produto.</p>
            <Link href="/" className={styles.browseBtn}>
              <span>🔍</span> Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {favorites.map((fav) => {
              const produto = fav.produto || {};
              return (
                <div key={fav.produto_id} className={styles.cardContainer}>
                  <Link href={`/Produto/${fav.produto_id}`} className={styles.cardLink}>
                    <Card
                      nomeProduto={produto.nome || "Produto"}
                      imagemProd={produto.capa || "/ImgProdutos/placamae1.svg"}
                      desconto={produto.valordesconto === true ? produto.valor * 1.16 : null}
                      preco={produto.valor}
                      temDesconto={produto.valordesconto === true}
                    />
                  </Link>
                  <button
                    className={styles.removeBtn}
                    onClick={(e) => handleRemove(fav.produto_id, e)}
                    disabled={removendoId === fav.produto_id}
                    title="Remover dos favoritos"
                  >
                    {removendoId === fav.produto_id ? (
                      <span className={styles.removingSpinner}></span>
                    ) : (
                      "×"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}