var eixo_x = {a: 1, b: 2, c:3, d:4, e:5, f:6, g:7, h:8}
var transformarLetraEmNumero = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
var numeroParaLetra = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h' };


//ADICIONAR CASA EM QUE O REI ESTA PARA VALIDAR O XEQUE-MATE ALEM DA QUE ELE TEM DOMINIO SO ADICONAR LA NA PARTE QUE SO TEM DOIS NA ARRAY
function ArmazenarCasasReisDominam(){
  const reiBranco = document.querySelector("[pecadentro='rei'][reidentro='reiBranco']");
  const reiPreto = document.querySelector("[pecadentro='rei'][reidentro='reiPreto']")

  //definir casas em que o rei tem dominio, adversario e jogador
  var casasControleReiBranco = []
  var casasControleReiPreto = []
  const controlador_rei = {0: casasControleReiBranco, 1: casasControleReiPreto}

  for(let contador = 0; contador < 2; contador++){
    if(contador == 0){
      var posicaoEmNumeroRei = [eixo_x[reiBranco.id[0]], reiBranco.id[1]]
    }else{
      var posicaoEmNumeroRei = [eixo_x[reiPreto.id[0]], reiPreto.id[1]]
    }
    controlador_rei[contador].push(
      [Math.abs(posicaoEmNumeroRei[0]) - 1, Math.abs(posicaoEmNumeroRei[1]) + 1],
      [Math.abs(posicaoEmNumeroRei[0]), Math.abs(posicaoEmNumeroRei[1]) + 1],
      [Math.abs(posicaoEmNumeroRei[0]) + 1, Math.abs(posicaoEmNumeroRei[1]) + 1],

      [Math.abs(posicaoEmNumeroRei[0]) - 1, Math.abs(posicaoEmNumeroRei[1])],
      [Math.abs(posicaoEmNumeroRei[0]) + 1, Math.abs(posicaoEmNumeroRei[1])],
      //posicao atual rei
      [Math.abs(posicaoEmNumeroRei[0]), Math.abs(posicaoEmNumeroRei[1])],

      [Math.abs(posicaoEmNumeroRei[0]) - 1, Math.abs(posicaoEmNumeroRei[1]) - 1],
      [Math.abs(posicaoEmNumeroRei[0]), Math.abs(posicaoEmNumeroRei[1]) - 1],
      [Math.abs(posicaoEmNumeroRei[0]) + 1, Math.abs(posicaoEmNumeroRei[1]) - 1],
    ) 
  }

  let {pecasTabuleiro} = AdicionarArrayCasasPecasBrancoPreto()
  calcularDominiosDeCasas(reiBranco, reiPreto, pecasTabuleiro, casasControleReiBranco, casasControleReiPreto)
}

function AdicionarArrayCasasPecasBrancoPreto(){
  //adicionar o id de todas as casas do tabuleiro em uma variavel
  let numeros = ['1', '2', '3', '4', '5', '6', '7', '8']
  let letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  var todasCasasTabuleiro = []

  for(let contadorNumeros = 0; contadorNumeros < 8; contadorNumeros++){
    for(let contadorLetras = 0; contadorLetras < 8; contadorLetras++){
      todasCasasTabuleiro.push(`${letras[contadorLetras]}${numeros[contadorNumeros]}`)
    }
  }

  //Seperar todas as pecas brancas em pretas em duas arrays separadas
  //AS VARIAVEIS ABAIXO DEVEM SEGUIR O PADRAO ['TIPOPECA', 'LOCALIZACAO']
  var pecasTabuleiro = []

  for(let contador = 0; contador < 64; contador++){
    var buscarTodasAsCasasTabuleiro = document.getElementById(todasCasasTabuleiro[contador])
    var Peca = buscarTodasAsCasasTabuleiro ? buscarTodasAsCasasTabuleiro.querySelector('img') || "SemPecaDentro" : "SemPecaDentro";
    if(Peca != "SemPecaDentro"){
      pecasTabuleiro.push([Peca.id.slice(-2), Peca.id.slice(0, -2)])
    }
  }
  return {pecasTabuleiro}
}

function calcularDominiosDeCasas(reiBranco, reiPreto, pecasTabuleiro, casasControleReiBranco, casasControleReiPreto){
  var casasControleBrancas = []
  var casasControlePretas = []

  //logica pra calcular quais casas cada peça dominam
  for (let pecaVez = 0; pecaVez < pecasTabuleiro.length; pecaVez++) {
    var [x1, y1] = [transformarLetraEmNumero[pecasTabuleiro[pecaVez][0][0]], pecasTabuleiro[pecaVez][0][1]];

    switch (pecasTabuleiro[pecaVez][1]) {
      case 'peao': //CASE PEAO
          break;
      case 'torre': //CASE TORRE
      for(let repetidor = 1; repetidor < 9; repetidor++){
        let horizontalEsquerda = [x1 - repetidor, parseInt(y1)]
        let horizontalDireita = [x1 + repetidor, parseInt(y1)]
        let verticalCima = [x1, parseInt(y1) + repetidor]
        let verticalBaixo = [x1, parseInt(y1) + repetidor]
        //filtros
        horizontalEsquerda = [horizontalEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        horizontalDireita = [horizontalDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        verticalCima = [verticalCima].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        verticalBaixo = [verticalBaixo].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        //verificar time peça e adicionar corretamente a casa que cada time domina
        let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0])
        let timePeca = buscarPeca.querySelector('img')?.name || "semPeca"

        if(timePeca == 'pecabranca'){
          if (horizontalEsquerda !== null) casasControleBrancas.push(horizontalEsquerda);
          if (horizontalDireita !== null) casasControleBrancas.push(horizontalDireita);
          if (verticalCima !== null) casasControleBrancas.push(verticalCima);
          if (verticalBaixo !== null) casasControleBrancas.push(verticalBaixo);
       }else if(timePeca == 'pecapreta'){
          if (horizontalEsquerda !== null) casasControlePretas.push(horizontalEsquerda);
          if (horizontalDireita !== null) casasControlePretas.push(horizontalDireita);
          if (verticalCima !== null) casasControlePretas.push(verticalCima);
          if (verticalBaixo !== null) casasControlePretas.push(verticalBaixo);
       }
      }
        break;
      case 'cavalo': //CASE CAVALO
        break;
      case 'bispo': //CASE BISPO
      for(let repetidor = 1; repetidor < 9; repetidor++){
         let diagonalSuperiorEsquerda =  [x1 - repetidor, parseInt(y1) + repetidor]
         let diagonalSuperiorDireita = [x1 + repetidor, parseInt(y1) + repetidor]
         let diagonalInferiorEsquerda = [x1 - repetidor, parseInt(y1) - repetidor]
         let diagonalInferiorDireita =  [x1 + repetidor, parseInt(y1) - repetidor]
         //filtros
         diagonalSuperiorEsquerda = [diagonalSuperiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
         diagonalSuperiorDireita = [diagonalSuperiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
         diagonalInferiorEsquerda = [diagonalInferiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
         diagonalInferiorDireita = [diagonalInferiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
         //verificar time peça e adicionar corretamente a casa que cada time controla
         let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0])
         let timePeca = buscarPeca.querySelector('img')?.name || "SemPeca"

         if(timePeca == 'pecabranca'){
            if (diagonalSuperiorEsquerda !== null) casasControleBrancas.push(diagonalSuperiorEsquerda);
            if (diagonalSuperiorDireita !== null) casasControleBrancas.push(diagonalSuperiorDireita);
            if (diagonalInferiorEsquerda !== null) casasControleBrancas.push(diagonalInferiorEsquerda);
            if (diagonalInferiorDireita !== null) casasControleBrancas.push(diagonalInferiorDireita);
         }else if(timePeca == 'pecapreta'){
            if (diagonalSuperiorEsquerda !== null) casasControlePretas.push(diagonalSuperiorEsquerda);
            if (diagonalSuperiorDireita !== null) casasControlePretas.push(diagonalSuperiorDireita);
            if (diagonalInferiorEsquerda !== null) casasControlePretas.push(diagonalInferiorEsquerda);
            if (diagonalInferiorDireita !== null) casasControlePretas.push(diagonalInferiorDireita);
         }
      }
        break;
      case 'rainha': //CASE RAINHA
        break;
      case 'rei': //CASE REI
        
        break;
    }

  }
  //colorir casas sobre dominio de vermelho
  for(let cor = 0; cor < 70; cor++){
    console.log('casaCOntroleBrancas', casasControleBrancas[cor].length)
    let casa = document.getElementById(numeroParaLetra[casasControleBrancas[cor][0]] + casasControleBrancas[cor][1])
    casa.style.backgroundColor = "red"
   }
}