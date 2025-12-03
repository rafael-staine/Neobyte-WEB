"use client";

import { useParams, useRouter } from 'next/navigation'; // Adicione useRouter aqui
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './Produto.module.css';
import ToastNotification from '../../../components/ToastNotification';
import ConfirmationModal from '../../../components/ConfirmationModal';

export default function Produto() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter(); // Inicialize o router aqui

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState({
    texto: '',
    estrela: 5
  });
  const [editandoComentario, setEditandoComentario] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregandoComentarios, setCarregandoComentarios] = useState(true);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [adicionandoAoCarrinho, setAdicionandoAoCarrinho] = useState(false);


  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success', 'error', 'info'
  });

  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: null,
    commentId: null
  });

  const showNotification = (message, type = 'success', duration = 3000) => {
    setNotification({
      show: true,
      message,
      type,
      hiding: false
    });

    setTimeout(() => {
      setNotification(prev => ({
        ...prev,
        hiding: true
      }));

      setTimeout(() => {
        setNotification(prev => ({
          ...prev,
          show: false
        }));
      }, 300);
    }, duration);
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      hiding: true
    }));

    setTimeout(() => {
      setNotification(prev => ({
        ...prev,
        show: false,
        hiding: false
      }));
    }, 300);
  };

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        const userData = localStorage.getItem("neobyteUser");
        const isLoggedIn = localStorage.getItem("neobyteLoggedIn") === "true";

        console.log('🔍 Dados do localStorage:');
        console.log('neobyteUser:', userData);
        console.log('neobyteLoggedIn:', isLoggedIn);
        console.log('ID do produto:', id);

        if (userData && isLoggedIn) {
          try {
            const user = JSON.parse(userData);
            console.log('✅ Usuário parseado do localStorage:', user);

            setUsuarioLogado({
              id: user.id,
              nome: user.nome || 'Usuário',
              email: user.email
            });

            console.log('🔄 Buscando dados atualizados da API...');
            const response = await fetch(`http://localhost:4000/user/${user.id}`);
            if (response.ok) {
              const data = await response.json();
              console.log('✅ Dados atualizados da API:', data.profile);
              setUsuarioLogado(data.profile);
            }
          } catch (parseError) {
            console.error('❌ Erro ao parsear dados do localStorage:', parseError);
            localStorage.removeItem("neobyteUser");
            localStorage.removeItem("neobyteLoggedIn");
            setUsuarioLogado(null);
          }
        } else {
          console.log('⚠️ Usuário não está logado no localStorage');
          setUsuarioLogado(null);
        }
      } catch (error) {
        console.error('🚨 Erro ao buscar usuário logado:', error);
        setUsuarioLogado(null);
      } finally {
        setCarregandoUsuario(false);
      }
    };

    fetchUsuarioLogado();

    if (id) {
      fetchProduto();
      fetchComentarios();
    }
  }, [id]);

  const fetchProduto = async () => {
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`);
      const data = await response.json();
      setProduto(data.product);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setCarregando(false);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await fetch(`http://localhost:4000/comment/product/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Comentários recebidos da API:', data);

      if (data.comment && Array.isArray(data.comment)) {
        setComentarios(data.comment);
      } else {
        setComentarios([]);
      }

    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      setComentarios([]);
    } finally {
      setCarregandoComentarios(false);
    }
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();

    console.log('📝 Tentando enviar comentário...');
    console.log('👤 Usuário logado:', usuarioLogado);
    console.log('📝 Texto do comentário:', novoComentario.texto);

    const isLoggedIn = localStorage.getItem("neobyteLoggedIn") === "true";
    const userData = localStorage.getItem("neobyteUser");

    if (!isLoggedIn || !userData || !usuarioLogado) {
      console.log('❌ Usuário não está logado!');
      console.log('neobyteLoggedIn:', localStorage.getItem("neobyteLoggedIn"));
      console.log('neobyteUser:', localStorage.getItem("neobyteUser"));

      showNotification('Você precisa estar logado para comentar', 'error');
      return;
    }

    if (!usuarioLogado.id) {
      console.log('❌ ID do usuário não encontrado!');
      console.log('Dados do usuário:', usuarioLogado);

      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.id) {
          console.log('🔄 Recuperando ID do localStorage:', parsedUser.id);
          setUsuarioLogado(prev => ({ ...prev, id: parsedUser.id }));
        } else {
          showNotification('Erro nas informações do usuário. Faça login novamente.', 'error');
          return;
        }
      } catch (error) {
        console.error('Erro ao parsear usuário:', error);
        showNotification('Erro nas informações do usuário. Faça login novamente.', 'error');
        return;
      }
    }

    if (!novoComentario.texto.trim()) {
      showNotification('Por favor, digite seu comentário', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texto: novoComentario.texto,
          estrela: novoComentario.estrela,
          produto_id: parseInt(id),
          user_id: usuarioLogado.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        const novoComentarioComUsuario = {
          ...data.comment,
          user: {
            id: usuarioLogado.id,
            nome: usuarioLogado.nome || 'Usuário'
          }
        };
        setComentarios([novoComentarioComUsuario, ...comentarios]);
        setNovoComentario({ texto: '', estrela: 5 });
        showNotification('Comentário adicionado com sucesso!', 'success');
      } else {
        showNotification(data.message || 'Erro ao adicionar comentário', 'error');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      showNotification('Erro ao enviar comentário', 'error');
    }
  };

  const handleEditarComentario = async (comentarioId) => {
    try {
      const response = await fetch(`http://localhost:4000/comment/${comentarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texto: editandoComentario.texto,
          estrela: editandoComentario.estrela
        })
      });

      const data = await response.json();

      if (response.ok) {
        setComentarios(comentarios.map(c => {
          if (c.id === comentarioId) {
            return {
              ...data.comment,
              user: c.user
            };
          }
          return c;
        }));
        setEditandoComentario(null);
        showNotification('Comentário editado com sucesso!', 'success');
      } else {
        showNotification(data.message || 'Erro ao editar comentário', 'error');
      }
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
      showNotification('Erro ao editar comentário', 'error');
    }
  };

  const handleExcluirComentario = async (comentarioId) => {
    // Encontra o comentário para mostrar o nome do usuário
    const comentario = comentarios.find(c => c.id === comentarioId);
    const nomeUsuario = comentario?.user?.nome || 'este comentário';

    // Abre o modal de confirmação
    setConfirmationModal({
      isOpen: true,
      title: 'Excluir Comentário',
      message: `Tem certeza que deseja excluir seu comentário? Esta ação não pode ser desfeita.`,
      type: 'danger',
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4000/comment/${comentarioId}`, {
            method: 'DELETE'
          });

          const data = await response.json();

          if (response.ok) {
            setComentarios(comentarios.filter(c => c.id !== comentarioId));
            showNotification('Comentário excluído com sucesso!', 'success');
          } else {
            showNotification(data.message || 'Erro ao excluir comentário', 'error');
          }
        } catch (error) {
          console.error('Erro ao excluir comentário:', error);
          showNotification('Erro ao excluir comentário', 'error');
        }
      },
      commentId: comentarioId
    });
  };

  const confirmarEdicao = async () => {
    setConfirmationModal({
      isOpen: true,
      title: 'Editar Comentário',
      message: 'Tem certeza que deseja salvar as alterações no comentário?',
      type: 'warning',
      onConfirm: async () => {
        if (editandoComentario) {
          await handleEditarComentario(editandoComentario.id);
        }
      }
    });
  };

  const adicionarAoCarrinho = async () => {
    console.log('🛒 Tentando adicionar ao carrinho...');
    console.log('👤 Usuário logado:', usuarioLogado);
    console.log('🆔 ID do produto:', id);

    // Verificação robusta do usuário logado
    const isLoggedIn = localStorage.getItem("neobyteLoggedIn") === "true";
    const userData = localStorage.getItem("neobyteUser");

    if (!isLoggedIn || !userData || !usuarioLogado) {
      console.log('❌ Usuário não está logado!');
      showNotification('Você precisa estar logado para adicionar itens ao carrinho', 'error');

      // Redireciona para a página de login
      setTimeout(() => {
        router.push('/Login');
      }, 2000);
      return;
    }

    // Verifica se temos o ID do usuário
    let userId = usuarioLogado.id;
    if (!userId) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.id) {
          userId = parsedUser.id;
          console.log('🔄 Recuperando ID do localStorage:', userId);
        } else {
          showNotification('Erro nas informações do usuário. Faça login novamente.', 'error');
          return;
        }
      } catch (error) {
        console.error('Erro ao parsear usuário:', error);
        showNotification('Erro nas informações do usuário. Faça login novamente.', 'error');
        return;
      }
    }

    // Verifica se temos o ID do produto
    if (!id) {
      showNotification('Produto não encontrado', 'error');
      return;
    }

    setAdicionandoAoCarrinho(true);

    try {
      const response = await fetch('http://localhost:4000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          produto_id: parseInt(id),
          quantidade: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Produto adicionado ao carrinho:', data);

        if (data.message && data.message.includes('atualizada')) {
          showNotification('Quantidade atualizada no carrinho!', 'success');
        } else {
          showNotification('Produto adicionado ao carrinho com sucesso!', 'success');
        }

        // Redireciona para o carrinho após um breve delay
        setTimeout(() => {
          router.push('/Carrinho');
        }, 1500);

      } else {
        console.error('❌ Erro ao adicionar ao carrinho:', data);
        showNotification(data.message || 'Erro ao adicionar ao carrinho', 'error');
      }
    } catch (error) {
      console.error('🚨 Erro na requisição:', error);
      showNotification('Erro de conexão. Tente novamente.', 'error');
    } finally {
      setAdicionandoAoCarrinho(false);
    }
  };

  const iniciarEdicao = (comentario) => {
    setEditandoComentario({
      id: comentario.id,
      texto: comentario.texto,
      estrela: comentario.estrela
    });
  };

  const cancelarEdicao = () => {
    setEditandoComentario(null);
  };

  const getNomeUsuario = (comentario) => {
    if (usuarioLogado && comentario.user_id === usuarioLogado.id) {
      return 'Você';
    }

    if (comentario.user && comentario.user.nome) {
      return comentario.user.nome;
    }

    return `Usuário ${comentario.user_id}`;
  };

  const formatarCategoria = (categoria) => {
    if (!categoria) return '';
    const palavras = categoria.split('_');
    const palavrasFormatadas = palavras.map(palavra => {
      if (palavra.length === 0) return '';
      return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    });
    return palavrasFormatadas.join(' ');
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const renderEstrelas = (quantidade) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < quantidade ? styles.estrelaPreenchida : styles.estrelaVazia}>
        ★
      </span>
    ));
  };

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!produto) {
    return <p>Produto não encontrado.</p>;
  }

  const temDesconto = produto.valordesconto === 1;
  const precoOriginal = temDesconto ? produto.valor * 1.16 : null;
  const categoriaFormatada = formatarCategoria(produto.categoria);

  return (
    <>
      <Head>
        <title>Neobyte - {produto.nome}</title>
        <meta name="description" content={produto.descricao || "Descrição do produto"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* Sistema de Notificação */}
      {notification.show && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
          duration={3000}
        />
      )}

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />

      <section className={styles.allProd}>
        <div className={styles.topProduto}>
          <div className={styles.imgProdtudo}>
            <img src={produto.capa || '/imagem-padrao.jpg'} alt={produto.nome} />
          </div>

          <div className={styles.sobreProduto}>
            <div className={styles.avaliacao}>
              <div className={styles.estrelas}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span>
              </div>
            </div>

            <h1 className={styles.tituloProduto1}>{produto.nome}</h1>

            <h3 className={styles.subtituloProduto}>Descrição</h3>
            <p className={styles.textoProduto}>{produto.descricao}</p>

            <h3 className={styles.subtituloProduto}>Categoria</h3>
            <p className={styles.categoriaProduto}>{categoriaFormatada}</p>
          </div>

          <div className={styles.caixaCompra}>
            {temDesconto && (
              <p className={styles.precoDesconto}>{formatarMoeda(precoOriginal)}</p>
            )}
            <p className={styles.preco}>{formatarMoeda(produto.valor)}</p>
            <p className={styles.precoPix}>
              À vista no PIX com <strong>{temDesconto ? '14%' : '10%'} de desconto</strong>
            </p>
            <p className={styles.precoParcelado}>
              {formatarMoeda(produto.valor)} em até 10x de {formatarMoeda(produto.valor / 10)} sem juros <br />
              ou 1x com <strong>{temDesconto ? '14%' : '10%'} de desconto</strong> no cartão
            </p>
            {temDesconto && (
              <div className={styles.badgeDescontoProduto}>
                <span className={styles.textoBadgeProduto}>-14% OFF</span>
              </div>
            )}
            <div className={styles.botoesProduto}>
              <a href="/Pagamento" onClick={(e) => {
                e.preventDefault();
                // Adicione sua função de autenticação aqui se necessário
                router.push('/Pagamento');
              }}>
                <button className={styles.btnComprar}>
                  <img src="/neobyte/sacola.svg" alt="Comprar" className={styles.iconSac} />
                  Comprar
                </button>
              </a>

              <button
                className={styles.btnCarrinho}
                onClick={adicionarAoCarrinho}
                disabled={adicionandoAoCarrinho}
              >
                <img src="/neobyte/carrinho.svg" alt="Adicionar ao carrinho" className={styles.iconCar} />
                {adicionandoAoCarrinho ? 'Adicionando...' : 'Adicionar ao carrinho'}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.divisorMeio}></div>

        {/* Seção de especificações técnicas */}
        <section className={styles.sectionEspecs}>
          <div className={styles.especsContainer}>
            <h3 className={styles.especsTitulo}>Especificações Técnicas</h3>
            {produto.especs ? (
              <div className={styles.especsTable}>
                {produto.especs.split('|').map((espec, index) => {
                  const especTrimmed = espec.trim();
                  if (especTrimmed) {
                    const partes = especTrimmed.split(':');
                    if (partes.length >= 2) {
                      const chave = partes[0].trim();
                      const valor = partes.slice(1).join(':').trim();
                      return (
                        <div key={index} className={styles.especsRow}>
                          <div className={styles.especsChave}>{chave}:</div>
                          <div className={styles.especsValor}>{valor}</div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className={styles.especsRow}>
                          <div className={styles.especsValorUnico}>{especTrimmed}</div>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className={styles.especsNaoDisponivel}>Especificações não disponíveis para este produto.</p>
            )}
          </div>
        </section>

        <div className={styles.divisorMeio}></div>

        {/* Seção de Comentários */}
        <section className={styles.comentarios}>
          <h2 className={styles.tituloSecao}>Avaliações dos Clientes</h2>

          {/* Formulário para novo comentário */}
          <div className={styles.formComentario}>
            <h3>Deixe sua avaliação</h3>
            <form onSubmit={handleSubmitComentario}>
              <div className={styles.avaliacaoInput}>
                <label>Avaliação:</label>
                <div className={styles.estrelasInput}>
                  {[1, 2, 3, 4, 5].map(estrela => (
                    <button
                      key={estrela}
                      type="button"
                      className={styles.estrelaBtn}
                      onClick={() => setNovoComentario({ ...novoComentario, estrela })}
                    >
                      {estrela <= novoComentario.estrela ? '★' : '☆'}
                    </button>
                  ))}
                </div>
                <span>{novoComentario.estrela} estrelas</span>
              </div>

              <textarea
                className={styles.textareaComentario}
                value={novoComentario.texto}
                onChange={(e) => setNovoComentario({ ...novoComentario, texto: e.target.value })}
                placeholder="Digite seu comentário..."
                rows="4"
                maxLength="225"
              />

              <button type="submit" className={styles.btnEnviarComentario}>
                Enviar Comentário
              </button>
            </form>
          </div>

          {/* Lista de comentários */}
          <div className={styles.listaComentarios}>
            {carregandoComentarios ? (
              <p>Carregando comentários...</p>
            ) : !comentarios || comentarios.length === 0 ? (
              <p className={styles.semComentarios}>Seja o primeiro a comentar sobre este produto!</p>
            ) : (
              comentarios.map(comentario => (
                <div key={comentario.id} className={styles.comentarioCard}>
                  <div className={styles.cabecalhoComentario}>
                    <div className={styles.infoUsuario}>
                      <span className={styles.nomeUsuario}>{comentario.user?.nome || 'Usuário'}</span>
                      <div className={styles.estrelasComentario}>
                        {renderEstrelas(comentario.estrela)}
                        <span className={styles.quantidadeEstrelas}>({comentario.estrela})</span>
                      </div>
                    </div>

                    {/* Botões de editar/excluir - apenas se for dono do comentário */}
                    {usuarioLogado && usuarioLogado.id === comentario.user_id && (
                      <div className={styles.acoesComentario}>
                        {editandoComentario?.id === comentario.id ? (
                          <>
                            <button
                              onClick={() => confirmarEdicao()}
                              className={styles.btnSalvar}
                            >
                              Salvar
                            </button>
                            <button
                              onClick={cancelarEdicao}
                              className={styles.btnCancelar}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => iniciarEdicao(comentario)}
                              className={styles.btnEditar}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleExcluirComentario(comentario.id)}
                              className={styles.btnExcluir}
                            >
                              Excluir
                            </button>
                          </>
                        )}
                        <span className={styles.nomeUsuario}>
                          {getNomeUsuario(comentario)}
                        </span>
                      </div>
                    )}
                  </div>

                  {editandoComentario?.id === comentario.id ? (
                    <div className={styles.editarComentario}>
                      <textarea
                        value={editandoComentario.texto}
                        onChange={(e) => setEditandoComentario({ ...editandoComentario, texto: e.target.value })}
                        className={styles.textareaEditar}
                        rows="3"
                        maxLength="225"
                      />
                      <div className={styles.avaliacaoEditar}>
                        <label>Avaliação:</label>
                        <div className={styles.estrelasInput}>
                          {[1, 2, 3, 4, 5].map(estrela => (
                            <button
                              key={estrela}
                              type="button"
                              className={styles.estrelaBtn}
                              onClick={() => setEditandoComentario({ ...editandoComentario, estrela })}
                            >
                              {estrela <= editandoComentario.estrela ? '★' : '☆'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className={styles.textoComentario}>{comentario.texto}</p>
                  )}

                  <div className={styles.dataComentario}>
                    {new Date(comentario.createdAt || Date.now()).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div className={styles.divisor}></div>
      </section>
      <Footer />
    </>
  );
}