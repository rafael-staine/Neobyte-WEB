import styles from "./Card.module.css";

export default function Card(props) {
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const calcProd = Number((props.preco / 10).toFixed(2));

  let parcelas = 1;
  let valorParcela = props.preco;

  if (props.preco > 100) {
    parcelas = 10;
    valorParcela = props.preco / 10;
  } else if (props.preco > 50) {
    parcelas = 5;
    valorParcela = props.preco / 5;
  } else {
    parcelas = 1;
    valorParcela = props.preco;
  }

  return (
    <section className={styles.produto_card}>
      <div className={styles.card_produto}>
        <picture className={styles.imgCard}>
          <img src={props.imagemProd} alt={props.nomeProduto} />
        </picture>

        <div className={styles.infoCard}>
          <h3 className={styles.tituloProduto}>{props.nomeProduto}</h3>

          <p
            className={`${styles.desconto} ${
              !props.desconto ? styles.hidden : ""
            }`}
          >
            {props.desconto ? formatarMoeda(props.desconto) : "\u00A0"}
          </p>

          <p className={styles.preco}>{formatarMoeda(props.preco)}</p>

          <p className={styles.par}>
            À vista no pix ou até {parcelas}x de{" "}
            <span className={styles.precoPar}>
              {formatarMoeda(valorParcela)}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}