"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Favoritos.module.css";
import Card from "@/components/Card";
import Link from "next/link";

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    // Verificar usuário logado
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

  const handleRemove = async (product_id) => {
    if (!usuarioLogado) return;

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

      // Mostrar notificação
      alert("Produto removido dos favoritos!");
    } catch (err) {
      console.error("Erro ao remover favorito", err);
    }
  };

  // Verificar se o usuário está logado
  if (!usuarioLogado && !loading) {
    return (
      <>
        <Header />
        <SubHeader logo="/Neobyte/favorito.svg" title="Favoritos" />
        <section className={styles.container}>
          <div className={styles.loginMessage}>
            <h3>Você precisa estar logado para ver seus favoritos</h3>
            <Link href="/Login" className={styles.loginBtn}>
              Fazer Login
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/favorito.svg" title="Favoritos" />
      <section className={styles.container}>
        <div className={styles.cardsContainer}>
          {loading ? (
            <p className={styles.loading}>Carregando favoritos...</p>
          ) : favorites.length === 0 ? (
            <div className={styles.emptyState}>
              <img className={styles.vazioFav}
                src='./logo/logomini.svg'
                alt="Logomini"
              />
              <h3>Nenhum produto favoritado ainda.</h3>
              <p>Adicione produtos aos favoritos clicando no coração na página do produto</p>
              <Link href="/" className={styles.browseBtn}>
                Explorar Produtos
              </Link>
            </div>
          ) : (
            favorites.map((fav) => {
              const produto = fav.produto || {};
              return (
                <div key={fav.produto_id} className={styles.cardWrapper}>
                  <Link href={`/Produto/${fav.produto_id}`} className={styles.cardLink}>
                    <Card
                      nomeProduto={produto.nome || "Produto"}
                      imagemProd={produto.capa || "/ImgProdutos/placamae1.svg"}
                      desconto={produto.valordesconto}
                      preco={produto.valor}
                    />
                  </Link>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(fav.produto_id)}
                  >
                    Remover
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}