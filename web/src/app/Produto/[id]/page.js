"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './Produto.module.css';
import ToastNotification from '../../../components/ToastNotification';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useRef } from 'react';

export default function Produto() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

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
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [estrelaHover, setEstrelaHover] = useState(0);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [adicionandoAoCarrinho, setAdicionandoAoCarrinho] = useState(false);
  const comentariosRef = useRef(null);

  const [favoritado, setFavoritado] = useState(false);
  const [carregandoFavorito, setCarregandoFavorito] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
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

        console.log('🔍 Verificando login do usuário...');

        if (userData && isLoggedIn) {
          try {
            const user = JSON.parse(userData);
            console.log('✅ Usuário logado encontrado:', user);

            // Buscar dados atualizados da API
            try {
              const response = await fetch(`http://localhost:4000/user/${user.id}`);
              if (response.ok) {
                const data = await response.json();
                const usuarioAtualizado = data.profile || user;
                setUsuarioLogado(usuarioAtualizado);
                console.log('🔄 Usuário atualizado:', usuarioAtualizado);
              } else {
                setUsuarioLogado(user);
              }
            } catch (apiError) {
              console.warn('⚠️ Erro ao buscar dados da API, usando localStorage:', apiError);
              setUsuarioLogado(user);
            }
          } catch (parseError) {
            console.error('❌ Erro ao parsear dados do localStorage:', parseError);
            localStorage.removeItem("neobyteUser");
            localStorage.removeItem("neobyteLoggedIn");
            setUsuarioLogado(null);
          }
        } else {
          console.log('👤 Usuário não está logado - Modo visitante');
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
      calcularMediaAvaliacoes();
    }
  }, [id]);

  // Novo useEffect para verificar favorito quando usuário mudar
  useEffect(() => {
    if (id && usuarioLogado?.id) {
      verificarFavorito();
    } else {
      // Se não estiver logado, garantir que favoritado seja false
      setFavoritado(false);
    }
  }, [id, usuarioLogado?.id]);

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

  // Função para verificar se o produto está favoritado
  const verificarFavorito = async () => {
    if (!usuarioLogado || !usuarioLogado.id || !id) {
      console.log('❌ Não é possível verificar favorito - usuário não logado ou ID ausente');
      setFavoritado(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/favorite/${usuarioLogado.id}/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Resposta da verificação de favorito:', data);
        setFavoritado(!!data.favorite);
      } else {
        console.log('⚠️ Erro na resposta da verificação de favorito');
        setFavoritado(false);
      }
    } catch (error) {
      console.error('❌ Erro ao verificar favorito:', error);
      setFavoritado(false);
    }
  };

  // Função para adicionar/remover dos favoritos
  const toggleFavorito = async () => {
    // Verificar se o usuário está logado
    if (!usuarioLogado) {
      showNotification('Você precisa estar logado para favoritar produtos', 'error');

      // Redirecionar para login após notificação
      setTimeout(() => {
        router.push('/Login');
      }, 1500);
      return;
    }

    if (!usuarioLogado.id) {
      showNotification('Erro nas informações do usuário. Faça login novamente.', 'error');
      return;
    }

    setCarregandoFavorito(true);

    try {
      if (favoritado) {
        // Remover dos favoritos
        const response = await fetch('http://localhost:4000/favorite', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: usuarioLogado.id,
            produto_id: parseInt(id)
          })
        });

        if (response.ok) {
          setFavoritado(false);
          showNotification('Produto removido dos favoritos', 'success');
        } else {
          const data = await response.json();
          showNotification(data.error || 'Erro ao remover dos favoritos', 'error');
        }
      } else {
        // Adicionar aos favoritos
        const response = await fetch('http://localhost:4000/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: usuarioLogado.id,
            produto_id: parseInt(id)
          })
        });

        if (response.ok) {
          setFavoritado(true);
          showNotification('Produto adicionado aos favoritos!', 'success');
        } else {
          const data = await response.json();
          showNotification(data.error || 'Erro ao favoritar produto', 'error');
        }
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar favorito:', error);
      showNotification('Erro de conexão. Tente novamente.', 'error');
    } finally {
      setCarregandoFavorito(false);
    }
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();

    // Verificar se usuário está logado
    if (!usuarioLogado) {
      showNotification('Você precisa estar logado para comentar', 'error');
      return;
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

        const novaSoma = comentarios.reduce((total, c) => total + c.estrela, 0) + novoComentario.estrela;
        const novaMedia = novaSoma / (comentarios.length + 1);
        setMediaAvaliacoes(novaMedia);
        setTotalAvaliacoes(comentarios.length + 1);

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

  const adicionarAoCarrinho = async () => {
    console.log('🛒 Tentando adicionar ao carrinho...');

    // Verificar se usuário está logado
    if (!usuarioLogado) {
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
      showNotification('Erro nas informações do usuário. Faça login novamente.', 'error');
      return;
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

  // ... (mantenha as outras funções como handleEditarComentario, handleExcluirComentario, etc.)

  const scrollToComentarios = () => {
    if (comentariosRef.current) {
      comentariosRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const calcularMediaAvaliacoes = async () => {
    try {
      const response = await fetch(`http://localhost:4000/comment/product/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.comment && Array.isArray(data.comment) && data.comment.length > 0) {
        const somaEstrelas = data.comment.reduce((total, comentario) => {
          return total + (comentario.estrela || 0);
        }, 0);

        const media = somaEstrelas / data.comment.length;
        setMediaAvaliacoes(media);
        setTotalAvaliacoes(data.comment.length);
      } else {
        setMediaAvaliacoes(0);
        setTotalAvaliacoes(0);
      }
    } catch (error) {
      console.error('Erro ao calcular média de avaliações:', error);
      setMediaAvaliacoes(0);
      setTotalAvaliacoes(0);
    }
  };

  const renderEstrelasMedia = (media) => {
    const mediaArredondada = Math.floor(media * 2) / 2;

    return Array.from({ length: 5 }, (_, index) => {
      const estrelaValor = index + 1;
      let className = styles.estrelaVazia;

      if (estrelaValor <= Math.floor(mediaArredondada)) {
        className = styles.estrelaPreenchida;
      } else if (estrelaValor - 0.5 === mediaArredondada) {
        className = styles.estrelaMeia;
      }

      return (
        <span key={index} className={className}>
          ★
        </span>
      );
    });
  };

  const iniciarEdicao = (comentario) => {
    // Verificar se o usuário é dono do comentário
    if (usuarioLogado && usuarioLogado.id === comentario.user_id) {
      setEditandoComentario({
        id: comentario.id,
        texto: comentario.texto,
        estrela: comentario.estrela
      });
    } else {
      showNotification('Você só pode editar seus próprios comentários', 'error');
    }
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
    return (
      <>
        <Head>
          <title>Neobyte - Carregando...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <div className={styles.carregandoContainer}>
          <p>Carregando produto...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!produto) {
    return (
      <>
        <Head>
          <title>Neobyte - Produto não encontrado</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <div className={styles.erroContainer}>
          <p>Produto não encontrado.</p>
        </div>
        <Footer />
      </>
    );
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
              <div className={styles.avaliacaoInfo}>
                <div className={styles.mediaContainer}>
                  <div className={styles.mediaNota} onClick={scrollToComentarios}>
                    <span className={styles.notaNumero}>
                      {mediaAvaliacoes.toFixed(1)}
                    </span>
                    <div className={styles.estrelasMedia}>
                      {renderEstrelasMedia(mediaAvaliacoes)}
                    </div>
                    <div className={styles.totalAvaliacoes}>
                      {totalAvaliacoes === 0 ? (
                        <span className={styles.semAvaliacoes}>Sem avaliações ainda</span>
                      ) : (
                        <span className={styles.contadorAvaliacoes}>
                          {totalAvaliacoes} {totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coração de favoritos - visível sempre, mas funcional apenas para logados */}
              <button
                className={styles.coracaoFavorito}
                onClick={toggleFavorito}
                disabled={carregandoFavorito || !usuarioLogado}
                title={usuarioLogado
                  ? (favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos")
                  : "Faça login para favoritar"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={favoritado ? styles.coracaoPreenchido : styles.coracaoVazio}
                >
                  <path
                    fill={favoritado ? "var(--verde)" : (!usuarioLogado ? "#ccc" : "currentColor")}
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                {carregandoFavorito ? '...' :
                  usuarioLogado ? (favoritado ? 'Favoritado' : 'Favoritar') : 'Login para favoritar'}
              </button>
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
              {/* Botão Comprar - funcional apenas para logados */}
              <a href="/Pagamento" onClick={(e) => {
                e.preventDefault();
                if (!usuarioLogado) {
                  showNotification('Você precisa estar logado para comprar', 'error');
                  setTimeout(() => {
                    router.push('/Login');
                  }, 1500);
                  return;
                }
                router.push('/Pagamento');
              }}>
                <button className={styles.btnComprar} disabled={!usuarioLogado}>
                  <img src="/neobyte/sacola.svg" alt="Comprar" className={styles.iconSac} />
                  {usuarioLogado ? 'Comprar' : 'Login para comprar'}
                </button>
              </a>

              {/* Botão Carrinho - funcional apenas para logados */}
              <button
                className={styles.btnCarrinho}
                onClick={adicionarAoCarrinho}
                disabled={adicionandoAoCarrinho || !usuarioLogado}
              >
                <img src="/neobyte/carrinho.svg" alt="Adicionar ao carrinho" className={styles.iconCar} />
                {adicionandoAoCarrinho ? 'Adicionando...' :
                  usuarioLogado ? 'Adicionar ao carrinho' : 'Login para adicionar'}
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
        <section className={styles.comentarios} ref={comentariosRef}>
          <h2 className={styles.tituloSecao}>Avaliações dos Clientes</h2>

          {/* Formulário para novo comentário - apenas para usuários logados */}
          {usuarioLogado ? (
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
                        onMouseEnter={() => setEstrelaHover(estrela)}
                        onMouseLeave={() => setEstrelaHover(0)}
                      >
                        <span className={
                          estrela <= (estrelaHover || novoComentario.estrela)
                            ? styles.estrelaPreenchida
                            : styles.estrelaVazia
                        }>
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                  <span>{estrelaHover || novoComentario.estrela} estrelas</span>
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
          ) : (
            <div className={styles.loginPrompt}>
              <p>
                <a href="/Login" onClick={(e) => {
                  e.preventDefault();
                  router.push('/Login');
                }}>
                  Faça login
                </a> para deixar sua avaliação sobre este produto.
              </p>
            </div>
          )}

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

                    {/* Botões de editar/excluir - apenas se for dono do comentário e estiver logado */}
                    {usuarioLogado && usuarioLogado.id === comentario.user_id && (
                      <div className={styles.acoesComentario}>
                        {editandoComentario?.id === comentario.id ? (
                          <>
                            <button
                              onClick={() => setConfirmationModal({
                                isOpen: true,
                                title: 'Editar Comentário',
                                message: 'Tem certeza que deseja salvar as alterações?',
                                type: 'warning',
                                onConfirm: async () => {
                                  // ... código de edição ...
                                }
                              })}
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
                              onMouseEnter={() => setEstrelaHover(estrela)}
                              onMouseLeave={() => setEstrelaHover(0)}
                            >
                              <span className={
                                estrela <= (estrelaHover || editandoComentario.estrela)
                                  ? styles.estrelaPreenchida
                                  : styles.estrelaVazia
                              }>
                                ★
                              </span>
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