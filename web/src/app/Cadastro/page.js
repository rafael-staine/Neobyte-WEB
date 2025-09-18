import styles from "./Cadastro.module.css";

export default function Login() {
    return (
        <div className={styles.container}>

            {/* Lado esquerdo agora fica o formulário */}
            <div className={styles.left}>
                <h1 className={styles.title}>NEOBYTE</h1>
                <p className={styles.subtitle}>Cadastre-se!</p>

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

                    <button type="submit" className={styles.button}>Cadastrar</button>
                </form>

                <p className={styles.register}>
                    <span className={styles.pergunta}>Já possui uma conta?</span>{" "}
                    <a href="#" className={styles.cadastrar}>Clique aqui para entrar!</a>
                </p>
            </div>

            {/* Lado direito agora fica logo e texto */}
            <div className={styles.right}>
                <img src="/logo-neobyte.png" alt="Logo" className={styles.logo} />
                <img src="/text-neobyte.png" alt="text" className={styles.text} />
            </div>
        </div>
    );
}
