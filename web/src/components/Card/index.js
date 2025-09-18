import styles from "./Card.module.css";

export default function Card(props) {
    const calcProd = Number((props.preco / 10).toFixed(2));
    return (
            <section className={styles.produto_card}>
                <div className={styles.card_produto}>
                    <picture>
                        <img src={props.imagemProd} alt={props.nomeProduto}></img>
                    </picture>
                    <h3 className={styles.tituloProduto}>{props.nomeProduto}</h3>
                    <p className={styles.desconto}>{`R$ ${props.desconto}`}</p>
                    <p className={styles.preco}>{`R$ ${props.preco}`}</p>
                    <p className={styles.par}>À vista no pix ou até 10x de</p>
                    <span className={styles.precoPar}>R$ {calcProd}</span>
                </div>
            </section>
    );
}