"use client";

import { useState, useEffect } from "react";
import styles from "./Entrar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Busca usuário no localStorage
      const savedUserJSON = localStorage.getItem("neobyteUser");
      if (!savedUserJSON) {
        setError("Usuário não encontrado. Por favor, cadastre-se.");
        setLoading(false);
        return;
      }

      const savedUser = JSON.parse(savedUserJSON);

      // Verifica se o email coincide
      if (savedUser.email !== email.trim()) {
        setError("Email não encontrado.");
        setLoading(false);
        return;
      }

      // Em um app real, NUNCA faríamos verificação de senha no frontend
      // Este é apenas um exemplo simulado para demonstração
      if (password.length < 4) {
        setError("Senha inválida.");
        setLoading(false);
        return;
      }

      // Login bem sucedido
      localStorage.setItem("neobyteLoggedIn", "true");

      // Pequeno delay para feedback visual
      setTimeout(() => {
        setLoading(false);
        router.push("/");
      }, 700);

    } catch (err) {
      console.error("Erro ao verificar login:", err);
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

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

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <p>Email</p>

          <input
            type="email"
            placeholder="Digite seu email..."
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p>Senha</p>
          <div className={styles.senhaContainer}>
            <input
              type="password"
              placeholder="Digite sua senha..."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />

            <button type="button" className={styles.icone}>
              <img src="/Neobyte/vizualizar.svg" alt="Visualizar senha" />
            </button>
          </div>

          {error && <p className={`${styles.error} ${styles.errorText}`}>{error}</p>}

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
