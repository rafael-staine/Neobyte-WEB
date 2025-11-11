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

  useEffect(() => {
    const saved = localStorage.getItem('neobyteUser');
    if (!saved) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const user = JSON.parse(saved);

    (async () => {
      try {
        const resp = await fetch(`http://localhost:4000/favorite/${user.id}`);
        if (!resp.ok) {
          console.error('Erro ao buscar favoritos', resp.status);
          setLoading(false);
          return;
        }

        const data = await resp.json();
        // data.favorites expected
        setFavorites(data.favorites || []);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar favoritos', err);
        setLoading(false);
      }
    })();
  }, []);

  const handleRemove = async (product_id) => {
    const saved = localStorage.getItem('neobyteUser');
    if (!saved) return;
    const user = JSON.parse(saved);

    try {
      const resp = await fetch('http://localhost:4000/favorite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, product_id }),
      });

      if (!resp.ok) {
        console.error('Erro ao remover favorito', resp.status);
        return;
      }

      // atualizar lista local
      setFavorites((prev) => prev.filter((f) => f.produto_id !== product_id));
    } catch (err) {
      console.error('Erro ao remover favorito', err);
    }
  };

  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/favorito.svg" title="Favoritos" />
      <section>
        <div className={styles.cardsContainer}>
          {loading ? (
            <p>Carregando...</p>
          ) : favorites.length === 0 ? (
            <p>Nenhum favorito ainda.</p>
          ) : (
            favorites.map((fav) => {
              const produto = fav.produto || {};
              return (
                <div key={produto.id} className={styles.linkCard}>
                  <Link href={`/ProdutoPlacaMae`}>
                    <Card
                      nomeProduto={produto.nome}
                      imagemProd={produto.capa || '/ImgProdutos/placamae1.svg'}
                      desconto={produto.valordesconto}
                      preco={produto.valor}
                    />
                  </Link>
                  <button className={styles.removeBtn} onClick={() => handleRemove(produto.id)}>Remover</button>
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
