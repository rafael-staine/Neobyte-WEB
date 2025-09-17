import styles from "./Entrar.module.css";

export default function Login() {
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <img src="/logo-neobyte.png" alt="Logo" className={styles.logo} />
                <img src="/text-neobyte.png" alt="text" className={styles.text} />
            </div>

            <div className={styles.right}>
                <h1 className={styles.title}>NEOBYTE</h1>
                <p className={styles.subtitle}>Bem-vindo de volta!</p>

                <form className={styles.emailContainer}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Digite seu email..."
                        className={styles.input}
                    />

                    <label>Senha</label>
                    <div className={styles.senhaContainer}>
                        <input
                            type="password"
                            placeholder="Digite sua senha..."
                            className={styles.input}
                        />
                        <button type="button" className={styles.icone}>
                            <img src="./NeoByte/vizualizar.svg" alt="Visualizar senha" />
                        </button>
                    </div>

                    <button type="submit" className={styles.button}>Entrar</button>
                </form>

                <p className={styles.register}>
                    Não possui uma conta? <a href="#">Clique aqui para se cadastrar</a>
                </p>
            </div>
        </div>
    );
}
