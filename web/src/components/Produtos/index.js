import styles from "./Produtos.module.css";
import Card from "../Card/index.js"

export default function Produtos() {
    return (
        <section id="produto" className={styles.produtos}>
            <Card
            nomeProduto="Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto"
            imagemProd="/ImgProdutos/placa-mae.png"
            desconto="788.22"
            preco="575.99"
            />
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </section>
    );
}