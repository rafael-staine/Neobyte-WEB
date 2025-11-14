"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Perfil.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Cadastro() {
  const router = useRouter();
  // Estados para os campos editáveis
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  // Função para formatar data como dd/mm/aaaa
  function formatarDataNascimento(valor) {
    // Remove tudo que não for número
    let v = valor.replace(/\D/g, "");
    if (v.length > 2 && v.length <= 4) {
      v = v.replace(/(\d{2})(\d+)/, "$1/$2");
    } else if (v.length > 4) {
      v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    }
    return v;
  }
  const [cpf, setCpf] = useState("");

  // Função para formatar CPF (123.123.123-12)
  function formatarCpf(valor) {
    let v = valor.replace(/\D/g, "").slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    return v;
  }

  // Função para validar CPF
  function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  // Função para formatar telefone brasileiro (com DDD)
  function formatarTelefone(valor) {
    let v = valor.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    else v = v.replace(/(\d{0,2})/, "$1");
    return v;
  }

  // Função para validar telefone brasileiro (10 ou 11 dígitos)
  function validarTelefone(telefone) {
    const t = telefone.replace(/\D/g, "");
    return t.length === 10 || t.length === 11;
  }
  const [rg, setRg] = useState("");

  // Função para formatar RG (12.123.123-1)
  function formatarRg(valor) {
    let v = valor.replace(/\D/g, "").slice(0, 9);
    if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
    else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,3})/, "$1.$2");
    return v;
  }

  // Função para validar RG (9 dígitos, formato 12.123.123-1, não pode ser sequência repetida)
  function validarRg(rg) {
    const rgNum = rg.replace(/\D/g, "");
    if (rgNum.length !== 9) return false;
    if (/^(\d)\1+$/.test(rgNum)) return false; // não pode ser todos iguais
    // Validação básica de formato já é feita na máscara
    return true;
  }
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  // Estados auxiliares
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [userData, setUserData] = useState({});

  // Carrega dados do usuário ao montar
  React.useEffect(() => {
    const currentUserJSON = localStorage.getItem("neobyteUser");
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON);
      setUserData(user);
      setNome(user.nome || "");
      setDataNascimento(user.dataNascimento || "");
      setCpf(user.cpf || "");
      setRg(user.rg || "");
      setEmail(user.email || "");
      setTelefone(user.telefone || "");
    }
    setUserLoaded(true);
  }, []);

  const handleChangePassword = () => {
    setError("");
    setSuccess("");

    try {
      // Recupera o usuário atual e a lista de usuários
      const currentUserJSON = localStorage.getItem("neobyteUser");
      const usersListJSON = localStorage.getItem("neobyteUsers");

      if (!currentUserJSON || !usersListJSON) {
        setError("Erro ao acessar dados do usuário.");
        return;
      }

      const currentUser = JSON.parse(currentUserJSON);
      const usersList = JSON.parse(usersListJSON);

      // Verifica se a senha antiga está correta
      if (currentUser.password !== oldPassword) {
        setError("Senha atual incorreta.");
        return;
      }

      // Valida a nova senha
      if (newPassword.length < 4) {
        setError("A nova senha deve ter pelo menos 4 caracteres.");
        return;
      }

      // Atualiza a senha do usuário na lista
      const updatedUsersList = usersList.map(user => {
        if (user.email === currentUser.email) {
          return { ...user, password: newPassword };
        }
        return user;
      });

      // Atualiza o usuário atual
      const updatedUser = { ...currentUser, password: newPassword };

      // Salva as alterações no localStorage
      localStorage.setItem("neobyteUsers", JSON.stringify(updatedUsersList));
      localStorage.setItem("neobyteUser", JSON.stringify(updatedUser));

      // Mostra mensagem de sucesso
      setSuccess("Senha alterada com sucesso!");
      setOldPassword("");
      setNewPassword("");
      setShowChangePassword(false);

      // Log para conferência
      console.log("=== Senha Alterada ===");
      console.log("Email:", currentUser.email);
      console.log("Nova senha definida com sucesso");

    } catch (err) {
      console.error("Erro ao alterar senha:", err);
      setError("Erro ao alterar senha. Tente novamente.");
    }
  };

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
              <p>
                Nome Completo
                <span style={{ fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                  {userLoaded && (userData.nome ? userData.nome : "Ainda nao cadastrado")}
                </span>
              </p>
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
                <p>
                  Data de nascimento
                  <span style={{ fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                    {userLoaded && (userData.dataNascimento ? userData.dataNascimento : "Ainda nao cadastrado")}
                  </span>
                </p>
                <input
                  type="text"
                  placeholder="Editar data"
                  className={styles.inputDados}
                  value={dataNascimento}
                  maxLength={10}
                  onChange={e => setDataNascimento(formatarDataNascimento(e.target.value))}
                />
              </div>
              <div className={styles.campo}>
                <p>
                  CPF
                  <span style={{ fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                    {userLoaded && (userData.cpf ? userData.cpf : "Ainda nao cadastrado")}
                  </span>
                </p>
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
                <p>
                  E-mail
                  <span style={{ fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                    {userLoaded && (userData.email ? userData.email : "Ainda nao cadastrado")}
                  </span>
                </p>
                <input
                  type="text"
                  placeholder="Editar e-mail"
                  className={styles.inputContatos}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.campo}>
                <p>
                  Telefone
                  <span style={{ fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                    {userLoaded && (userData.telefone ? userData.telefone : "Ainda nao cadastrado")}
                  </span>
                </p>
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

            {/* Seção de alteração de senha */}
            <div className={styles.senhaSection}>
              <button
                type="button"
                onClick={() => setShowChangePassword(!showChangePassword)}
                className={styles.toggleSenha}
              >
                {showChangePassword ? "Cancelar alteração" : "Alterar senha"}
              </button>

              {showChangePassword && (
                <div className={styles.formSenha}>
                  <div className={styles.campo}>
                    <p>Senha atual</p>
                    <div className={styles.senhaContainer}>
                      <input
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Digite sua senha atual"
                        className={styles.inputSenha}
                      />
                      <button 
                        type="button" 
                        className={styles.icone}
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        aria-label={showOldPassword ? "Ocultar senha atual" : "Visualizar senha atual"}
                      >
                        <img 
                          src={showOldPassword ? "/Neobyte/vizualizar-b-off.svg" : "/Neobyte/vizualizar-b.svg"} 
                          alt={showOldPassword ? "Ocultar senha" : "Visualizar senha"} 
                        />
                      </button>
                    </div>
                  </div>
                  <div className={styles.campo}>
                    <p>Nova senha</p>
                    <div className={styles.senhaContainer}>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite a nova senha"
                        className={styles.inputSenha}
                      />
                      <button 
                        type="button" 
                        className={styles.icone}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? "Ocultar nova senha" : "Visualizar nova senha"}
                      >
                        <img 
                          src={showNewPassword ? "/Neobyte/vizualizar-off.svg" : "/Neobyte/vizualizar.svg"} 
                          alt={showNewPassword ? "Ocultar senha" : "Visualizar senha"} 
                        />
                      </button>
                    </div>
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                  {success && <p className={styles.success}>{success}</p>}
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className={styles.salvarSenha}
                  >
                    Salvar nova senha
                  </button>
                </div>
              )}
            </div>
            <div className={styles.botoes}>
              <div className={styles.botoesEsquerda}>
                <button onClick={handleDelete} className={styles.excluir} disabled={loading}>Excluir minha conta</button>
                <button onClick={handleLogout} className={styles.logout}>Sair</button>
              </div>
              <button onClick={handleSave} className={styles.salvar} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
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
