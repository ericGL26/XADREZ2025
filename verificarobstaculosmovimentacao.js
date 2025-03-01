var eixo_y_2 = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h'}

function VerificarObstaculosTorre(proximaPosicaoEmNumeroTorre, posicaoAtualEmNumeroTorre){
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

function VerificarObstaculosBispo(proximaPosicaoEmNumeroBispo, posicaoAtualEmNumeroBispo){
  let [x1, y1] = posicaoAtualEmNumeroBispo
  let [x2, y2] = proximaPosicaoEmNumeroBispo
  let casasEntrePontos = []

  let quantidadeDeCasasDiagonal = Math.abs((y2 - y1))
  let diagonalSubindo = (y2 > y1) ? true : false
  
  //identifica a direcao do movimento
  let direcaoMovimentoDiagonal = ''
  let IdentificarDirecaoMovimentoDiagonal = 
      (x2 < x1 && y2 > y1) ? direcaoMovimentoDiagonal = "movimentoDiagonalSuperiorEsquerdo"
    : (x2 > x1 && y2 > y1) ? direcaoMovimentoDiagonal = "movimentoDiagonalSuperiorDireta"
    : (x2 < x1 && y2 < y1) ? direcaoMovimentoDiagonal = "movimentoDiagonalInferiorEsquerdo"
    : (x2 > x1 && y2 < y1) ? direcaoMovimentoDiagonal = "movimentoDiagonalInferiorDireita" : "JogadaImpossivel"



  if(IdentificarDirecaoMovimentoDiagonal == "movimentoDiagonalSuperiorEsquerdo"){
    for(let x = 1; x < quantidadeDeCasasDiagonal; x++){
      casasEntrePontos.push([posicaoAtualEmNumeroBispo[0] - x, posicaoAtualEmNumeroBispo[1] + x])
    }
  }else if (IdentificarDirecaoMovimentoDiagonal == "movimentoDiagonalSuperiorDireta"){
    for(let x = 1; x < quantidadeDeCasasDiagonal; x++){
      casasEntrePontos.push([posicaoAtualEmNumeroBispo[0] + x, posicaoAtualEmNumeroBispo[1] + x])
    }
  } else if(IdentificarDirecaoMovimentoDiagonal == "movimentoDiagonalInferiorEsquerdo"){
    for(let x = 1; x < quantidadeDeCasasDiagonal; x++){
      casasEntrePontos.push([posicaoAtualEmNumeroBispo[0] - x, posicaoAtualEmNumeroBispo[1] - x])
    }
  }else if(IdentificarDirecaoMovimentoDiagonal == "movimentoDiagonalInferiorDireita"){
    for(let x = 1; x < quantidadeDeCasasDiagonal; x++){
      casasEntrePontos.push([posicaoAtualEmNumeroBispo[0] + x, posicaoAtualEmNumeroBispo[1] - x])
    }
  }

  for(let x = 0; x < casasEntrePontos.length; x++){
    var casasEntrePontosFormatoPadrao = [eixo_y_2[casasEntrePontos[x][0]] + casasEntrePontos[x][1]]
    let buscarCasasEntrePontos = document.getElementById(casasEntrePontosFormatoPadrao)
    if(buscarCasasEntrePontos.getAttribute('pecadentro')){
      return true
    }else {
      return false
    }
  }

  console.log('casaentreOSPONTOS', casasEntrePontos)

  return false
}