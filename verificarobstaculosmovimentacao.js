var eixo_y_2 = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h'}

function VerificarObstaculosTorre(proximaPosicaoEmNumeroTorre, posicaoAtualEmNumeroTorre, localizacaoclick){
  let casasEntrePontos = []
  let [x1, y1] = posicaoAtualEmNumeroTorre
  let [x2, y2] = proximaPosicaoEmNumeroTorre

  //armazenar casas entre pontos, movimento vertical
  if(x1 == x2){
    let menor = Math.min(y1, y2)
    let maior = Math.max(y1, y2)
    for(let y = menor + 1; y < maior; y++){
      casasEntrePontos.push([x1, y])
    }
  }
  //armazenar casas entre pontos, movimento horizontal
  if(y1 == y2){
    let menor = Math.min(x1, x2)
    let maior = Math.max(x1, x2)
    for(let x = menor + 1; x < maior; x++){
      casasEntrePontos.push([x, y1])
    }
  }
  //consultar todas as casas entra o ponto inicial e final
  var casasEntrePontosFormatoPadrao = []
  for(let x = 0; x < casasEntrePontos.length; x++){
    casasEntrePontosFormatoPadrao.push([eixo_y_2[casasEntrePontos[x][0]] + casasEntrePontos[x][1]])
  }

  let buscarPecaAtual = document.getElementById(casaEntrePontos[0])
  let corPecaAtual = (buscarPecaAtual.querySelector('img')).name
  let corPecaSeCapturar = (localizacaoclick.querySelector('img'))?.name || "semPeca" 

  for (let x = 0; x < casasEntrePontosFormatoPadrao.length; x++){
    var buscarcasas = document.getElementById(casasEntrePontosFormatoPadrao[x])
    var pecadentro = buscarcasas.getAttribute('pecaDentro')
    if(pecadentro != null){
      return true
    }
  }
  console.log('casaentrepontosformatopadrao', casasEntrePontosFormatoPadrao)
  return false
}

function VerificarObstaculosBispo(proximaPosicaoEmNumeroBispo, posicaoAtualEmNumeroBispo, localizacaoclick){
  let [x1, y1] = posicaoAtualEmNumeroBispo
  let [x2, y2] = proximaPosicaoEmNumeroBispo
  let casasEntrePontos = []

  //direcao movimento
  let direcaoX = (x2 > x1) ? 1 : -1
  let direcaoY = (y2 > y1) ? 1 : -1

  //calcular casas em que o bispo passa
  for (let i = 1; i < Math.abs(y2 - y1); i++){
    var casa = [x1 + i * direcaoX, y1 + i * direcaoY];
    casasEntrePontos.push(casa)
}
  for(let x = 0; x < casasEntrePontos.length; x++){
    let idCasa = eixo_y_2[casasEntrePontos[x][0]] + casasEntrePontos[x][1];
    let buscarcasa = document.getElementById(idCasa);
    if (buscarcasa.getAttribute('pecadentro')) {
      return true;
    }
  }
}

function VerificarObstaculosRainha(proximaPosicaoEmNumeroRainha, posicaoAtualEmNumeroRainha, localizacaoclick){
  let [x1, y1] = posicaoAtualEmNumeroRainha
  let [x2, y2] = proximaPosicaoEmNumeroRainha

  var direcao = (x1 != x2 && y1 == y2) ? direcao = "horizontal"
  : (x1 == x2 && y1 != y2) ? direcao = "vertical"
  : (x2 > x1 && y1 != y2) ? direcao = "diagonalDireita"
  : (x2 < x1 && y1 != y2) ? direcao = "diagonalEsquerda" : "MOVIMENTO-INVALIDO"

  var casaEntrePontos = []
  console.log('direcao', direcao)

  if(direcao == "horizontal"){
    let passoX = x2 > x1 ? 1 : -1
    let x = x1

    while(x != x2){
      casaEntrePontos.push([eixo_y_2[x] + y2.toString()])
      x += passoX
    }
  }

  if(direcao == "vertical"){
    let passoY = y2 > y1 ? 1 : -1
    let y = y1

    while(y != y2){
      casaEntrePontos.push([eixo_y_2[x2] + y.toString()])
      y += passoY
    }
  }

  if(direcao == "diagonalDireita" || direcao == "diagonalEsquerda"){
    let passoX = x2 > x1 ? 1 : -1
    let passoY = y2 > y1 ? 1 : -1
    let x = x1
    let y = y1

    while(x != x2 && y != y2){
      casaEntrePontos.push([eixo_y_2[x] + y.toString()])
      x += passoX
      y += passoY
    }    
  }

  const casaEntrePontosSemCasaDestino = [...casaEntrePontos]; // Criamos uma cópia para manter a referência original
  casaEntrePontos.push(localizacaoclick.id); // Adiciona a casa do destino ao array
  
  let buscarPecaAtual = document.getElementById(casaEntrePontos[0]);
  let corPecaAtual = buscarPecaAtual.querySelector('img')?.name || "semPeca";
  const corPecaSeCapturar = localizacaoclick.querySelector('img')?.name || "semPeca";
  
  // Remove a casa de origem do array para verificar somente as casas intermediárias
  casaEntrePontos.shift();
  
  let encontrouPecaNoCaminho = false; // Flag para identificar se há uma peça bloqueando o caminho
  
  for (let u = 0; u < casaEntrePontos.length; u++) {
      const buscarCasas = document.getElementById(casaEntrePontos[u]);
      const pecaDentroCasa = buscarCasas.getAttribute('pecadentro');
  
      if (pecaDentroCasa) {
          if (u === casaEntrePontos.length - 1) { 
              // Se for a última casa (casa de destino)
              if (corPecaSeCapturar === corPecaAtual) {
                  return true; // Movimento inválido (não pode capturar peça da mesma cor)
              }
          } else {
              encontrouPecaNoCaminho = true; // Marcamos que há uma peça bloqueando o caminho
          }
      }
  }
  
  // Se encontrou uma peça no caminho e o destino tem uma peça inimiga, a captura não pode acontecer
  if (encontrouPecaNoCaminho) {
      return true;
  }
  
  return false;
  
}

function VerificarObstaculosRei(proximaPosicaoEmNumeroRei, posicaoAtualEmNumeroRei, localizacaoclick){
  return false
}