
var armazenarJogada = [];
var eixo_x = {a: 1, b: 2, c:3, d:4, e:5, f:6, g:7, h:8}

function JogadaSelecionada(localizacaoclick) {
  if (armazenarJogada.length == 0) {
    var pecaCasaSelecionada = localizacaoclick.querySelector("img");
    armazenarJogada.push(pecaCasaSelecionada.id);
  } else {
    armazenarJogada.push(localizacaoclick.id);
  }

  if (armazenarJogada.length == 2) {
    chamarValidacaoMovimentacao(localizacaoclick)
  }
}


function MovimentarPecas() {
  var casaRemoverPeca = document.getElementById(armazenarJogada[0].slice(-2))
  var pecaRemover = casaRemoverPeca.querySelector('img')
  pecaRemover.remove()

  var casaAdicionarPeca = document.getElementById(armazenarJogada[1])
    const imageRm = casaAdicionarPeca.querySelector('img');
    if(imageRm){
      imageRm.remove()
    }
  casaAdicionarPeca.innerHTML += `<img id="${pecaRemover.id.slice(0, -2) + casaAdicionarPeca.id}" src="${ pecaRemover.id.slice(0, -2) + '.png'}" class="peca ${pecaRemover.name}" name="${pecaRemover.name}" primeiraJogada=${pecaRemover.getAttribute('primeiraJogada')}>`
  armazenarJogada = []
}

function chamarValidacaoMovimentacao(localizacaoclick) {
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

    MovimentarPecas();

    adicionarAtributoPecaDentroProximaCasa.setAttribute('pecaDentro', pecaDentro)
    buscarpecaDentroCasa.removeAttribute('pecadentro')
  } else {
    console.log("Jogada Impossivel");
    armazenarJogada = [];
  }
}

function verificarObstaculosMovimentacao() {
  
}