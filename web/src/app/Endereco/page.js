"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import styles from "./Endereco.module.css";

export default function Endereco() {
  const [user, setUser] = useState(null);
  const [enderecos, setEnderecos] = useState([]);

  const [editando, setEditando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({
    titulo: "",
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
  });

  // Ao montar: carrega usuário da sessão (localStorage) e busca endereços do backend
  useEffect(() => {
    try {
      const saved = localStorage.getItem("neobyteUser");
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        fetchEnderecos(parsed.id);
      }
    } catch (err) {
      console.error("Erro ao obter usuário da sessão:", err);
    }
  }, []);

  const mapBackendToFrontend = (a) => ({
    id: a.id,
    titulo: a.nome || "",
    rua: a.rua || "",
    numero: a.numero != null ? String(a.numero) : "",
    bairro: a.bairro || "",
    cep: a.complemento || "",
    cidade: a.cidade || "",
    estado: a.estado || "",
  });

  const mapFrontendToBackend = (f) => ({
    nome: f.titulo,
    rua: f.rua,
    cep: f.cep,
    numero: f.numero ? Number(f.numero) : null,
    bairro: f.bairro,
    complemento: f.cep,
    cidade: f.cidade,
    estado: f.estado,
  });

  const fetchEnderecos = async (userId) => {
    if (!userId) return;
    try {
      const resp = await fetch(`http://localhost:4000/adress/user/${userId}`);
      if (!resp.ok) {
        console.error("Falha ao buscar endereços", resp.status);
        return;
      }
      const data = await resp.json();
      const list = Array.isArray(data.adress) ? data.adress.map(mapBackendToFrontend) : [];
      setEnderecos(list);
    } catch (err) {
      console.error("Erro ao buscar endereços:", err);
    }
  };

  const adicionarEndereco = () => {
    if (!user || !user.id) {
      alert("Você precisa estar logado para adicionar um endereço.");
      return;
    }

    if (!novoEndereco.titulo || !novoEndereco.rua || !novoEndereco.numero || !novoEndereco.estado) {
      alert("Preencha pelo menos o título, rua, número e estado.");
      return;
    }

    const payload = { ...mapFrontendToBackend(novoEndereco), user_id: user.id };
    console.log("Payload para criar endereço:", payload);

    (async () => {
      try {
        const resp = await fetch("http://localhost:4000/adress/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!resp.ok) {
          console.error("Falha ao criar endereço", resp.status);
          alert("Erro ao criar endereço.");
          return;
        }
        const data = await resp.json();
        const created = data.adress;
        setEnderecos((prev) => [...prev, mapBackendToFrontend(created)]);
        setNovoEndereco({
          titulo: "",
          rua: "",
          numero: "",
          bairro: "",
          cep: "",
          complemento: "",
          cidade: "",
          estado: "",
        });
        setMostrarPopup(false);
      } catch (err) {
        console.error("Erro ao criar endereço:", err);
        alert("Erro ao criar endereço.");
      }
    })();
  };

  const deletarEndereco = (index) => {
    if (!user || !user.id) {
      alert("Você precisa estar logado para excluir um endereço.");
      return;
    }

    const endereco = enderecos[index];
    if (!endereco || !endereco.id) {
      // item local não possui id — remove localmente
      const novos = [...enderecos];
      novos.splice(index, 1);
      setEnderecos(novos);
      return;
    }

    (async () => {
      try {
        const resp = await fetch("http://localhost:4000/adress/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: endereco.id, user_id: user.id }),
        });
        if (!resp.ok) {
          console.error("Falha ao deletar endereço", resp.status);
          alert("Erro ao deletar endereço.");
          return;
        }
        // remove localmente
        const novos = [...enderecos];
        novos.splice(index, 1);
        setEnderecos(novos);
      } catch (err) {
        console.error("Erro ao deletar endereço:", err);
        alert("Erro ao deletar endereço.");
      }
    })();
  };

  const editarEndereco = (index) => {
    setEditando(index);
  };

  const salvarEdicao = (index, enderecoEditado) => {
    if (!user || !user.id) {
      alert("Você precisa estar logado para editar um endereço.");
      return;
    }

    const endereco = enderecoEditado;
    // se o endereço não tiver id local, não há como editar no backend
    if (!endereco.id) {
      const novos = [...enderecos];
      novos[index] = endereco;
      setEnderecos(novos);
      setEditando(null);
      return;
    }

    const payload = { id: endereco.id, user_id: user.id, ...mapFrontendToBackend(endereco) };

    (async () => {
      try {
        const resp = await fetch("http://localhost:4000/adress/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!resp.ok) {
          console.error("Falha ao editar endereço", resp.status);
          alert("Erro ao editar endereço.");
          return;
        }
        const data = await resp.json();
        const updated = data.adress;
        const novos = [...enderecos];
        novos[index] = mapBackendToFrontend(updated);
        setEnderecos(novos);
        setEditando(null);
      } catch (err) {
        console.error("Erro ao editar endereço:", err);
        alert("Erro ao editar endereço.");
      }
    })();
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
                  <select
                    value={endereco.estado || ""}
                    onChange={(e) =>
                      setEnderecos((prev) => {
                        const novos = [...prev];
                        novos[index].estado = e.target.value;
                        return novos;
                      })
                    }
                  >
                    <option value="">Selecione o Estado</option>
                    <option value="AC">Acre (AC)</option>
                    <option value="AL">Alagoas (AL)</option>
                    <option value="AP">Amapá (AP)</option>
                    <option value="AM">Amazonas (AM)</option>
                    <option value="BA">Bahia (BA)</option>
                    <option value="CE">Ceará (CE)</option>
                    <option value="DF">Distrito Federal (DF)</option>
                    <option value="ES">Espírito Santo (ES)</option>
                    <option value="GO">Goiás (GO)</option>
                    <option value="MA">Maranhão (MA)</option>
                    <option value="MT">Mato Grosso (MT)</option>
                    <option value="MS">Mato Grosso do Sul (MS)</option>
                    <option value="MG">Minas Gerais (MG)</option>
                    <option value="PA">Pará (PA)</option>
                    <option value="PB">Paraíba (PB)</option>
                    <option value="PR">Paraná (PR)</option>
                    <option value="PE">Pernambuco (PE)</option>
                    <option value="PI">Piauí (PI)</option>
                    <option value="RJ">Rio de Janeiro (RJ)</option>
                    <option value="RN">Rio Grande do Norte (RN)</option>
                    <option value="RS">Rio Grande do Sul (RS)</option>
                    <option value="RO">Rondônia (RO)</option>
                    <option value="RR">Roraima (RR)</option>
                    <option value="SC">Santa Catarina (SC)</option>
                    <option value="SP">São Paulo (SP)</option>
                    <option value="SE">Sergipe (SE)</option>
                    <option value="TO">Tocantins (TO)</option>
                  </select>
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
                    {endereco.estado && ` - ${endereco.estado}`}
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
            <select
              value={novoEndereco.estado}
              onChange={(e) =>
                setNovoEndereco({ ...novoEndereco, estado: e.target.value })
              }
            >
              <option value="">Selecione o Estado</option>
              <option value="AC">Acre (AC)</option>
              <option value="AL">Alagoas (AL)</option>
              <option value="AP">Amapá (AP)</option>
              <option value="AM">Amazonas (AM)</option>
              <option value="BA">Bahia (BA)</option>
              <option value="CE">Ceará (CE)</option>
              <option value="DF">Distrito Federal (DF)</option>
              <option value="ES">Espírito Santo (ES)</option>
              <option value="GO">Goiás (GO)</option>
              <option value="MA">Maranhão (MA)</option>
              <option value="MT">Mato Grosso (MT)</option>
              <option value="MS">Mato Grosso do Sul (MS)</option>
              <option value="MG">Minas Gerais (MG)</option>
              <option value="PA">Pará (PA)</option>
              <option value="PB">Paraíba (PB)</option>
              <option value="PR">Paraná (PR)</option>
              <option value="PE">Pernambuco (PE)</option>
              <option value="PI">Piauí (PI)</option>
              <option value="RJ">Rio de Janeiro (RJ)</option>
              <option value="RN">Rio Grande do Norte (RN)</option>
              <option value="RS">Rio Grande do Sul (RS)</option>
              <option value="RO">Rondônia (RO)</option>
              <option value="RR">Roraima (RR)</option>
              <option value="SC">Santa Catarina (SC)</option>
              <option value="SP">São Paulo (SP)</option>
              <option value="SE">Sergipe (SE)</option>
              <option value="TO">Tocantins (TO)</option>
            </select>

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
