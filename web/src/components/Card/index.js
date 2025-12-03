import styles from "./Card.module.css";

export default function Card(props) {
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  // Calcula o preço das parcelas
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
        {/* Adiciona badge de desconto se temDesconto for true */}
        {props.temDesconto && (
          <div className={styles.badge_desconto}>
            <span className={styles.texto_badge}>-16%</span>
          </div>
        )}

        <picture className={styles.imgCard}>
          <img
            className={styles.imgCardProd}
            src={props.imagemProd}
            alt={props.nomeProduto}
          />
        </picture>

        <div className={styles.infoCard}>
          <h3 className={styles.tituloProduto}>{props.nomeProduto}</h3>

          {/* Mostra o preço original com desconto se temDesconto for true */}
          {props.temDesconto && (
            <p className={styles.desconto}>
              {formatarMoeda(props.desconto)}
            </p>
          )}

          <p className={styles.preco}>{formatarMoeda(props.preco)}</p>

          <p className={styles.par}>
            À vista no pix ou até {parcelas}x sem juros de{" "}
            <span className={styles.precoPar}>
              {formatarMoeda(valorParcela)}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}