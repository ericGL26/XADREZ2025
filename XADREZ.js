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
      if(cor == "branca"){
        var casaclicada = `${alfabeto[j]}${i-1}`
        linha.innerHTML += `<button onclick="MovimentarPecas(${casaclicada})" id="${alfabeto[j]}${i-1}" class="quadrado ${cor}">${alfabeto[j]}${i-1}</button>`;
        cor = "preta"
      }else if(cor == "preta"){
        var casaclicada = `${alfabeto[j]}${i-1}`
        linha.innerHTML += `<button onclick="MovimentarPecas(${casaclicada})" id="${alfabeto[j]}${i-1}" class="quadrado ${cor}">${alfabeto[j]}${i-1} </button>`;
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
        casas.innerHTML += `<img src="peao.png" class="peca">`
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

function MovimentarPecas(localizacaoclick){
  var butaoTESTE = document.getElementById(localizacaoclick.id)
  const VerificarExistenciaPeca = butaoTESTE.querySelector('img')
  console.log('EAEJULIASASAS', VerificarExistenciaPeca)
  butaoTESTE.style.color = "orange"
}

GerarTabuleiro()
ColocarPecasTabuleiro()

//estou organizando o xadrez como se estivesse jogando com peças brancas
//atributo