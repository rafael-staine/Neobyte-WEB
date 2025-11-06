"use client";

import { useState } from "react";
import styles from "./Cadastro.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  // Botão voltar para header inicial
  const handleBack = (e) => {
    e.preventDefault();
    router.push("/");
  };

  function gerarTokenSimples() {
    // Token simples para demo (não use em produção)
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Preencha o email.");
      return;
    }
    if (!password || password.length < 4) {
      setError("Senha deve ter ao menos 4 caracteres.");
      return;
    }

    setSaving(true);

    const newUser = {
      email: email.trim(),
      password: password,
      token: gerarTokenSimples(),
      createdAt: new Date().toISOString(),
    };

    try {
      // Recupera a lista existente de usuários ou cria uma nova
      let usersList = [];
      const existingUsersJSON = localStorage.getItem("neobyteUsers");
      if (existingUsersJSON) {
        usersList = JSON.parse(existingUsersJSON);
      }

      // Adiciona o novo usuário à lista
      usersList.push(newUser);

      // Salva a lista atualizada
      localStorage.setItem("neobyteUsers", JSON.stringify(usersList));

      // Define este usuário como o atual
      localStorage.setItem("neobyteUser", JSON.stringify(newUser));
      localStorage.setItem("neobyteLoggedIn", "true");

      // Mostra todos os usuários cadastrados no console
      console.log("=== Usuários Cadastrados ===");
      usersList.forEach((user, index) => {
        console.log(`\nUsuário ${index + 1}:`);
        console.log("Email:", user.email);
        console.log("Senha:", user.password);
        console.log("Data de cadastro:", new Date(user.createdAt).toLocaleString());
        console.log("Token:", user.token);
      });

      console.log("\n=== Usuário Atual (Logado) ===");
      console.log("Email:", newUser.email);
      console.log("Senha:", newUser.password);
      console.log("Data de cadastro:", new Date(newUser.createdAt).toLocaleString());

      // Pequeno atraso para UX
      setTimeout(() => {
        setSaving(false);
        // Redireciona para página inicial após cadastro
        router.push("/");
      }, 700);
    } catch (err) {
      console.error("Erro ao salvar no localStorage:", err);
      setError("Não foi possível salvar os dados localmente.");
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Lado esquerdo agora fica o formulário */}
      <div className={styles.left}>
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton} aria-label="Voltar para o início">&lt; Voltar</button>
        </div>
        <h1 className={styles.title}>NEOBYTE</h1>
        <p className={styles.subtitle}>Cadastre-se!</p>

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.emailEerror}>
            <p className={styles.labelsES}>Email</p>
            {error && <p className={styles.error}>{error}</p>}
          </div>

          <input
            type="email"
            placeholder="Digite seu email..."
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className={styles.labelsES}>Senha</p>
          <div className={styles.senhaContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha..."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className={styles.icone} 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Visualizar senha"}
            >
              <img 
                src={showPassword ? "/Neobyte/vizualizar-b-off.svg" : "/Neobyte/vizualizar-b.svg"} 
                alt={showPassword ? "Ocultar senha" : "Visualizar senha"} 
              />
            </button>
          </div>

          <button type="submit" className={styles.button} disabled={saving}>
            {saving ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className={styles.register}>
          <span className={styles.pergunta}>Já possui uma conta?</span>{" "}
          <Link href="/Entrar" className={styles.cadastrar}>
            Clique aqui para entrar!
          </Link>
        </p>
      </div>

      {/* Lado direito agora fica logo e texto */}
      <div className={styles.right}>
        <img src="/logo/logo-branca.svg" alt="Logo" className={styles.logo} />
        <img src="/logo/text-branco.svg" alt="text" className={styles.text} />
      </div>
    </div>
  );
}
