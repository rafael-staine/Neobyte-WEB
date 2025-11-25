"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Perfil.module.css";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Utilitários
  const onlyDigits = (str) => (str ? String(str).replace(/\D+/g, "") : "");

  const formatCpf = (value) => {
    const digits = onlyDigits(value).slice(0, 11);
    if (!digits) return "";
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3}\.\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, "$1-$2");
  };

  const formatPhone = (value) => {
    const digits = onlyDigits(value).slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1)$2")
        .replace(/^(\(\d{2}\)\d{4})(\d)/, "$1-$2");
    }
    return digits
      .replace(/^(\d{2})(\d)/, "($1)$2")
      .replace(/^(\(\d{2}\)\d{5})(\d)/, "$1-$2");
    };

  function validarCpf(cpfStr) {
    const c = onlyDigits(cpfStr);
    if (c.length !== 11 || /^([0-9])\1+$/.test(c)) return false;
    let soma = 0,
      resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(c.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(c.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(c.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(c.substring(10, 11))) return false;
    return true;
  }

  function validarTelefone(telefone) {
    const t = onlyDigits(telefone);
    return t.length === 10 || t.length === 11;
  }

  useEffect(() => {
    const saved = localStorage.getItem("neobyteUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setNome(parsed.nome || "");
        setCpf(parsed.cpf ? formatCpf(String(parsed.cpf)) : "");
        setEmail(parsed.email || "");
        setTelefone(parsed.telefone ? formatPhone(String(parsed.telefone)) : "");
        // campos removidos: dataNascimento e rg não fazem parte do schema Prisma
      } catch (err) {
        console.error("Erro ao ler usuário do localStorage:", err);
      }
    }
    setUserLoaded(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("neobyteLoggedIn");
    localStorage.removeItem("neobyteUser");
    router.push("/");
  };

  // Fluxo de alteração de senha via campos adicionais removido

  const handleSave = async () => {
    if (!user) return;
    const uid = user.id || user.ID || user._id || user.userId;
    if (!uid) {
      alert("Não foi possível identificar o usuário. Faça login novamente.");
      return;
    }
    setLoading(true);
    const payload = {
      ...user,
      nome,
      cpf: cpf ? onlyDigits(cpf) : null,
      email,
      telefone: telefone ? onlyDigits(telefone) : null,
    };
    if (senha) {
      if (senha.length < 4) {
        alert("A nova senha deve ter ao menos 4 caracteres.");
        setLoading(false);
        return;
      }
      payload.senha = senha;
    }
    try {
      const resp = await fetch(`http://localhost:4000/user/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const text = await resp.text();
        console.error("Falha ao salvar perfil", resp.status, text);
        setLoading(false);
        alert("Falha ao salvar perfil. Tente novamente.");
        return;
      }
      const data = await resp.json();
      const profile = data.profile || data;
      localStorage.setItem("neobyteUser", JSON.stringify(profile));
      setUser(profile);
      setLoading(false);
      alert("Perfil atualizado com sucesso.");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setLoading(false);
      alert("Erro ao salvar perfil. Tente novamente.");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const uid = user.id || user.ID || user._id || user.userId;
    if (!uid) return;
    const confirmDelete = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (!confirmDelete) return;
    try {
      const resp = await fetch(`http://localhost:4000/user/${uid}`, { method: "DELETE" });
      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Falha ao excluir conta", resp.status, txt);
        alert("Falha ao excluir conta. Tente novamente.");
        return;
      }
      localStorage.removeItem("neobyteLoggedIn");
      localStorage.removeItem("neobyteUser");
      alert("Conta excluída com sucesso.");
      router.push("/");
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      alert("Erro ao excluir conta. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/perfil.svg" title={`Olá, ${user?.nome || "Usuário"}`} />

      <section>
        <div className={styles.container}>
          <div className={styles.cadastro}>
            <h2>Meu Cadastro - Conta Pessoal</h2>

            <div className={styles.campo}>
              <p>
                Nome Completo
                <span style={{ fontSize: 13, color: "#aaa", marginLeft: 10 }}>{userLoaded && (user.nome || "Ainda nao cadastrado")}</span>
              </p>
              <input type="text" placeholder="Editar nome" className={styles.inputNome} value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

                    <div className={styles.dados}>
                      <div className={styles.campo}>
                        <p>
                          CPF
                          <span style={{ fontSize: 13, color: "#aaa", marginLeft: 10 }}>{userLoaded && (user.cpf || "Ainda nao cadastrado")}</span>
                        </p>
                        <input type="text" placeholder="Editar CPF" className={styles.inputDados} value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} />
                      </div>
                    </div>

            <div className={styles.contatos}>
              <div className={styles.campo}>
                <p>
                  E-mail
                  <span style={{ fontSize: 13, color: "#aaa", marginLeft: 10 }}>{userLoaded && (user.email || "Ainda nao cadastrado")}</span>
                </p>
                <input type="text" placeholder="Editar e-mail" className={styles.inputContatos} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={styles.campo}>
                <p>
                  Telefone
                  <span style={{ fontSize: 13, color: "#aaa", marginLeft: 10 }}>{userLoaded && (user.telefone || "Ainda nao cadastrado")}</span>
                </p>
                <input type="text" placeholder="Editar telefone" className={styles.inputContatos} value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} />
              </div>
            </div>

            <div className={styles.senhaSection}>
              <h3>Alterar senha</h3>
              <div className={styles.campo}>
                <p>Nova senha</p>
                <input type="password" placeholder="Nova senha" className={styles.inputContatos} value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>
            </div>

            {/* Botão de alteração de senha removido — apenas campo "Nova senha" permanece acima */}

            <div className={styles.botoes}>
              <div className={styles.botoesEsquerda}>
                <button onClick={handleDelete} className={styles.excluir} disabled={loading}>Excluir minha conta</button>
                <button onClick={handleLogout} className={styles.logout}>Sair</button>
              </div>
              <button onClick={handleSave} className={styles.salvar} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}