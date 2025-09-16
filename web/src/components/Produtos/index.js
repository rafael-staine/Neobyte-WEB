import styles from "./Produtos.module.css";

export default function Produtos() {
    return (
        <section id="produto" className={styles.produtos}>

            {/* Card 1 */}
            <div className={styles.produto_img}>
                <div className={styles.card_produto}>
                    <picture>
                        <img src='/ImgProdutos/placa-mae.png' alt='Maximum'></img>
                    </picture>
                    <h3>Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4, Preto</h3>
                    <p className={styles.desconto}>R$ 788,22</p>
                    <p className={styles.preco}>R$ 575,99</p>
                    <p className={styles.par}>À vista no pix ou até 10x de R$ 67,76</p>
                </div>
            </div>

        </section>
    );
}