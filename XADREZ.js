const tabuleiro = document.getElementById("tabuleiro");

const alfabeto = 
{1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h"};
const eixo_x = {a: 1, b: 2, c:3, d:4, e:5, f:6, g:7, h:8}
const eixo_y = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

//Alterações E-du
const posicao_inicial_pecas = {
  a1: "torre",
  b1: "cavalo",
  c1: "bispo",
  d1: "rainha",
  e1: "rei",
  f1: "bispo",
  g1: "cavalo",
  h1: "torre",

  a2: "peao",
  b2: "peao",
  c2: "peao",
  d2: "peao",
  e2: "peao",
  f2: "peao",
  g2: "peao",
  h2: "peao",

  a8: "torre",
  b8: "cavalo",
  c8: "bispo",
  d8: "rainha",
  e8: "rei",
  f8: "bispo",
  g8: "cavalo",
  h8: "torre",

  a7: "peao",
  b7: "peao",
  c7: "peao",
  d7: "peao",
  e7: "peao",
  f7: "peao",
  g7: "peao",
  h7: "peao",
};

function ColocarPecasTabuleiro() {
  for (const [key, value] of Object.entries(posicao_inicial_pecas)) {
    const casa = document.getElementById(`${key}`);
    const last_digito = key.slice(1);
    casa.innerHTML += `
      <img id="${value + key}" src="${value}.png" class="peca ${
      last_digito == 1 || last_digito == 2 ? "pecabranca"  : "pecapreta"
    }" name="${last_digito == 1 || last_digito == 2 ? "pecabranca" : "pecapreta"}" primeiraJogada="true"/>
    `;
    casa.setAttribute('pecaDentro', value)
  }
}

// Fim alterações E-du

function GerarTabuleiro() {
  for (var i = 9; i > 1; i--) {
    tabuleiro.innerHTML += `<div id="${i + 1}" class="linhatabuleiro">${
      i - 1
    }</div>`;
    const linha = document.getElementById(i + 1);

    if (i % 2 == 0) {
      cor = "preta";
    } else if (i % 2 != 0) {
      cor = "branca";
    }

    for (var j = 1; j < 9; j++) {
      //casas
      if (cor == "branca") {
        var casaclicada = `${alfabeto[j]}${i - 1}`;
        linha.innerHTML += `<button onclick="JogadaSelecionada(${casaclicada})" id="${
          alfabeto[j]
        }${i - 1}" class="quadrado ${cor}">${alfabeto[j]}${i - 1}</button>`;
        cor = "preta";
      } else if (cor == "preta") {
        var casaclicada = `${alfabeto[j]}${i - 1}`;
        linha.innerHTML += `<button onclick="JogadaSelecionada(${casaclicada})" id="${
          alfabeto[j]
        }${i - 1}" class="quadrado ${cor}">${alfabeto[j]}${i - 1} </button>`;
        cor = "branca";
      }
    }
  }
}

function ValidarJogadapeao(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero, peaoSelecionado) {
  const proximaPosicaoEmNumeroPeao = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroPeao = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  const peao = document.getElementById(peaoSelecionado)
  var peaoPrimeiraJogada = peao.getAttribute('primeiraJogada')
  var corPeao = peao.name
  console.log('corPeao', corPeao)

  if(peaoPrimeiraJogada == 'true' && corPeao == 'pecabranca'){
    const MovimentarCimaUmaCasa = posicaoAtualEmNumeroPeao[1] + 1
    const MovimentarCimaDuasCasa = posicaoAtualEmNumeroPeao[1] + 2
    peao.setAttribute('primeiraJogada', false)
    return (MovimentarCimaUmaCasa == proximaPosicaoEmNumeroPeao[1] && posicaoAtualEmNumeroPeao[0] == proximaPosicaoEmNumeroPeao[0] || MovimentarCimaDuasCasa == proximaPosicaoEmNumeroPeao[1] && posicaoAtualEmNumeroPeao[0] == proximaPosicaoEmNumeroPeao[0]) ? 'JogadaPossivel' : 'JogadaImpossivel'
  }else if(peaoPrimeiraJogada == 'false'&& corPeao == 'pecabranca'){
    const MovimentarCimaUmaCasa = posicaoAtualEmNumeroPeao[1] + 1
    const ColunaAtual = posicaoAtualEmNumeroPeao[0]
    return (MovimentarCimaUmaCasa == proximaPosicaoEmNumeroPeao[1] && ColunaAtual == proximaPosicaoEmNumeroPeao[0]) ? 'JogadaPossivel' : 'JogadaImpossivel'
  }else if(peaoPrimeiraJogada == 'true' && corPeao == 'pecapreta'){
    const MovimentarCimaUmaCasa = posicaoAtualEmNumeroPeao[1] - 1
    const MovimentarCimaDuasCasa = posicaoAtualEmNumeroPeao[1] - 2
    peao.setAttribute('primeiraJogada', false)
    return (MovimentarCimaUmaCasa == proximaPosicaoEmNumeroPeao[1] && posicaoAtualEmNumeroPeao[0] == proximaPosicaoEmNumeroPeao[0] || MovimentarCimaDuasCasa == proximaPosicaoEmNumeroPeao[1] && posicaoAtualEmNumeroPeao[0] == proximaPosicaoEmNumeroPeao[0]) ? 'JogadaPossivel' : 'JogadaImpossivel'
  }else if(peaoPrimeiraJogada == 'false' && corPeao == 'pecapreta') {
    const MovimentarCimaUmaCasa = posicaoAtualEmNumeroPeao[1] - 1
    const ColunaAtual = posicaoAtualEmNumeroPeao[0]
    return (MovimentarCimaUmaCasa == proximaPosicaoEmNumeroPeao[1] && ColunaAtual == proximaPosicaoEmNumeroPeao[0]) ? 'JogadaPossivel' : 'JogadaImpossivel'
  }
  
}

function ValidarJogadatorre(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const proximaPosicaoEmNumeroTorre = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroTorre = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  
  const colunaIgual = Math.abs(posicaoAtualEmNumeroTorre[0]) == Math.abs(proximaPosicaoEmNumeroTorre[0])
  const linhaIgual = Math.abs(posicaoAtualEmNumeroTorre[1]) == Math.abs(proximaPosicaoEmNumeroTorre[1])
  return (colunaIgual == true || linhaIgual == true) ? 'JogadaPossivel' : 'JogadaImpossivel'

}

function ValidarJogadacavalo(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  var letra_localizacaoclick = localizacaoclick.id.slice(0, 1)
  var converterParaNumero = eixo_x[letra_localizacaoclick]
  var PosicaoSelecionadaEmNumero = [converterParaNumero, parseInt(localizacaoclick.id.slice(-1)) ]

    var subir_casa = numerocasa + 2
    var descer_casa = numerocasa - 2
    var subir_lado = numerocasa + 1
    var descer_lado = numerocasa - 1
    var horizontal_esquerda = eixo_x_casaatual_numero - 2
    var horizontal_direita = eixo_x_casaatual_numero + 2
    
    var movimentar_lado_direita = eixo_x_casaatual_numero + 1
    var movimentar_lado_esquerdo = eixo_x_casaatual_numero - 1
    
    var JogadasPossiveis = [
        [horizontal_direita, subir_lado],
        [horizontal_direita, descer_lado],
        [horizontal_esquerda, subir_lado],
        [horizontal_esquerda, descer_lado],
        [movimentar_lado_direita, subir_casa],
        [movimentar_lado_direita, descer_casa],
        [movimentar_lado_esquerdo, subir_casa],
        [movimentar_lado_esquerdo, descer_casa]
  ];
  for (var q = 0; q < 8; q++){
    if(JSON.stringify(JogadasPossiveis[q]) == JSON.stringify(PosicaoSelecionadaEmNumero)){
      return 'JogadaPossivel'
    }
  }
  return "JogadaImpossivel";
}

function ValidarJogadabispo(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const posicaoAtualEmNumero = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  const proximaPosicaoEmNumero = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]


  const v1 = Math.abs(posicaoAtualEmNumero[0] - proximaPosicaoEmNumero[0])
  const v2 = Math.abs(posicaoAtualEmNumero[1] - proximaPosicaoEmNumero[1])
  const result = v1 == v2 ? true : false
 if(result == false){
  return 'JogadaImpossivel'
 }else{
  return "JogadaPossivel";
 }
}

function ValidarJogadarainha(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const proximaPosicaoEmNumeroRainha = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroRainha = [eixo_x[casaAtual.slice(0, 1)], numerocasa]

  const colunaIgual = Math.abs(posicaoAtualEmNumeroRainha[0]) == Math.abs(proximaPosicaoEmNumeroRainha[0])
  const linhaIgual = Math.abs(posicaoAtualEmNumeroRainha[1]) == Math.abs(proximaPosicaoEmNumeroRainha[1])

  const v1 = Math.abs(posicaoAtualEmNumeroRainha[0] - proximaPosicaoEmNumeroRainha[0])
  const v2 = Math.abs(posicaoAtualEmNumeroRainha[1] - proximaPosicaoEmNumeroRainha[1])

  return (colunaIgual == true || linhaIgual == true || v1 == v2) ? 'JogadaPossivel' : 'JogadaImpossivel'

}

function ValidarJogadarei(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const proximaPosicaoEmNumeroRei = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroRei = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  //grade 3 por 3 começando pelo canto superior esquerdo
  var PossibilidadesJogada = [
    [Math.abs(posicaoAtualEmNumeroRei[0]) - 1, Math.abs(posicaoAtualEmNumeroRei[1]) + 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]), Math.abs(posicaoAtualEmNumeroRei[1]) + 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]) + 1, Math.abs(posicaoAtualEmNumeroRei[1]) + 1],

    [Math.abs(posicaoAtualEmNumeroRei[0]) - 1, Math.abs(posicaoAtualEmNumeroRei[1])],
    [Math.abs(posicaoAtualEmNumeroRei[0]) + 1, Math.abs(posicaoAtualEmNumeroRei[1])],

    [Math.abs(posicaoAtualEmNumeroRei[0]) - 1, Math.abs(posicaoAtualEmNumeroRei[1]) - 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]), Math.abs(posicaoAtualEmNumeroRei[1]) - 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]) + 1, Math.abs(posicaoAtualEmNumeroRei[1]) - 1],
  ]
  console.log('proximaposicaoemnuemrorei', proximaPosicaoEmNumeroRei)

  for (var v = 0; v < 8; v++){
    console.log('posibilidadejogadav', PossibilidadesJogada[v])
    if(JSON.stringify(PossibilidadesJogada[v]) == JSON.stringify(proximaPosicaoEmNumeroRei)){
      return 'JogadaPossivel'
    }
  }
  return 'JogadaImpossivel'
}

var armazenarJogada = [];
function JogadaSelecionada(localizacaoclick) {
  if (armazenarJogada.length == 0) {
    var pecaCasaSelecionada = localizacaoclick.querySelector("img");
    armazenarJogada.push(pecaCasaSelecionada.id);
  } else {
    armazenarJogada.push(localizacaoclick.id);
  }

  if (armazenarJogada.length == 2) {
    const casaAtual = armazenarJogada[0].slice(-2)
    const numerocasa = parseInt(armazenarJogada[0].slice(-1))
    var eixo_x_casaatual_numero = eixo_x[casaAtual.slice(0, -1)]
    var pecaEscolhida = armazenarJogada[0].slice(0, -2);
    var peaoSelecionado = armazenarJogada[0]
    var chamarValidacao = "ValidarJogada" + pecaEscolhida + "(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero, peaoSelecionado)";
    if (eval(chamarValidacao) == "JogadaPossivel") {
      var buscarpecaDentroCasa = document.getElementById(casaAtual)
      var adicionarAtributoPecaDentroProximaCasa = document.getElementById(armazenarJogada[1])
      const pecaDentro = buscarpecaDentroCasa.getAttribute('pecaDentro')

      CapturarPeca(casaAtual, localizacaoclick, armazenarJogada)
      MovimentarPecas(armazenarJogada);

      adicionarAtributoPecaDentroProximaCasa.setAttribute('pecaDentro', pecaDentro)
      buscarpecaDentroCasa.removeAttribute('pecadentro')
    } else {
      console.log("Jogada Impossivel");
      armazenarJogada = [];
    }
  }
}

function MovimentarPecas() {
  var casaRemoverPeca = document.getElementById(armazenarJogada[0].slice(-2))
  var pecaRemover = casaRemoverPeca.querySelector('img')
  pecaRemover.remove()

  var casaAdicionarPeca = document.getElementById(armazenarJogada[1])
  casaAdicionarPeca.innerHTML += `<img id="${pecaRemover.id.slice(0, -2) + casaAdicionarPeca.id}" src="${ pecaRemover.id.slice(0, -2) + '.png'}" class="peca ${pecaRemover.name}" name="${pecaRemover.name}" primeiraJogada=${pecaRemover.getAttribute('primeiraJogada')}>`
  console.log('pecaRemover', pecaRemover.getAttribute('primeiraJogada'))
  armazenarJogada = []
}

function CapturarPeca(casaAtual, localizacaoclick, armazenarJogada) {
  //const proximaCasa = document.get
  console.log('proximacasa1', localizacaoclick)
}

function ValidarCapturaPeca(){}

GerarTabuleiro();
ColocarPecasTabuleiro();

//estou organizando o xadrez como se estivesse jogando com peças brancas
//atributo