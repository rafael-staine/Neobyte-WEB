"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Perfil.module.css";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove apenas o status de logado, mantendo os dados do usuário
    localStorage.removeItem("neobyteLoggedIn");
    // Redireciona para a página de login
    router.push("/Entrar");
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
              <p>Nome Completo</p>
              <input
                type="text"
                placeholder="Editar nome"
                className={styles.inputNome}
              />
            </div>

            <div className={styles.dados}>
              <div className={styles.campo}>
                <p>Data de nascimento</p>
                <input
                  type="text"
                  placeholder="Editar data"
                  className={styles.inputDados}
                />
              </div>

              <div className={styles.campo}>
                <p>CPF</p>
                <input
                  type="text"
                  placeholder="Editar CPF"
                  className={styles.inputDados}
                />
              </div>

              <div className={styles.campo}>
                <p>RG</p>
                <input
                  type="text"
                  placeholder="Editar RG"
                  className={styles.inputDados}
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
                />
              </div>

              <div className={styles.campo}>
                <p>Telefone</p>
                <input
                  type="text"
                  placeholder="Editar telefone"
                  className={styles.inputContatos}
                />
              </div>
            </div>

            <div className={styles.botoes}>
              <div className={styles.botoesEsquerda}>
                <button className={styles.excluir}>Excluir minha conta</button>
                <button onClick={handleLogout} className={styles.logout}>Sair</button>
              </div>
              <button className={styles.salvar}>Salvar</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
