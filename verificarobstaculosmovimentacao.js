var eixo_y_2 = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h'}

function VerificarObstaculosTorre(proximaPosicaoEmNumeroTorre, posicaoAtualEmNumeroTorre){
  var casasEntrePontos = []
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