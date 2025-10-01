import styles from "./ProdutoPlacaMae.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const avaliacoes = [
  {
    nome: "João Victor Lacerda Caruso",
    estrelas: 4,
    comentario:
      "Fria, monstra no desempenho (sim, com IA e frame generation, pois é o que teremos daqui para frente) e no tamanho (ainda maior que a 4090, ao menos no comprimento).",
    data: "13/08/2025",
  },
  {
    nome: "João Victor Lacerda Caruso",
    estrelas: 4,
    comentario:
      "Fria, monstra no desempenho (sim, com IA e frame generation, pois é o que teremos daqui para frente) e no tamanho (ainda maior que a 4090, ao menos no comprimento).",
    data: "13/08/2025",
  },
  {
    nome: "João Victor Lacerda Caruso",
    estrelas: 4,
    comentario:
      "Fria, monstra no desempenho (sim, com IA e frame generation, pois é o que teremos daqui para frente) e no tamanho (ainda maior que a 4090, ao menos no comprimento).",
    data: "13/08/2025",
  },
];

export default function ProdutoPlacaMae() {
  return (
    <>
      <Head>
        <title>Neobyte</title>
        <meta
          name="description"
          content="O melhor e-commerce tecnológico do mercado"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <div className={styles.topProduto}>
          <div className={styles.imgProdtudo}>
            <img src="./ImgProdutos/placamae1.svg" alt="Placa Mãe" />
          </div>

          <div className={styles.sobreProduto}>
            <div className={styles.avaliacao}>
              <div className={styles.estrelas}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span> {/* estrela vazia */}
              </div>
              <Link href="./Favoritos">
                <img
                  className={styles.coracao}
                  src="./Neobyte/coracao.svg"
                  alt="Adicionar aos favoritos"
                />
              </Link>
            </div>

            <h1 className={styles.tituloProduto1}>
              Placa-Mãe ASUS TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4,
              Preto
            </h1>

            <h3 className={styles.subtituloProduto}>Sobre o produto</h3>

            <ul className={styles.sobreProdutoTexto}>
              <li>
                <strong>Especificações Técnicas:</strong> Desenhada para AMD
                Ryzen série 5000/4000 G e 3000, arquitetura otimizada para alta
                performance
              </li>
              <li>
                <strong>Compatibilidade:</strong> Equipada com sockets AM4,
                otimizada para memórias DDR4 e sistemas de resfriamento
                avançados
              </li>
              <li>
                <strong>Performance e Benchmarks:</strong> Ideal para jogos
                online e aplicações exigentes, com otimização de rede Turbo LAN
                para jogabilidade fluida
              </li>
              <li>
                <strong>Recursos Avançados:</strong> Possui iluminação RGB Aura
                Sync, headers RGB integrados e componentes TUF para durabilidade
                aprimorada
              </li>
            </ul>
          </div>

          <div className={styles.caixaCompra}>
            <p className={styles.precoDesconto}>R$ 788,22</p>
            <p className={styles.preco}>R$ 575,99</p>
            <p className={styles.precoPix}>
              À vista no PIX com <strong>10% de desconto</strong>
            </p>
            <p className={styles.precoParcelado}>
              R$ 575,99 em até 10x de R$ 57,60 sem juros <br />
              ou 1x com <strong>10% de desconto</strong> no cartão
            </p>

            <div className={styles.botoesProduto}>
              <a href="/Pagamento">
                <button className={styles.btnComprar}>
                  <img
                    src="./Neobyte/sacola.svg"
                    alt="Comprar"
                    className={styles.iconSac}
                  />
                  Comprar
                </button>
              </a>

              <a href="/Carrinho">
                <button className={styles.btnCarrinho}>
                  <img
                    src="./Neobyte/carrinho.svg"
                    alt="Adicionar ao carrinho"
                    className={styles.iconCar}
                  />
                  Adicionar ao carrinho
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.descricaoProduto}>
          <h1 className={styles.tituloProduto2}>
            Placa Mãe Asus TUF GAMING A520M-PLUS II, AMD AM4, mATX, DDR4 -
            90MB17G0-M0EAY0
          </h1>

          <p className={styles.textoProduto}>
            A Placa Mãe Asus TUF GAMING A520M-PLUS II, foi projetada com os mais
            altos padrões de qualidade e tecnologia TUF LANGuard e Turbo LAN.
            Criada especialmente para jogos online, surpreende até os gamers
            mais exigentes.
          </p>

          <p className={styles.textoProduto}>
            Compatível com processadores Ryzen 5000 Series/4000 G-Series e
            praticamente toda a linha 3000 Series de Desktop Processors, oferece
            tecnologia de resfriamento abrangente graças ao trio: dissipador de
            calor VRM, dissipador de calor PCH, Fan Xpert 2+, para melhor
            resfriamento e maior desempenho dos componentes do seu PC Gamer.
          </p>

          <p className={styles.textoProduto}>
            Seu LED RGB possui headers RGB integrados e headers Gen 2
            endereçáveis para tiras de LED RGB que são facilmente sincronizados
            com hardware compatível com Aura Sync.
          </p>

          <p className={styles.textoProduto}>
            Graças ao moderno ecossistema TUF Gaming Alliance, a A520M-PLUS II é
            fácil de instalar, podendo ser manejada até mesmo por quem não tem
            conhecimento prévio.
          </p>

          <h2 className={styles.subtituloProduto}>Desempenho sólido</h2>
          <p className={styles.textoProduto}>
            Com fornecimento de energia atualizado e opções abrangentes de
            refrigeração para alimentar as CPUs mais recentes AMD Ryzen, a TUF
            Gaming A520M-PLUS II possui suporte para memória e armazenamento
            mais rápidos, oferecendo a base perfeita para sua próxima plataforma
            de batalha de alta contagem de núcleos.
          </p>

          <h2 className={styles.subtituloProduto}>Stack Cool 3+</h2>
          <p className={styles.textoProduto}>
            As camadas de cobre de 56g afastam o calor dos componentes críticos
            para mantê-los em temperatura de operação ideal e impulsionam as
            CPUs além das velocidades padrão.
          </p>

          <h2 className={styles.subtituloProduto}>PC DIY fácil</h2>
          <p className={styles.textoProduto}>
            As placas-mãe TUF Gaming foram projetadas para serem fáceis de
            instalar da maneira que você deseja, mesmo para quem faz a
            instalação pela primeira vez. O ecossistema da TUF Gaming Alliance
            facilita a seleção de peças compatíveis, enquanto o software Armoury
            Crate oferece controle total das configurações do sistema por meio
            de um único painel.
          </p>

          <h2 className={styles.subtituloProduto}>TUF Gaming Alliance</h2>
          <p className={styles.textoProduto}>
            A TUF Gaming Alliance é uma parceria entre a ASUS e marcas de
            componentes de PC confiáveis para garantir a compatibilidade com uma
            ampla gama de peças, como gabinetes para PC, fontes de alimentação,
            coolers de CPU, kits de memória e muito mais.
          </p>

          <h2 className={styles.subtituloProduto}>Jogo imersivo</h2>
          <p className={styles.textoProduto}>
            A TUF Gaming B550M-Plus oferece um pacote de jogos completo e de
            alto desempenho com uma longa lista de recursos para melhorar sua
            experiência, incluindo rede ultra-rápida para jogabilidade on-line
            mais suave, áudio cristalino com dicas posicionais para jogos FPS e
            iluminação RGB integrada que sincroniza aos acessórios acoplados
            para ajudá-lo a criar uma atmosfera gaming personalizada.
          </p>

          <h2 className={styles.subtituloProduto}>Turbo LAN</h2>
          <p className={styles.textoProduto}>
            O Turbo LAN é um software de otimização de rede para priorização
            personalizável de pacotes. Com a tecnologia de modelagem de tráfego
            cFosSpeed, permite configurar a prioridade do aplicativo por meio de
            uma interface intuitiva e reduzir o lag da rede.
          </p>
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.informacoesTecnicas}>
          <h1 className={styles.tituloSecao}>Informações Técnicas</h1>

          <h2 className={styles.subtituloSecao}>Características</h2>
          <ul className={styles.listaTecnica}>
            <li>Marca: ASUS</li>
            <li>Modelo: TUF GAMING A520M-PLUS II</li>
          </ul>

          <h2 className={styles.subtituloSecao}>Especificações</h2>

          <h3 className={styles.subtituloSecao}>Memória</h3>
          <ul className={styles.listaTecnica}>
            <li>Canais de Memória: 4x DDR4 (Dual channel)</li>
            <li>Tamanho Max de Memória: 128GB</li>
            <li>
              4 x DIMM, Max. 128GB, DDR4
              4866(OC)/4800(OC)/4600(OC)/4466(OC)/4400(OC)/4266(OC)/4133(OC)/4000(OC)/3866(OC)/3733(OC)/3600(OC)/3466(OC)/3333(OC)/3200/3000/2800/2666/2400/2133
              MHz, Un-buffered Memory*
            </li>
            <li>Dual Channel Memory Architecture</li>
            <li>
              *O suporte à Memória ECC (modo ECC) varia de acordo com a CPU.
            </li>
            <li>
              *Consulte www.asus.com para obter as QVL (Listas de Fornecedores
              Qualificados) de Memória e o suporte à frequência de memória
              depende dos tipos de CPU.
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>Gráficos</h3>
          <ul className={styles.listaTecnica}>
            <li>1 x DisplayPort 1.2</li>
            <li>1 x HDMI 2.1 (4K@60Hz)</li>
            <li>1 x D-Sub</li>
            <li>
              *As especificações gráficas podem variar entre os tipos de CPU.
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>Slots de Expansão</h3>
          <ul className={styles.listaTecnica}>
            <li>
              1 x PCIe 3.0 x16 (modo x16) - AMD Ryzen 5000 Series/5000
              G-Series/4000 G-Series/3000 Series/3000 G-Series Desktop
              Processors
            </li>
            <li>
              1 x PCIe 3.0 x16 slot (supports x16 mode) - AMD A520 Chipset
            </li>
            <li>2 x PCIe 3.0 x1 slots</li>
          </ul>

          <h3 className={styles.subtituloSecao}>Armazenamento</h3>
          <ul className={styles.listaTecnica}>
            <li>
              M.2 slot (Key M), type 2242/2260/2280 (supports PCIe 3.0 x4 & SATA
              modes) - AMD Ryzen 5000 Series/5000 G-Series/4000 G-Series/3000
              Series/3000 G-Series Desktop Processors
            </li>
            <li>
              4 x SATA 6Gb/s ports - AMD A520 Chipset (Support RAID 0, 1, 10)
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>Rede</h3>
          <ul className={styles.listaTecnica}>
            <li>1 x Realtek 1Gb Ethernet</li>
            <li>TUF LANGuard</li>
          </ul>

          <h3 className={styles.subtituloSecao}>USB</h3>
          <ul className={styles.listaTecnica}>
            <li>4 x USB 3.2 Gen 1 ports (4 x Type-A)</li>
            <li>2 x USB 2.0 ports (2 x Type-A)</li>
            <li>
              1 x USB 3.2 Gen 1 header supports additional 2 USB 3.2 Gen 1 ports
            </li>
            <li>2 x USB 2.0 headers support additional 3 USB 2.0 ports</li>
          </ul>

          <h3 className={styles.subtituloSecao}>Áudio</h3>
          <ul className={styles.listaTecnica}>
            <li>Realtek ALC887 com 8 canais - CODEC de alta definição*</li>
            <li>
              Realtek ALC887/897 7.1 Surround Sound High Definition Audio CODEC*
            </li>
            <li>
              Suporta: Jack detection, Multi-streaming, Front Panel
              Jack-retasking
            </li>
            <li>Supports up to 24-Bit/192 kHz playback</li>
            <li>
              Audio Features: Audio Shielding, Premium audio capacitors,
              Dedicated audio PCB layers
            </li>
            <li>
              *Um chassi com um módulo de áudio HD no painel frontal é
              necessário para oferecer suporte à saída de áudio 7.1 Surround
              Sound.
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>
            Portas I/O no Painel Traseiro
          </h3>
          <ul className={styles.listaTecnica}>
            <li>4 x USB 3.2 Gen 1 ports (4 x Type-A)</li>
            <li>2 x USB 2.0 ports (2 x Type-A)</li>
            <li>1 x BIOS FlashBack button</li>
            <li>1 x DisplayPort</li>
            <li>1 x HDMI™ port</li>
            <li>1 x D-Sub</li>
            <li>1 x Realtek 1Gb Ethernet port</li>
            <li>3 x Audio jacks</li>
            <li>1 x PS/2 Keyboard/Mouse combo port</li>
          </ul>

          <h3 className={styles.subtituloSecao}>Conectores internos de E/S</h3>
          <ul className={styles.listaTecnica}>
            <li>1 x cabeçalho de ventoinha de CPU de 4 pinos</li>
            <li>2 x cabeçalhos de ventoinha de chassi de 4 pinos</li>
            <li>1 x conector de alimentação principal de 24 pinos</li>
            <li>1 x conector de alimentação de +12 V de 8 pinos</li>
            <li>1 x slot M.2 (chave M)</li>
            <li>4 x portas SATA de 6 Gb/s</li>
            <li>
              1 x cabeçalho USB 3.2 Gen 1 suporta 2 portas USB 3.2 Gen 1
              adicionais
            </li>
            <li>2 x cabeçalhos USB 2.0 suportam 4 portas USB 2.0 adicionais</li>
            <li>2 x cabeçalho AURA Endereçável Gen 2</li>
            <li>2 x cabeçalhos AURA RGB</li>
            <li>1 x cabeçalho Clear CMOS</li>
            <li>1 x cabeçalho de porta COM</li>
            <li>1 x cabeçalho de áudio do painel frontal (AAFP)</li>
            <li>1 x cabeçalho de saída S/PDIF</li>
            <li>1 x cabeçalho de alto-falante</li>
            <li>1 x cabeçalho SPI TPM (14-1 pino)</li>
            <li>1 x cabeçalho do painel do sistema de 10-1 pino</li>
          </ul>

          <h3 className={styles.subtituloSecao}>Recursos Especiais</h3>
          <ul className={styles.listaTecnica}>
            <li>
              ASUS TUF PROTECTION: DIGI+ VRM, ESD Guards, TUF LANGuard, Proteção
              contra sobretensão, SafeSlot Core+, E/S traseira de aço inoxidável
              ASUS
            </li>
            <li>ASUS Q-Design: Q-DIMM, Q-Slot</li>
            <li>ASUS Thermal Solution: Design de dissipador de calor VRM</li>
            <li>ASUS EZ DIY: Botão BIOS FlashBack, BIOS FlashBack LED</li>
            <li>
              AURA Sync: Cabeçalhos AURA RGB, Cabeçalhos endereçáveis ​​Gen 2
              RGB
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>Recursos de software</h3>
          <ul className={styles.listaTecnica}>
            <li>ASUS Exclusive Software</li>
            <li>Armoury Crate: Aura Creator, Aura Sync</li>
            <li>AI Suite 3: Utilitário de desempenho e economia de energia</li>
            <li>TurboV EVO</li>
            <li>EPU</li>
            <li>DIGI+ VRM</li>
            <li>
              Fan Xpert 2+: Atualização EZ, Limpador de PC, Informações do
              sistema
            </li>
            <li>TUF GAMING CPU-Z</li>
            <li>AI Charger</li>
            <li>ASUS Turbo LAN</li>
            <li>DAEMON Tools</li>
            <li>Norton Software antivírus (versão de teste gratuita)</li>
            <li>WinRAR</li>
            <li>UEFI BIOS</li>
            <li>
              ASUS EZ DIY: ASUS CrashFree BIOS 3, ASUS EZ Flash 3, ASUS UEFI
              BIOS EZ Mode
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>Gerenciabilidade</h3>
          <ul className={styles.listaTecnica}>
            <li>WOL por PME, PXE</li>
          </ul>

          <h3 className={styles.subtituloSecao}>Acessórios</h3>
          <ul className={styles.listaTecnica}>
            <li>Cabos: 2 cabos SATA 6Gb/s</li>
            <li>
              Diversos: 1 escudo de E/S, 1 pacote de parafusos SSD M.2, 1
              adesivo TUF Gaming
            </li>
            <li>Mídia de instalação: 1 DVD de suporte</li>
            <li>
              Documentação: 1 cartão de certificação TUF, 1 manual do usuário
            </li>
          </ul>

          <h3 className={styles.subtituloSecao}>Sistema Operacional</h3>
          <p className={styles.textoProduto}>Windows 10 64 bits</p>

          <h3 className={styles.subtituloSecao}>Fator de Forma</h3>
          <p className={styles.textoProduto}>microATX - 24,4 cm x 24,4 cm</p>

          <h3 className={styles.subtituloSecao}>Conteúdo da Embalagem</h3>
          <p className={styles.textoProduto}>Placa mãe</p>

          <h3 className={styles.subtituloSecao}>Garantia</h3>
          <p className={styles.textoProduto}>
            1 ano de garantia (3 meses de garantia legal + 9 meses de garantia
            contratual junto ao fabricante)
          </p>

          <h3 className={styles.subtituloSecao}>Peso</h3>
          <p className={styles.textoProduto}>
            1160 gramas (bruto com embalagem)
          </p>
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.avaliacoesContainer}>
          <h2 className={styles.tituloSecao}>AVALIAÇÕES DOS USUÁRIOS</h2>
          {avaliacoes.map((avaliacao, index) => (
            <div key={index} className={styles.avaliacaoCard}>
              <div className={styles.cabecalho}>
                <span className={styles.nomeUsuario}>{avaliacao.nome}</span>
                <span className={styles.estrelas}>
                  {"★".repeat(avaliacao.estrelas) +
                    "☆".repeat(5 - avaliacao.estrelas)}
                </span>
              </div>
              <p className={styles.comentario}>{avaliacao.comentario}</p>
              <span className={styles.data}>Avaliado em {avaliacao.data}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}