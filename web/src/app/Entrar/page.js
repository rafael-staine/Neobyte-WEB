"use client";

import { useState, useEffect } from "react";
import styles from "./Entrar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

    try {
      // Busca a lista de usuários e verifica as credenciais
      const usersListJSON = localStorage.getItem("neobyteUsers");
      const usersList = usersListJSON ? JSON.parse(usersListJSON) : [];
      const foundUser = usersList.find(user => user.email === email.trim());

      // Se não encontrou o usuário ou a senha está incorreta
      if (!foundUser || foundUser.password !== password) {
        setError("Usuário não encontrado, Senha ou Email incorretos.");
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
