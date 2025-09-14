import styles from "./SubHeader.module.css";

export default function UsuarioPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.icons}>
                    <img src="/Neobyte/perfil.svg" alt="Perfil" />
                    <span className={styles.info}>Olá, Usuário</span>
                </div>
                
                <button className={styles.sair}>
                    <img src="/Neobyte/sair.svg" alt="Sair" />Sair
                </button>

            </header>

            <nav className={styles.menu}>
                <button className={`${styles.tab} ${styles.active}`}>Meu Cadastro</button>
                <button className={styles.tab}>Meus Pedidos</button>
                <button className={styles.tab}>Meus Endereços</button>
                <button className={styles.tab}>Meus Favoritos</button>
            </nav>
        </div>
    );
}
