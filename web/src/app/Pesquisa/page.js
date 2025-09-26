"use client";
import { useState } from "react";
import styles from "./Pesquisa.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Pesquisa() {
  const [sort, setSort] = useState("menor-preco");
  const [price, setPrice] = useState([20, 1800]);
  const [brands, setBrands] = useState({
    amd: false,
    nvidia: false,
  });

  const handleBrandChange = (brand) => {
    setBrands({ ...brands, [brand]: !brands[brand] });
  };

  return (
    <>
      <Header />
      <Banner />

      

      <section className={styles.itensPesquisa}>
        <h2 className={styles.titlePage}>Você Pesquisou por: "placa de video"</h2>
        <div className={styles.container}>

          {/* Filtro */}
          <div className={styles.filtro}>
            <h3 className={styles.tituloFiltro}>Filtros</h3>

            <div className={styles.sectionFiltro}>
              <p className={styles.titleItem}>Ordenar por:</p>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="maior-preco"
                  checked={sort === "maior-preco"}
                  onChange={() => setSort("maior-preco")}
                />
                Maior preço
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="menor-preco"
                  checked={sort === "menor-preco"}
                  onChange={() => setSort("menor-preco")}
                />
                Menor preço
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="titulo-az"
                  checked={sort === "titulo-az"}
                  onChange={() => setSort("titulo-az")}
                />
                Título de A-Z
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="titulo-za"
                  checked={sort === "titulo-za"}
                  onChange={() => setSort("titulo-za")}
                />
                Título de Z-A
              </label>
            </div>

            <div className={styles.sectionValue}>
              <p className={styles.titleItem}>Preço</p>
              <input
                type="range"
                min="20"
                max="20000"
                value={price[1]}
                onChange={(e) => setPrice([20, parseInt(e.target.value)])}
                className={styles.range}
              />
              <div className={styles.priceValues}>
                <span>R$ {price[0].toFixed(2)}</span>
                <span>R$ {price[1].toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.sectionMarcas}>
              <p className={styles.titleItem}>Marcas</p>
              <label>
                <input
                  type="checkbox"
                  checked={brands.amd}
                  onChange={() => handleBrandChange("amd")}
                />
                AMD
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={brands.nvidia}
                  onChange={() => handleBrandChange("nvidia")}
                />
                NVIDIA
              </label>
            </div>
          </div>
        </div>
        <div className={styles.produtos}>
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}