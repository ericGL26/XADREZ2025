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
        <img id=${value + key} src=${value + ".png"} class="peca ${
      last_digito == 1 || last_digito == 2 ? "pecabranca"  : "pecapreta"
    }" name="${last_digito == 1 || last_digito == 2 ? "pecabranca" : "pecapreta"}" />
    `;
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

function ValidarJogadapeao() {
  return 'JogadaPossivel'
}

function ValidarJogadatorre() {
  return "JogadaPossivel";
}

function ValidarJogadacavalo(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  //converter posicao selecionada em array de numeros
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

function ValidarJogadabispo() {
  return "JogadaPossivel";
}

function ValidarJogadarainha() {
  return "JogadaPossivel";
}

function ValidarJogadarei() {
  return "JogadaPossivel";
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
    var chamarValidacao = "ValidarJogada" + pecaEscolhida + "(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero)";
    if (eval(chamarValidacao) == "JogadaPossivel") {
      MovimentarPecas(armazenarJogada);
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
  casaAdicionarPeca.innerHTML += `<img id="${pecaRemover.id.slice(0, -2) + casaAdicionarPeca.id}" src="${ pecaRemover.id.slice(0, -2) + '.png'}" class="peca ${pecaRemover.name}" name="${pecaRemover.name}">`
  armazenarJogada = []
  
}
GerarTabuleiro();
ColocarPecasTabuleiro();

//estou organizando o xadrez como se estivesse jogando com peças brancas
//atributo