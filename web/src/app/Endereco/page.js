"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Endereco.module.css";

export default function Endereco() {
  // Inicializa diretamente a partir do localStorage para evitar
  // sobrescrever os dados salvos durante o primeiro mount.
  const [enderecos, setEnderecos] = useState(() => {
    try {
      const saved = typeof window !== "undefined" && localStorage.getItem("enderecos");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [editando, setEditando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({
    titulo: "",
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
  });

  // Salvar no localStorage sempre que `enderecos` mudar.
  // A leitura já é feita na inicialização do state acima, assim
  // evitamos o problema onde um efeito de salvar rodaria no mount
  // e sobrescreveria dados previamente salvos.
  useEffect(() => {
    try {
      localStorage.setItem("enderecos", JSON.stringify(enderecos));
    } catch (e) {
      // falha silenciosa — localStorage pode estar indisponível
      console.error("Erro ao salvar enderecos no localStorage:", e);
    }
  }, [enderecos]);

  const adicionarEndereco = () => {
    if (
      !novoEndereco.titulo ||
      !novoEndereco.rua ||
      !novoEndereco.numero ||
      !novoEndereco.cep
    ) {
      alert("Preencha pelo menos o título, rua, número e CEP.");
      return;
    }

    setEnderecos([...enderecos, novoEndereco]);
    setNovoEndereco({
      titulo: "",
      rua: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
    });
    setMostrarPopup(false);
  };

  const deletarEndereco = (index) => {
    const novos = [...enderecos];
    novos.splice(index, 1);
    setEnderecos(novos);
  };

  const editarEndereco = (index) => {
    setEditando(index);
  };

  const salvarEdicao = (index, enderecoEditado) => {
    const novos = [...enderecos];
    novos[index] = enderecoEditado;
    setEnderecos(novos);
    setEditando(null);
  };

  return (
    <div>
      <Header />
      <SubHeader logo="/Neobyte/endereco.svg" title="Endereços" />

      <div className={styles.container}>
        <div className={styles.topBar}>
          <button
            className={styles.btnAdicionar}
            onClick={() => setMostrarPopup(true)}
          >
            + Adicionar Endereço
          </button>
        </div>

        {enderecos.length === 0 && (
            <p className={styles.semEndereco}>Nenhum endereço cadastrado.</p>
          )}

        <div className={styles.containerEnderecos}>

          {enderecos.map((endereco, index) => (
            <div key={index} className={styles.enderecos}>
              {editando === index ? (
                <>
                  <input
                    type="text"
                    value={endereco.titulo}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].titulo = e.target.value;
                        return novos;
                      })
                    }
                    placeholder="Título"
                  />
                  <input
                    type="text"
                    value={endereco.rua}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].rua = e.target.value;
                        return novos;
                      })
                    }
                    placeholder="Rua"
                  />
                  <input
                    type="text"
                    value={endereco.numero}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].numero = e.target.value;
                        return novos;
                      })
                    }
                    placeholder="Número"
                  />
                  <input
                    type="text"
                    value={endereco.bairro}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].bairro = e.target.value;
                        return novos;
                      })
                    }
                    placeholder="Bairro"
                  />
                  <input
                    type="text"
                    value={endereco.cep}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].cep = e.target.value;
                        return novos;
                      })
                    }
                    placeholder="CEP"
                  />
                  <input
                    type="text"
                    value={endereco.cidade}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].cidade = e.target.value;
                        return novos;
                      })
                    }
                    placeholder="Cidade"
                  />
                  <button
                    onClick={() => salvarEdicao(index, endereco)}
                    className={styles.txtSalvar}
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <h2>{endereco.titulo}</h2>
                  <p>{endereco.rua}</p>
                  <p>
                    Número {endereco.numero}
                    {endereco.bairro && `, ${endereco.bairro}`}
                  </p>
                  <p>
                    CEP: {endereco.cep}
                    {endereco.cidade && `, ${endereco.cidade}`}
                  </p>
                  <div className={styles.acoes}>
                    <button
                      onClick={() => editarEndereco(index)}
                      className={styles.txtEditar}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarEndereco(index)}
                      className={styles.txtExcluir}
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Popup para adicionar endereço */}
      {mostrarPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Novo Endereço</h3>
            <input
              type="text"
              placeholder="Título"
              value={novoEndereco.titulo}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, titulo: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Rua"
              value={novoEndereco.rua}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, rua: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Número"
              value={novoEndereco.numero}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, numero: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Bairro"
              value={novoEndereco.bairro}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, bairro: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="CEP"
              value={novoEndereco.cep}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, cep: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cidade"
              value={novoEndereco.cidade}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, cidade: e.target.value })
              }
            />

            <div className={styles.popupAcoes}>
              <button onClick={adicionarEndereco} className={styles.txtSalvar}>
                Salvar
              </button>
              <button
                onClick={() => setMostrarPopup(false)}
                className={styles.txtCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
