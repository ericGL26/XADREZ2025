function VerificarObstaculosTorre(proximaPosicaoEmNumeroTorre, posicaoAtualEmNumeroTorre){
  var casasEntrePontos = [

  ]

  let [x1, y1] = posicaoAtualEmNumeroTorre
  let [x2, y2] = proximaPosicaoEmNumeroTorre
  //verificando casas entre o movimento vertical
  if(x1 == x2){
    let menor = Math.min(y1, y2)
    let maior = Math.max(y1, y2)
    for(let y = menor + 1; y < maior; y++){
      casasEntrePontos.push([x1, y])
    }
  }
  //verificando casas entre o movimento horizontal
  if(y1 == y2){
    let menor = Math.min(x1, x2)
    let maior = Math.max(x1, x2)
    for(let x = menor + 1; x < maior; x++){
      casasEntrePontos.push([x, y1])
    }
  }


  console.log('casaentrepontos', casasEntrePontos)
  return false
}