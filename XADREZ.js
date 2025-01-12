const tabuleiro = document.getElementById("tabuleiro");

const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const pecasXadrez = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre']

function GerarTabuleiro() {
  for(var i = 9; i > 1; i--){
    tabuleiro.innerHTML += `<div id="${i+1}" class="linhatabuleiro">${i-1}</div>`
    const linha = document.getElementById(i+1);

    if(i % 2 == 0){
      cor = "preta";
    }else if(i % 2 != 0) {
      cor = "branca"
    }

    for(var j = 0; j < 8; j++){
      //casas
      if(cor == "branca"){
        var casaclicada = `${alfabeto[j]}${i-1}`
        linha.innerHTML += `<button onclick="JogadaSelecionada(${casaclicada})" id="${alfabeto[j]}${i-1}" class="quadrado ${cor}">${alfabeto[j]}${i-1}</button>`;
        cor = "preta"
      }else if(cor == "preta"){
        var casaclicada = `${alfabeto[j]}${i-1}`
        linha.innerHTML += `<button onclick="JogadaSelecionada(${casaclicada})" id="${alfabeto[j]}${i-1}" class="quadrado ${cor}">${alfabeto[j]}${i-1} </button>`;
        cor = "branca"
      }
    }
  }
}

function ColocarPecasTabuleiro(){
  for(var y = 0; y < 8; y++){
    for(var x = 0; x < 8; x++){
      var casas = document.getElementById(`${alfabeto[y]}${x+1}`)
      var casasUltimoNumero = casas.id.slice(1)

      if(casasUltimoNumero == 2||casasUltimoNumero == 7){
        casas.innerHTML += `<img id="peao${alfabeto[y]}${x+1}" class="peca">`
        const peca = document.getElementById(`peao${alfabeto[y]}${x+1}`)
        peca.setAttribute("src", 'peao.png')
      }else if(casasUltimoNumero == 1){
        casas.innerHTML += `<img id="${pecasXadrez[y]}${alfabeto[y]}${x+1}" class="peca">`
        const peca = document.getElementById(`${pecasXadrez[y]}${alfabeto[y]}${x+1}`)
        peca.setAttribute("src", pecasXadrez[y] + '.png')
      }else if(casasUltimoNumero == 8) {
        casas.innerHTML += `<img id="${pecasXadrez[y]}${alfabeto[y]}${x+1}" class="peca">`
        var peca = document.getElementById(`${pecasXadrez[y]}${alfabeto[y]}${x+1}`)
        peca.setAttribute("src", pecasXadrez[y] + '.png')
      }
    }
  }
}

function ValidarJogadapeao(){
  var casaAtual = armazenarJogada[0].slice(-2)
  var proximaCasa = armazenarJogada[1]
  var casaAtualNumero = parseInt(casaAtual.slice(1))
  var proximaCasaNumero = parseInt(proximaCasa.slice(1))
  if(proximaCasaNumero != casaAtualNumero + 1){
    return 'JogadaImpossivel'
  }
  return 'JogadaPossivel'
}

function ValidarJogadatorre(){
  return 'JogadaPossivel'
}

function ValidarJogadacavalo(){
  return 'JogadaPossivel'
}

function ValidarJogadabispo(){
  return 'JogadaPossivel'
}

function ValidarJogadarainha(){
  return 'JogadaPossivel'
}

function ValidarJogadarei(){
  return 'JogadaPossivel'
}

var armazenarJogada = []
function JogadaSelecionada(localizacaoclick){
if(armazenarJogada.length == 0){
    var pecaCasaSelecionada = localizacaoclick.querySelector('img')
    armazenarJogada.push(pecaCasaSelecionada.id)
  }else{
    armazenarJogada.push(localizacaoclick.id)
  }

  if(armazenarJogada.length == 2){
    var pecaEscolhida = armazenarJogada[0].slice(0, -2)

    var chamarValidacao = 'ValidarJogada' + pecaEscolhida + '()'
    if(eval(chamarValidacao) == 'JogadaPossivel'){
      MovimentarPecas(armazenarJogada)
    }else{
      console.log('Jogada Impossivel')
      armazenarJogada = []
    }

  }
}

function MovimentarPecas(){
    var casaRemoverPeca = document.getElementById(armazenarJogada[0].slice(-2))
    var pecaRemover = casaRemoverPeca.querySelector('img')
    pecaRemover.removeAttribute('src')

    var casaAdicionarPeca = document.getElementById(armazenarJogada[1])
    var pecaAdicionar = armazenarJogada[0].slice(0, -2)
    casaAdicionarPeca.innerHTML += `<img id="${pecaAdicionar + casaAdicionarPeca.id}" src="${pecaAdicionar + '.png'}" class="peca" >`
    armazenarJogada = []
}

GerarTabuleiro()
ColocarPecasTabuleiro()

//estou organizando o xadrez como se estivesse jogando com peças brancas
//atributo