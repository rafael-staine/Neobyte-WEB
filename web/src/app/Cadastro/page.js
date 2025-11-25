"use client";

import { useState } from "react";
import styles from "./Cadastro.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/PasswordField";

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

  const handleSubmit = async (e) => {
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
      nome: "Nome do usuario",
      email: email.trim(),
      senha: password,
    };

    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errText = await response.text();
        setError("Erro ao cadastrar: " + (errText || response.status));
        setSaving(false);
        return;
      }

      const data = await response.json();
      // backend retorna { message, profile }
      const profile = data.profile || data;

      // salva sessão/localStorage automaticamente após cadastro
      try {
        localStorage.setItem("neobyteUser", JSON.stringify(profile));
        localStorage.setItem("neobyteLoggedIn", "true");
      } catch (err) {
        console.warn("Não foi possível salvar no localStorage:", err);
      }

      // vai para a página de perfil
      router.push("/Perfil");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
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
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha..."
            inputClass={styles.input}
            wrapperClass={styles.senhaContainer}
            iconClass={styles.icone}
            iconOff="/Neobyte/vizualizar-b-off.svg"
            iconOn="/Neobyte/vizualizar-b.svg"
          />

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
