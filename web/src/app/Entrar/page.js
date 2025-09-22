import styles from "./Entrar.module.css";

export default function Login() {
    return (
        <div className={styles.container}>

            {/* Lado esquerdo com logo e o texto */}
            <div className={styles.left}>
                <img src="/logo/logo-verde.svg" alt="Logo" className={styles.logo} />
                <img src="/logo/text-verde.svg" alt="text" className={styles.text} />
            </div>

            {/* Lado direito com o formulário */}
            <div className={styles.right}>
                <h1 className={styles.title}>NEOBYTE</h1>
                <p className={styles.subtitle}>Bem-vindo de volta!</p>

                <form className={styles.formulario}>
                    <p>Email</p>

                    <input
                        type="email"
                        placeholder="Digite seu email..."
                        className={styles.input}
                    />

                    <p>Senha</p>
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
                    <span className={styles.pergunta}>Não possui uma conta?</span>{" "}
                    <a href="/Cadastro" className={styles.cadastrar}>Clique aqui para se cadastrar!</a>
                </p>
            </div>
        </div>
    );
}
