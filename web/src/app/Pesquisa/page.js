"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Pesquisa.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Pesquisa() {
  const [sort, setSort] = useState("menor-preco");
  const [price, setPrice] = useState([5, 25000]);
  const [brands, setBrands] = useState({
    amd: false,
    nvidia: false,
  });

  const rangeRef = useRef(null);

  const handleBrandChange = (brand) => {
    setBrands({ ...brands, [brand]: !brands[brand] });
  };

  // sempre que o preço mudar, atualiza o fundo da barra
  useEffect(() => {
    if (rangeRef.current) {
      const value = price[1];
      const min = 5;
      const max = 25000;

      const percent = ((value - min) / (max - min)) * 100;

      rangeRef.current.style.background = `
        linear-gradient(to right,
          #137969 0%,
          #137969 ${percent}%,
          #fff ${percent}%,
          #fff 100%
        )
      `;
    }
  }, [price]);

  return (
    <>
      <Header />
      <Banner />

      <section className={styles.itensPesquisa}>
        <h2 className={styles.titlePage}>
          Você Pesquisou por: "placa de video"
        </h2>
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

            {/* Slider Preço */}
            <div className={styles.sectionValue}>
              <p className={styles.titleItem}>Preço</p>

              {/* Barra deslizante */}
              <input
                ref={rangeRef}
                type="range"
                min="5"
                max="25000"
                value={price[1]}
                onChange={(e) => setPrice([5, parseInt(e.target.value)])}
                className={styles.range}
              />

              <div className={styles.priceValues}>
                <span>
                  R${" "}
                  {price[0].toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span>
                  R${" "}
                  {price[1].toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
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
            nomeProduto="Placa de Vídeo XFX AMD RADEON RX 7600 Gaming Graphics Card, 8GB, GDDR6"
            imagemProd="/ImgProdutos/placadevideo1.svg"
            desconto="2352.93"
            preco="1699.99"
          />
          <Card
            nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
            imagemProd="/ImgProdutos/placadevideo2.svg"
            desconto="1894.73"
            preco="1599.99"
          />
          <Card
            nomeProduto="Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6, 128bits, RGB"
            imagemProd="/ImgProdutos/placadevideo3.svg"
            desconto="2352.93"
            preco="1769.99"
          />
          <Card
            nomeProduto="Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6"
            imagemProd="/ImgProdutos/placadevideo4.svg"
            desconto="1888.88"
            preco="1599.99"
          />
          <Card
            nomeProduto="Placa de Vídeo RX 7600 Challenger ASRock AMD Radeon, 8GB GDDR6"
            imagemProd="/ImgProdutos/placadevideo5.svg"
            desconto="2176.46"
            preco="1799.99"
          />
          <Card
            nomeProduto="Placa de Vídeo ASRock RX 6400 CLI 4G AMD Radeon, 4GB, GDDR6, DirectX 12 Ultimate, RDNA 2"
            imagemProd="/ImgProdutos/placadevideo6.svg"
            desconto="1152.21"
            preco="999.99"
          />
          <Card
            nomeProduto="Placa de Vídeo Afox AMD Radeon RX 550, 4GB GDDR5, 128 Bits"
            imagemProd="/ImgProdutos/placadevideo7.svg"
            preco="849.00"
          />
          <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placadevideo8.svg"
            desconto="1653.32"
            preco="1359.99"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
