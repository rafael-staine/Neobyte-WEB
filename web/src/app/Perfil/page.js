
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Perfil.module.css";
import { useRouter } from "next/navigation";



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

  const handleLogout = () => {
    // Remove apenas o status de logado, mantendo os dados do usuário
    localStorage.removeItem("neobyteLoggedIn");
    //Redireciona para a página inicial (header inicial)
    router.push("/");
  };

  const handleDeleteAccount = () => {
    // Pede confirmação do usuário antes de deletar
    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
    );

    if (!isConfirmed) {
      return; // Se o usuário cancelar, não faz nada
    }

    try {
      // Recupera o usuário atual e a lista de usuários
      const currentUserJSON = localStorage.getItem("neobyteUser");
      const usersListJSON = localStorage.getItem("neobyteUsers");

      if (!currentUserJSON || !usersListJSON) {
        console.error("Dados do usuário não encontrados");
        return;
      }

      const currentUser = JSON.parse(currentUserJSON);
      const usersList = JSON.parse(usersListJSON);

      // Remove o usuário atual da lista
      const updatedUsersList = usersList.filter(user => user.email !== currentUser.email);

      // Atualiza a lista no localStorage
      localStorage.setItem("neobyteUsers", JSON.stringify(updatedUsersList));

      // Limpa os dados do usuário atual
      localStorage.removeItem("neobyteUser");
      localStorage.removeItem("neobyteLoggedIn");

      // Log para conferência
      console.log("=== Conta Excluída ===");
      console.log("Email removido:", currentUser.email);
      console.log("Usuários restantes:", updatedUsersList.length);

      // Redireciona para a página inicial
      router.push("/");
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
    }
  };
  // Função para salvar alterações
  function validarDataNascimento(data) {
    // Espera dd/mm/aaaa
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return { valido: false, erro: "Data de nascimento invalida" };
    const [dia, mes, ano] = data.split("/").map(Number);
    if (mes < 1 || mes > 12 || dia < 1) return { valido: false, erro: "Data de nascimento invalida" };
    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia > diasNoMes) return { valido: false, erro: "Data de nascimento invalida" };
    // Idade
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);
    const idade = hoje.getFullYear() - ano - (hoje < new Date(hoje.getFullYear(), mes - 1, dia) ? 1 : 0);
    if (idade < 0 || idade > 112) return { valido: false, erro: "Data de nascimento invalida" };
    if (idade < 16) return { valido: false, erro: "A idade minima e de 16 anos" };
    return { valido: true };
  }

  const handleSave = () => {
    setError("");
    setSuccess("");
    // Só valida data de nascimento se o campo foi preenchido
    if (dataNascimento !== "") {
      const validacao = validarDataNascimento(dataNascimento);
      if (!validacao.valido) {
        setSuccess("");
        setError(validacao.erro);
        return;
      }
    }
    // Só valida CPF se o campo foi preenchido
    if (cpf !== "" && !validarCpf(cpf)) {
      setSuccess("");
      setError("CPF inválido");
      return;
    }
    // Só valida RG se o campo foi preenchido
    if (rg !== "" && !validarRg(rg)) {
      setSuccess("");
      setError("RG inválido");
      return;
    }
    // Só valida telefone se o campo foi preenchido
    if (telefone !== "" && !validarTelefone(telefone)) {
      setSuccess("");
      setError("Telefone inválido");
      return;
    }
    try {
      const currentUserJSON = localStorage.getItem("neobyteUser");
      const usersListJSON = localStorage.getItem("neobyteUsers");
      if (!currentUserJSON || !usersListJSON) {
        setError("Erro ao acessar dados do usuário.");
        return;
      }
      const currentUser = JSON.parse(currentUserJSON);
      const usersList = JSON.parse(usersListJSON);
      // Atualiza os dados do usuário
      const updatedUser = {
        ...currentUser,
        nome: nome !== "" ? nome : currentUser.nome,
        dataNascimento: dataNascimento !== "" ? dataNascimento : currentUser.dataNascimento,
        cpf: cpf !== "" ? cpf : currentUser.cpf,
        rg: rg !== "" ? rg : currentUser.rg,
        email: email !== "" ? email : currentUser.email,
        telefone: telefone !== "" ? telefone : currentUser.telefone,
      };
      // Atualiza na lista de usuários
      const updatedUsersList = usersList.map(user =>
        user.email === currentUser.email ? updatedUser : user
      );
      localStorage.setItem("neobyteUser", JSON.stringify(updatedUser));
      localStorage.setItem("neobyteUsers", JSON.stringify(updatedUsersList));
      setUserData(updatedUser);
      setSuccess("Dados salvos com sucesso!");
    } catch (err) {
      setError("Erro ao salvar dados. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <SubHeader logo="/Neobyte/perfil.svg" title="Olá, Usuário" />
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
                onChange={e => setNome(e.target.value)}
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
                  maxLength={14}
                  onChange={e => setCpf(formatarCpf(e.target.value))}
                />
              </div>
              <div className={styles.campo}>
                <p>
                  RG
                  <span style={{ fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                    {userLoaded && (userData.rg ? userData.rg : "Ainda nao cadastrado")}
                  </span>
                </p>
                <input
                  type="text"
                  placeholder="Editar RG"
                  className={styles.inputDados}
                  value={rg}
                  maxLength={12}
                  onChange={e => setRg(formatarRg(e.target.value))}
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
                  onChange={e => setEmail(e.target.value)}
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
                  maxLength={15}
                  onChange={e => setTelefone(formatarTelefone(e.target.value))}
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
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Digite sua senha atual"
                      className={styles.inputSenha}
                    />
                  </div>
                  <div className={styles.campo}>
                    <p>Nova senha</p>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite a nova senha"
                      className={styles.inputSenha}
                    />
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
                <button onClick={handleDeleteAccount} className={styles.excluir}>Excluir minha conta</button>
                <button onClick={handleLogout} className={styles.logout}>Sair</button>
              </div>
              <button className={styles.salvar} onClick={handleSave}>Salvar</button>
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
