import styles from "./Card.module.css";

export default function Card(props) {
    
    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    const calcProd = Number((props.preco / 10).toFixed(2));

    return (
        <section className={styles.produto_card}>
            <div className={styles.card_produto}>
                <picture>
                    <img src={props.imagemProd} alt={props.nomeProduto} />
                </picture>
                <h3 className={styles.tituloProduto}>{props.nomeProduto}</h3>

                <p className={styles.desconto}>
                    {formatarMoeda(props.desconto)}
                </p>

                <p className={styles.preco}>
                    {formatarMoeda(props.preco)}
                </p>

                <p className={styles.par}>À vista no pix ou até 10x de</p>

                <span className={styles.precoPar}>
                    {formatarMoeda(calcProd)}
                </span>
            </div>
        </section>
    );
}
