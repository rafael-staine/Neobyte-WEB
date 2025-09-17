import styles from "./Produtos.module.css";
import Card from "../Card/index.js"

export default function Produtos() {
    return (
        <section id="produto" className={styles.produtos}>
            <Card/>
        </section>
    );
}