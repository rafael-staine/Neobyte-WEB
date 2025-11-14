"use client";

import { useState, useEffect } from "react";
import styles from "./Entrar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verifica se já está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("neobyteLoggedIn") === "true";
    if (isLoggedIn) {
      router.push("/"); // Redireciona se já estiver logado
    }
  }, [router]);

  // Voltar para o header inicial
  const handleBack = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Chama o backend para buscar o usuário pelo email
    (async () => {
      try {
        const resp = await fetch(`http://localhost:4000/user/email/${encodeURIComponent(
          email.trim()
        )}`);

        if (!resp.ok) {
          if (resp.status === 404) {
            setError("Usuário não encontrado. Por favor, cadastre-se.");
          } else {
            setError("Erro ao buscar usuário. Tente novamente.");
          }
          setLoading(false);
          return;
        }

        const data = await resp.json();
        const profile = data.profile || data;

        // Verifica senha (observação: backend atualmente não faz autenticação JWT)
        if (!profile || profile.senha !== password) {
          setError("Email ou senha incorretos.");
          setLoading(false);
          return;
        }

        // Salva perfil no localStorage e marca como logado
        localStorage.setItem("neobyteUser", JSON.stringify(profile));
        localStorage.setItem("neobyteLoggedIn", "true");

        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 700);
      } catch (err) {
        console.error("Erro ao verificar login:", err);
        setError("Erro ao fazer login. Tente novamente.");
        setLoading(false);
      }
    })();
  };

  return (
    <div className={styles.container}>
      {/* Lado esquerdo com logo e o texto */}
      <div className={styles.left}>

        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton} aria-label="Voltar para o início">&lt; Voltar</button>
        </div>
        
        <img src="/logo/logo-verde.svg" alt="Logo" className={styles.logo} />
        <img src="/logo/text-verde.svg" alt="text" className={styles.text} />
      </div>

      {/* Lado direito com o formulário */}
      <div className={styles.right}>
        <h1 className={styles.title}>NEOBYTE</h1>
        <p className={styles.subtitle}>Bem-vindo de volta!</p>

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.errorEemail}>
            <p className={styles.labelsES}>Email</p>
            {error && <p className={`${styles.error} ${styles.errorText}`}>{error}</p>}
          </div>

          <input
            type="email"
            placeholder="Digite seu email..."
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p className={styles.labelsES}>Senha</p>
          <div className={styles.senhaContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha..."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />

            <button 
              type="button" 
              className={styles.icone}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Visualizar senha"}
            >
              <img 
                src={showPassword ? "/Neobyte/vizualizar-off.svg" : "/Neobyte/vizualizar.svg"} 
                alt={showPassword ? "Ocultar senha" : "Visualizar senha"} 
              />
            </button>
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className={styles.register}>
          <span className={styles.pergunta}>Não possui uma conta?</span>{" "}
          <Link href="/Cadastro" className={styles.cadastrar}>
            Clique aqui para se cadastrar!
          </Link>
        </p>
      </div>
    </div>
  );
}
