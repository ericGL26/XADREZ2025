const tabuleiro = document.getElementById("tabuleiro");

const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

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
        linha.innerHTML += `<div id="${alfabeto[j]}${i-1}" class="quadrado ${cor}">${alfabeto[j]}${i-1}</div>`;
        cor = "preta"
      }else if(cor == "preta"){
        linha.innerHTML += `<div id="${alfabeto[j]}${i-1}" class="quadrado ${cor}">${alfabeto[j]}${i-1} </div>`;
        cor = "branca"
      }
    }

  }
}


function ColocarPecasTabuleiro(){
  for(var y = 0; y < 8; y++){
    for(var x = 0; x < 8; x++){
      var casas = document.getElementById(`${alfabeto[y]}${x+1}`)
      if(casas.id.slice(1) == 2||casas.id.slice(1) == 7){
        casas.innerHTML += `<img src="peao.png" class="peao">`
      }
      console.log('casaslength', casas.id.slice(1))
    }
  }
}




GerarTabuleiro()
ColocarPecasTabuleiro()
//estou organizando o xadrez como se estivesse jogando com peças brancas