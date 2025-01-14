const tabuleiro = document.getElementById("tabuleiro");

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h"];

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

    for (var j = 0; j < 8; j++) {
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
  const peca = document.getElementById(armazenarJogada[0])
  const corPeca = peca.name
  const casaAtual = armazenarJogada[0].slice(-2)
  const casaAdicionarPeca = armazenarJogada[1]
  if(corPeca == 'pecabranca' && casaAdicionarPeca.slice(-1) == parseInt(casaAtual.slice(-1)) + 1){
    console.log('TESTEFUNCIONOU')
  }

  if(corPeca == 'pecapreta'){
    
  }
  return 'JogadaPossivel'
}

function ValidarJogadatorre() {
  return "JogadaPossivel";
}

function ValidarJogadacavalo() {
  return "JogadaPossivel";
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
    var pecaEscolhida = armazenarJogada[0].slice(0, -2);

    var chamarValidacao = "ValidarJogada" + pecaEscolhida + "()";
    if (eval(chamarValidacao) == "JogadaPossivel") {
      MovimentarPecas(armazenarJogada);
    } else {
      console.log("Jogada Impossivel");
      armazenarJogada = [];
    }
  }
}

function MovimentarPecas() {
  var casaRemoverPeca = document.getElementById(armazenarJogada[0].slice(-2));
  console.log("casaREMOVERPECA", casaRemoverPeca);
  var pecaRemover = casaRemoverPeca.querySelector("img");
  pecaRemover.removeAttribute("src");

  var casaAdicionarPeca = document.getElementById(armazenarJogada[1]);
  var pecaAdicionar = armazenarJogada[0].slice(0, -2);
  casaAdicionarPeca.innerHTML += `<img id="${
    pecaAdicionar + casaAdicionarPeca.id
  }" class="peca" >`;
  var novaPeca = document.getElementById(pecaAdicionar + casaAdicionarPeca.id);
  novaPeca.setAttribute("src", pecaAdicionar + ".png");
  armazenarJogada = [];
}

GerarTabuleiro();
ColocarPecasTabuleiro();

//estou organizando o xadrez como se estivesse jogando com peças brancas
//atributo
