"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Perfil.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cadastro() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // utilitárias de formatação
  const onlyDigits = (str) => (str ? String(str).replace(/\D+/g, "") : "");

  const formatCpf = (value) => {
    const digits = onlyDigits(value).slice(0, 11);
    if (!digits) return "";
    // 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3}\.\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, "$1-$2");
  };

  const formatPhone = (value) => {
    const digits = onlyDigits(value).slice(0, 11);
    if (!digits) return "";
    // formatos: (00)0000-0000 ou (00)00000-0000
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1)$2")
        .replace(/^(\(\d{2}\)\d{4})(\d)/, "$1-$2");
    }
    return digits
      .replace(/^(\d{2})(\d)/, "($1)$2")
      .replace(/^(\(\d{2}\)\d{5})(\d)/, "$1-$2");
  };

  useEffect(() => {
    // tenta obter perfil do localStorage
    const saved = localStorage.getItem("neobyteUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
  setNome(parsed.nome || "");
  // formata CPF e telefone ao preencher o formulário
  setCpf(parsed.cpf ? formatCpf(String(parsed.cpf)) : "");
  setEmail(parsed.email || "");
  setTelefone(parsed.telefone ? formatPhone(String(parsed.telefone)) : "");
        // campos que não existem no banco (data nascimento, rg) ficam vazios
        setDataNascimento("");
        setRg("");
      } catch (err) {
        console.error("Erro ao parsear usuário no localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    // Limpa dados de sessão
    localStorage.removeItem("neobyteLoggedIn");
    localStorage.removeItem("neobyteUser");
    router.push("/");
  };

  const handleSave = async () => {
    if (!user || !user.id) return;
    setLoading(true);

    // monta payload mesclando dados existentes com as alterações do formulário
    // envia apenas dígitos para o backend (o Prisma espera strings para cpf/telefone)
    const payload = {
      ...user,
      nome: nome,
      cpf: cpf ? onlyDigits(cpf) : null,
      email: email,
      telefone: telefone ? onlyDigits(telefone) : null,
    };

    // se usuário forneceu nova senha, inclui no payload para substituição
    if (senha) {
      if (senha.length < 4) {
        alert('A nova senha deve ter ao menos 4 caracteres.');
        setLoading(false);
        return;
      }
      payload.senha = senha;
    }

    try {
      const resp = await fetch(`http://localhost:4000/user/${user.id}`, {
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
      // atualiza localStorage com o novo perfil
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
    if (!user || !user.id) return;

    const confirmDelete = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (!confirmDelete) return;

    try {
      const resp = await fetch(`http://localhost:4000/user/${user.id}`, {
        method: "DELETE",
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Falha ao excluir conta", resp.status, txt);
        alert("Falha ao excluir conta. Tente novamente.");
        return;
      }

      // limpar sessão e redirecionar
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

      <SubHeader logo="/Neobyte/perfil.svg" title={`Olá, ${user?.nome || 'Usuário'}`} />

      <section>
        <div className={styles.container}>
          <div className={styles.cadastro}>
            <h2>Meu Cadastro - Conta Pessoal</h2>

            <div className={styles.campo}>
              <p>Nome Completo</p>
              <input
                type="text"
                placeholder="Editar nome"
                className={styles.inputNome}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.dados}>

              <div className={styles.campo}>
                <p>CPF</p>
                <input
                  type="text"
                  placeholder="Editar CPF"
                  className={styles.inputDados}
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                />
              </div>

              
            </div>

            <div className={styles.contatos}>
              <div className={styles.campo}>
                <p>E-mail</p>
                <input
                  type="text"
                  placeholder="Editar e-mail"
                  className={styles.inputContatos}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.campo}>
                <p>Telefone</p>
                <input
                  type="text"
                  placeholder="Editar telefone"
                  className={styles.inputContatos}
                  value={telefone}
                  onChange={(e) => setTelefone(formatPhone(e.target.value))}
                />
              </div>
            </div>

            <div className={styles.senhaSection}>
              <h3>Alterar senha</h3>
              <div className={styles.campo}>
                <p>Nova senha</p>
                <input
                  type="password"
                  placeholder="Nova senha"
                  className={styles.inputContatos}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.botoes}>
              <div className={styles.botoesEsquerda}>
                <button onClick={handleDelete} className={styles.excluir} disabled={loading}>Excluir minha conta</button>
                <button onClick={handleLogout} className={styles.logout}>Sair</button>
              </div>
              <button onClick={handleSave} className={styles.salvar} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
