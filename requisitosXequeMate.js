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
  CalcularDominioPecas(pecasTabuleiro) //toda vez que o jogador mover uma peça essa funcao vai ser chamada
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
};

function VerificarImpedimento(direcao){
  var listaCasas = []
  let converterFormatoId = (direcao != null) ? numeroParaLetra[direcao[0]] + direcao[1] : "NaoFoiPossivelConverterId"
  let buscarCasa = (converterFormatoId != "NaoFoiPossivelConverterId") ? document.getElementById(converterFormatoId) : "NaoFoiPossivelEncontrarACasa"

  let casasLivres = (buscarCasa != "NaoFoiPossivelEncontrarACasa")
  ? (buscarCasa.getAttribute('pecadentro') ? listaCasas.push("impedimento") : listaCasas.push(direcao[0], direcao[1])) // adicionando direcao[0] e 1 para evitar array de arrays ja que direcao é uma array, desse jeito é evitado a formaçao de arrays de arrays
  : "NaoFoiPossivelEncontrarACasa";
  return listaCasas
}

function CalcularDominioPecas(pecasTabuleiro){
  //PINTAR CASAS SEM DOMINIO PARA CINZA (TEMPORARIO)
  for (let cor = 1; cor < 9; cor++) {
    for (let cordois = 1; cordois < 9; cordois++) { // Agora cordois está sendo corretamente incrementado
        let casa = document.getElementById(numeroParaLetra[cor] + cordois);
        //console.log('casas', casa)
        casa.style.backgroundColor = "gray";
    }
}



  console.clear()
  var casasControleBrancas = []
  var casasContreolePretas = []
  

 for(let pecaVez = 0; pecaVez < 32; pecaVez++){ //quantidade de peças original no tabuleiro
  var [x1, y1] = [transformarLetraEmNumero[pecasTabuleiro[pecaVez][0][0]], pecasTabuleiro[pecaVez][0][1]]; //transforma o id do bispo:a1 em 1,1. para poder calcular as casas que ele domina e entre outras coisas

  switch(pecasTabuleiro[pecaVez][1]){
    case 'peao':
      break;
    case 'torre':
      // Flags que controlam o push de casas livres ou impedidas; ao encontrar um impedimento, param a adição sem precisar de vários ifs ou loops. false = nao bloqueia, mudei para let antes era var se der erro provavelmente é por isso
      let bloqueiaEsquerda = false
      let bloqueiaDireita = false
      let bloqueiaCima = false
      let bloqueiaBaixo = false

      //tenho que lembrar que isso roda 4 vezes printado as 4 vezes separadamente mas no console ficam juntas oque pode gerar confusao: isso vale para todas as cases
      for(let repetidor = 1; repetidor < 9; repetidor++){ //calcula as casas que as direcoes da torre tem 'dominio'
        let horizontalEsquerda = [x1 - repetidor, parseInt(y1)]
        let horizontalDireita = [x1 + repetidor, parseInt(y1)]
        let verticalCima = [x1, parseInt(y1) + repetidor]
        let verticalBaixo = [x1, parseInt(y1) - repetidor]
        //filtros
        horizontalEsquerda = [horizontalEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null; //filtra os valores exemplo se horizontalEsquerda for igual a [8, 15] ele tira esse dado para tirar casas que nao existem e deixar apenas as que a torre tem 'dominio'
        horizontalDireita = [horizontalDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        verticalCima = [verticalCima].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        verticalBaixo = [verticalBaixo].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;

        horizontalEsquerda = VerificarImpedimento(horizontalEsquerda)
        horizontalDireita = VerificarImpedimento(horizontalDireita)
        verticalCima = VerificarImpedimento(verticalCima)
        verticalBaixo = VerificarImpedimento(verticalBaixo)

        //adicionar casas que a torre domina na lista de acordo com a cor
        let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0]) //pode estar causando problema pois roda 32 vezes 16 para cada cor
        const timePeca = buscarPeca.querySelector('img')?.name || "semPeca"

        if(timePeca == 'pecabranca'){

          if(horizontalEsquerda[0] == "impedimento"){bloqueiaEsquerda = true}
           if(bloqueiaEsquerda != true){
            casasControleBrancas.push(horizontalEsquerda)
          }

          if(horizontalDireita[0] == "impedimento"){bloqueiaDireita = true}
           if(bloqueiaDireita != true){
            casasControleBrancas.push(horizontalDireita)
          }

          if(verticalCima[0] == "impedimento"){bloqueiaCima = true}
          if(bloqueiaCima != true){
            casasControleBrancas.push(verticalCima)
          }

          if(verticalBaixo[0] == "impedimento"){bloqueiaBaixo = true}
          if(bloqueiaBaixo != true){
            casasControleBrancas.push(verticalBaixo)
          }
         
        }
        if(timePeca == 'pecapreta'){

          if(horizontalEsquerda[0] == "impedimento"){bloqueiaEsquerda = true}
           if(bloqueiaEsquerda != true){
            casasContreolePretas.push(horizontalEsquerda)
          }

          if(horizontalDireita[0] == "impedimento"){bloqueiaDireita = true}
           if(bloqueiaDireita != true){
            casasContreolePretas.push(horizontalDireita)
          }

          if(verticalCima[0] == "impedimento"){bloqueiaCima = true}
          if(bloqueiaCima != true){
            casasContreolePretas.push(verticalCima)
          }

          if(verticalBaixo[0] == "impedimento"){bloqueiaBaixo = true}
          if(bloqueiaBaixo != true){
            casasContreolePretas.push(verticalBaixo)
          }

        }
      }
      break;
    case 'cavalo':
      let bloquearLateralSuperiorEsquerda = false;
      let bloquearLateralSuperiorDireita = false;
      let bloquearLateralInferiorEsquerda = false;
      let bloquearLateralInferiorDireita = false;
      let bloquearLateralHorizontalEsquerdaCima = false;
      let bloquearLateralHorizontalEsquerdaBaixo = false;
      let bloquearLateralHorizontalDireitaCima = false;
      let bloquearLateralHorizontalDireitaBaixo = false;

      let lateralSuperiorEsquerda = [x1 - 1, parseInt(y1) + 2];
      let lateralSuperiorDireita = [x1 + 1, parseInt(y1) + 2];
      let lateralInferiorEsquerda = [x1 - 1, parseInt(y1) - 2];
      let lateralInferiorDireita = [x1 + 1, parseInt(y1) - 2];
      let lateralHorizontalEsquerdaCima = [x1 - 2, parseInt(y1) + 1];
      let lateralHorizontalEsquerdaBaixo = [x1 - 2, parseInt(y1) - 1];
      let lateralHorizontalDireitaCima = [x1 + 2, parseInt(y1) + 1];
      let lateralHorizontalDireitaBaixo = [x1 + 2, parseInt(y1) - 1];
      // filtros
      lateralSuperiorEsquerda = [lateralSuperiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralSuperiorDireita = [lateralSuperiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralInferiorEsquerda = [lateralInferiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralInferiorDireita = [lateralInferiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralHorizontalEsquerdaCima = [lateralHorizontalEsquerdaCima].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralHorizontalEsquerdaBaixo = [lateralHorizontalEsquerdaBaixo].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralHorizontalDireitaCima = [lateralHorizontalDireitaCima].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      lateralHorizontalDireitaBaixo = [lateralHorizontalDireitaBaixo].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;

      lateralSuperiorEsquerda = VerificarImpedimento(lateralSuperiorEsquerda);
      lateralSuperiorDireita = VerificarImpedimento(lateralSuperiorDireita);
      lateralInferiorEsquerda = VerificarImpedimento(lateralInferiorEsquerda);
      lateralInferiorDireita = VerificarImpedimento(lateralInferiorDireita);
      lateralHorizontalEsquerdaCima = VerificarImpedimento(lateralHorizontalEsquerdaCima);
      lateralHorizontalEsquerdaBaixo = VerificarImpedimento(lateralHorizontalEsquerdaBaixo);
      lateralHorizontalDireitaCima = VerificarImpedimento(lateralHorizontalDireitaCima);
      lateralHorizontalDireitaBaixo = VerificarImpedimento(lateralHorizontalDireitaBaixo);

      let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0])
      const timePeca = buscarPeca.querySelector('img')?.name || "semPeca"    
      

      if(timePeca == 'pecabranca'){

      if (lateralSuperiorEsquerda[0] == "impedimento") {bloquearLateralSuperiorEsquerda = true;}
      if (bloquearLateralSuperiorEsquerda != true) {
          casasControleBrancas.push(lateralSuperiorEsquerda);
      }
      
      if (lateralSuperiorDireita[0] == "impedimento") {bloquearLateralSuperiorDireita = true;}
      if (bloquearLateralSuperiorDireita != true) {
          casasControleBrancas.push(lateralSuperiorDireita);
      }
      
      if (lateralInferiorEsquerda[0] == "impedimento") {bloquearLateralInferiorEsquerda = true;}
      if (bloquearLateralInferiorEsquerda != true) {
          casasControleBrancas.push(lateralInferiorEsquerda);
      }
      
      if (lateralInferiorDireita[0] == "impedimento") {bloquearLateralInferiorDireita = true;}
      if (bloquearLateralInferiorDireita != true) {
          casasControleBrancas.push(lateralInferiorDireita);
      }
      
      if (lateralHorizontalEsquerdaCima[0] == "impedimento") {bloquearLateralHorizontalEsquerdaCima = true;}
      if (bloquearLateralHorizontalEsquerdaCima != true) {
          casasControleBrancas.push(lateralHorizontalEsquerdaCima);
      }
      
      if (lateralHorizontalEsquerdaBaixo[0] == "impedimento") {bloquearLateralHorizontalEsquerdaBaixo = true;}
      if (bloquearLateralHorizontalEsquerdaBaixo != true) {
          casasControleBrancas.push(lateralHorizontalEsquerdaBaixo);
      }
      
      if (lateralHorizontalDireitaCima[0] == "impedimento") {bloquearLateralHorizontalDireitaCima = true;}
      if (bloquearLateralHorizontalDireitaCima != true) {
          casasControleBrancas.push(lateralHorizontalDireitaCima);
      }
      
      if (lateralHorizontalDireitaBaixo[0] == "impedimento") {bloquearLateralHorizontalDireitaBaixo = true;}
      if (bloquearLateralHorizontalDireitaBaixo != true) {
          casasControleBrancas.push(lateralHorizontalDireitaBaixo);
      }
      

      }
      if(timePeca == 'pecapreta'){
        if (lateralSuperiorEsquerda[0] == "impedimento") {bloquearLateralSuperiorEsquerda = true;}
        if (bloquearLateralSuperiorEsquerda != true) {
          casasContreolePretas.push(lateralSuperiorEsquerda);
       }
      
      if (lateralSuperiorDireita[0] == "impedimento") {bloquearLateralSuperiorDireita = true;}
      if (bloquearLateralSuperiorDireita != true) {
        casasContreolePretas.push(lateralSuperiorDireita);
      }
      
      if (lateralInferiorEsquerda[0] == "impedimento") {bloquearLateralInferiorEsquerda = true;}
      if (bloquearLateralInferiorEsquerda != true) {
        casasContreolePretas.push(lateralInferiorEsquerda);
      }
      
      if (lateralInferiorDireita[0] == "impedimento") {bloquearLateralInferiorDireita = true;}
      if (bloquearLateralInferiorDireita != true) {
        casasContreolePretas.push(lateralInferiorDireita);
      }
      
      if (lateralHorizontalEsquerdaCima[0] == "impedimento") {bloquearLateralHorizontalEsquerdaCima = true;}
      if (bloquearLateralHorizontalEsquerdaCima != true) {
        casasContreolePretas.push(lateralHorizontalEsquerdaCima);
      }
      
      if (lateralHorizontalEsquerdaBaixo[0] == "impedimento") {bloquearLateralHorizontalEsquerdaBaixo = true;}
      if (bloquearLateralHorizontalEsquerdaBaixo != true) {
        casasContreolePretas.push(lateralHorizontalEsquerdaBaixo);
      }
      
      if (lateralHorizontalDireitaCima[0] == "impedimento") {bloquearLateralHorizontalDireitaCima = true;}
      if (bloquearLateralHorizontalDireitaCima != true) {
          casasContreolePretas.push(lateralHorizontalDireitaCima);
      }
      
      if (lateralHorizontalDireitaBaixo[0] == "impedimento") {bloquearLateralHorizontalDireitaBaixo = true;}
      if (bloquearLateralHorizontalDireitaBaixo != true) {
        casasContreolePretas.push(lateralHorizontalDireitaBaixo);
      }
      
      }
      break;
    case 'bispo':
      // Flags que controlam o push de casas livres ou impedidas; ao encontrar um impedimento, param a adição sem precisar de vários ifs ou loops. false = nao bloqueia, mudei para let antes era var se der erro provavelmente é por isso
      let bloqueiaDiagonalSuperiorEsquerda = false
      let bloqueiaDiagonalSuperiorDireita = false
      let bloqueiaDiagonalInferiorEsquerda = false
      let bloqueiaDiagonalInferiorDireita = false
      for(let repetidor = 1; repetidor < 9; repetidor++){
        let diagonalSuperiorEsquerda =  [x1 - repetidor, parseInt(y1) + repetidor];
        let diagonalSuperiorDireita  =  [x1 + repetidor, parseInt(y1) + repetidor];
        let diagonalInferiorEsquerda =  [x1 - repetidor, parseInt(y1) - repetidor];
        let diagonalInferiorDireita  =  [x1 + repetidor, parseInt(y1) - repetidor];
        //filtros
        diagonalSuperiorEsquerda = [diagonalSuperiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        diagonalSuperiorDireita = [diagonalSuperiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        diagonalInferiorEsquerda = [diagonalInferiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
        diagonalInferiorDireita = [diagonalInferiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;

        diagonalSuperiorEsquerda = VerificarImpedimento(diagonalSuperiorEsquerda)
        diagonalSuperiorDireita = VerificarImpedimento(diagonalSuperiorDireita)
        diagonalInferiorEsquerda = VerificarImpedimento(diagonalInferiorEsquerda)
        diagonalInferiorDireita = VerificarImpedimento(diagonalInferiorDireita)

        let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0])
        const timePeca = buscarPeca.querySelector('img')?.name || "semPeca"    
      
        if(timePeca == 'pecabranca'){

          if(diagonalSuperiorEsquerda[0] == "impedimento"){bloqueiaDiagonalSuperiorEsquerda = true}
           if(bloqueiaDiagonalSuperiorEsquerda != true){
            casasControleBrancas.push(diagonalSuperiorEsquerda)
          }

          if(diagonalSuperiorDireita[0] == "impedimento"){bloqueiaDiagonalSuperiorDireita = true}
           if(bloqueiaDiagonalSuperiorDireita != true){
            casasControleBrancas.push(diagonalSuperiorDireita)
          }

          if(diagonalInferiorEsquerda[0] == "impedimento"){bloqueiaDiagonalInferiorEsquerda = true}
          if(bloqueiaDiagonalInferiorEsquerda != true){
            casasControleBrancas.push(diagonalInferiorEsquerda)
          }

          if(diagonalInferiorDireita[0] == "impedimento"){bloqueiaDiagonalInferiorDireita = true}
          if(bloqueiaDiagonalInferiorDireita != true){
            casasControleBrancas.push(diagonalInferiorDireita)
          }
         
        }
        if(timePeca == 'pecapreta'){

          if(diagonalSuperiorEsquerda[0] == "impedimento"){bloqueiaDiagonalSuperiorEsquerda = true}
          if(bloqueiaDiagonalSuperiorEsquerda != true){
           casasContreolePretas.push(diagonalSuperiorEsquerda)
         }

         if(diagonalSuperiorDireita[0] == "impedimento"){bloqueiaDiagonalSuperiorDireita = true}
          if(bloqueiaDiagonalSuperiorDireita != true){
            casasContreolePretas.push(diagonalSuperiorDireita)
         }

         if(diagonalInferiorEsquerda[0] == "impedimento"){bloqueiaDiagonalInferiorEsquerda = true}
         if(bloqueiaDiagonalInferiorEsquerda != true){
          casasContreolePretas.push(diagonalInferiorEsquerda)
         }

         if(diagonalInferiorDireita[0] == "impedimento"){bloqueiaDiagonalInferiorDireita = true}
         if(bloqueiaDiagonalInferiorDireita != true){
          casasContreolePretas.push(diagonalInferiorDireita)
         }

        }
      }

      break;
    case 'rainha':
      let bloqueiaDiagonalSuperiorEsquerdaRainha = false
      let bloqueiaDiagonalSuperiorDireitaRainha = false
      let bloqueiaDiagonalInferiorEsquerdaRainha = false
      let bloqueiaDiagonalInferiorDireitaRainha = false
      let bloqueiaEsquerdaRainha = false
      let bloqueiaDireitaRainha = false
      let bloqueiaCimaRainha = false
      let bloqueiaBaixoRainha = false      
      for(let repetidor = 1; repetidor < 9; repetidor++){

        let diagonalSuperiorEsquerdaRainha = [x1 - repetidor, parseInt(y1) + repetidor];
        let diagonalSuperiorDireitaRainha = [x1 + repetidor, parseInt(y1) + repetidor];
        let diagonalInferiorEsquerdaRainha = [x1 - repetidor, parseInt(y1) - repetidor];
        let diagonalInferiorDireitaRainha = [x1 + repetidor, parseInt(y1) - repetidor];

        let horizontalEsquerdaRainha = [x1 - repetidor, parseInt(y1)];
        let horizontalDireitaRainha = [x1 + repetidor, parseInt(y1)];
        let verticalCimaRainha = [x1, parseInt(y1) + repetidor];
        let verticalBaixoRainha = [x1, parseInt(y1) - repetidor];
        // Filtros
        diagonalSuperiorEsquerdaRainha = [diagonalSuperiorEsquerdaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        diagonalSuperiorDireitaRainha = [diagonalSuperiorDireitaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        diagonalInferiorEsquerdaRainha = [diagonalInferiorEsquerdaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        diagonalInferiorDireitaRainha = [diagonalInferiorDireitaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        horizontalEsquerdaRainha = [horizontalEsquerdaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        horizontalDireitaRainha = [horizontalDireitaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        verticalCimaRainha = [verticalCimaRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        verticalBaixoRainha = [verticalBaixoRainha].filter(([x, y])=>x > 0 && x <= 8 && y > 0 && y <= 8)[0]||null;
        
        diagonalSuperiorEsquerdaRainha = VerificarImpedimento(diagonalSuperiorEsquerdaRainha)
        diagonalSuperiorDireitaRainha = VerificarImpedimento(diagonalSuperiorDireitaRainha)
        diagonalInferiorEsquerdaRainha = VerificarImpedimento(diagonalInferiorEsquerdaRainha)
        diagonalInferiorDireitaRainha = VerificarImpedimento(diagonalInferiorDireitaRainha)
        horizontalEsquerdaRainha = VerificarImpedimento(horizontalEsquerdaRainha)
        horizontalDireitaRainha = VerificarImpedimento(horizontalDireitaRainha)
        verticalCimaRainha = VerificarImpedimento(verticalCimaRainha)
        verticalBaixoRainha = VerificarImpedimento(verticalBaixoRainha)


        let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0])
        const timePeca = buscarPeca.querySelector('img')?.name || "semPeca"

        //AQUI SEU CEGO
        //console.log(diagonalInferiorEsquerdaRainha)

        if(timePeca == 'pecabranca'){
          
          if(diagonalSuperiorEsquerdaRainha[0] == "impedimento"){bloqueiaDiagonalSuperiorEsquerdaRainha = true}
          if(bloqueiaDiagonalSuperiorEsquerdaRainha != true){
           casasControleBrancas.push(diagonalSuperiorEsquerdaRainha)
         }

         if(diagonalSuperiorDireitaRainha[0] == "impedimento"){bloqueiaDiagonalSuperiorDireitaRainha = true}
          if(bloqueiaDiagonalSuperiorDireitaRainha != true){
           casasControleBrancas.push(diagonalSuperiorDireitaRainha)
         }

         if(diagonalInferiorEsquerdaRainha[0] == "impedimento") {bloqueiaDiagonalInferiorEsquerdaRainha = true}
        if(bloqueiaDiagonalInferiorEsquerdaRainha != true) {
          casasControleBrancas.push(diagonalInferiorEsquerdaRainha);
        }

         if(diagonalInferiorDireitaRainha[0] == "impedimento"){bloqueiaDiagonalInferiorDireitaRainha = true}
         if(bloqueiaDiagonalInferiorDireitaRainha != true){
           casasControleBrancas.push(diagonalInferiorDireitaRainha)
         }
        
         //VERTICAL E HORIZONTAL:

         if(horizontalEsquerdaRainha[0] == "impedimento"){bloqueiaEsquerdaRainha = true}
           if(bloqueiaEsquerdaRainha != true){
            casasControleBrancas.push(horizontalEsquerdaRainha)
          }

          if(horizontalDireitaRainha[0] == "impedimento"){bloqueiaDireitaRainha = true}
           if(bloqueiaDireitaRainha != true){
            casasControleBrancas.push(horizontalDireitaRainha)
          }

          if(verticalCimaRainha[0] == "impedimento"){bloqueiaCimaRainha = true}
          if(bloqueiaCimaRainha != true){
            casasControleBrancas.push(verticalCimaRainha)
          }

          if(verticalBaixoRainha[0] == "impedimento"){bloqueiaBaixoRainha = true}
          if(bloqueiaBaixoRainha != true){
            casasControleBrancas.push(verticalBaixoRainha)
          }

        }
        if(timePeca == 'pecapreta'){

          if(diagonalSuperiorEsquerdaRainha[0] == "impedimento"){bloqueiaDiagonalSuperiorEsquerdaRainha = true}
          if(bloqueiaDiagonalSuperiorEsquerdaRainha != true){
           casasContreolePretas.push(diagonalSuperiorEsquerdaRainha)
         }

         if(diagonalSuperiorDireitaRainha[0] == "impedimento"){bloqueiaDiagonalSuperiorDireitaRainha = true}
          if(bloqueiaDiagonalSuperiorDireitaRainha != true){
            casasContreolePretas.push(diagonalSuperiorDireitaRainha)
         }

         if(diagonalInferiorEsquerdaRainha[0] == "impedimento") {bloqueiaDiagonalInferiorEsquerdaRainha = true}
        if(bloqueiaDiagonalInferiorEsquerdaRainha != true) {
          casasContreolePretas.push(diagonalInferiorEsquerdaRainha);
        }

         if(diagonalInferiorDireitaRainha[0] == "impedimento"){bloqueiaDiagonalInferiorDireitaRainha = true}
         if(bloqueiaDiagonalInferiorDireitaRainha != true){
          casasContreolePretas.push(diagonalInferiorDireitaRainha)
         }
        
         //VERTICAL E HORIZONTAL:

         if(horizontalEsquerdaRainha[0] == "impedimento"){bloqueiaEsquerdaRainha = true}
           if(bloqueiaEsquerdaRainha != true){
            casasContreolePretas.push(horizontalEsquerdaRainha)
          }

          if(horizontalDireitaRainha[0] == "impedimento"){bloqueiaDireitaRainha = true}
           if(bloqueiaDireitaRainha != true){
            casasContreolePretas.push(horizontalDireitaRainha)
          }

          if(verticalCimaRainha[0] == "impedimento"){bloqueiaCimaRainha = true}
          if(bloqueiaCimaRainha != true){
            casasContreolePretas.push(verticalCimaRainha)
          }

          if(verticalBaixoRainha[0] == "impedimento"){bloqueiaBaixoRainha = true}
          if(bloqueiaBaixoRainha != true){
            casasContreolePretas.push(verticalBaixoRainha)
          }


        }
      }
      break;
    case 'rei':
      let bloquearHorizontalEsquerda = false;
      let bloquearHorizontalDireita = false;
      let bloquearVerticalCima = false;
      let bloquearVerticalBaixo = false;
      let bloquearDiagonalSuperiorEsquerda = false;
      let bloquearDiagonalSuperiorDireita = false;
      let bloquearDiagonalInferiorEsquerda = false;
      let bloquearDiagonalInferiorDireita = false;

    for(let contador = 1; contador < 9; contador++){
      let horizontalEsquerda = [x1 - 1, parseInt(y1)];
      let horizontalDireita = [x1 + 1, parseInt(y1)];
      let verticalCima = [x1, parseInt(y1) + 1];
      let verticalBaixo = [x1, parseInt(y1) - 1];
      let diagonalSuperiorEsquerda = [x1 - 1, parseInt(y1) + 1];
      let diagonalSuperiorDireita = [x1 + 1, parseInt(y1) + 1];
      let diagonalInferiorEsquerda = [x1 - 1, parseInt(y1) - 1];
      let diagonalInferiorDireita = [x1 + 1, parseInt(y1) - 1];
      //filtros
      horizontalEsquerda = [horizontalEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      horizontalDireita = [horizontalDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      verticalCima = [verticalCima].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      verticalBaixo = [verticalBaixo].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      diagonalSuperiorEsquerda = [diagonalSuperiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      diagonalSuperiorDireita = [diagonalSuperiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      diagonalInferiorEsquerda = [diagonalInferiorEsquerda].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
      diagonalInferiorDireita = [diagonalInferiorDireita].filter(([x, y]) => x > 0 && x <= 8 && y > 0 && y <= 8)[0] || null;
     
      horizontalEsquerda = VerificarImpedimento(horizontalEsquerda);
      horizontalDireita = VerificarImpedimento(horizontalDireita);
      verticalCima = VerificarImpedimento(verticalCima);
      verticalBaixo = VerificarImpedimento(verticalBaixo);
      diagonalSuperiorEsquerda = VerificarImpedimento(diagonalSuperiorEsquerda);
      diagonalSuperiorDireita = VerificarImpedimento(diagonalSuperiorDireita);
      diagonalInferiorEsquerda = VerificarImpedimento(diagonalInferiorEsquerda);
      diagonalInferiorDireita = VerificarImpedimento(diagonalInferiorDireita);

      let buscarPeca = document.getElementById(pecasTabuleiro[pecaVez][0])
      const timePeca = buscarPeca.querySelector('img')?.name || "semPeca"

      if(timePeca == 'pecabranca'){

        if (horizontalEsquerda[0] == "impedimento") {bloquearHorizontalEsquerda = true}
        if (bloquearHorizontalEsquerda != true) {
        casasControleBrancas.push(horizontalEsquerda)
        }

        if (horizontalDireita[0] == "impedimento") {bloquearHorizontalDireita = true}
        if (bloquearHorizontalDireita != true) {
          casasControleBrancas.push(horizontalDireita)
        }

        if (verticalCima[0] == "impedimento") {bloquearVerticalCima = true}
        if (bloquearVerticalCima != true) {
          casasControleBrancas.push(verticalCima)
        }

        if (verticalBaixo[0] == "impedimento") {bloquearVerticalBaixo = true}
        if (bloquearVerticalBaixo != true) {
          casasControleBrancas.push(verticalBaixo)
        }

        if (diagonalSuperiorEsquerda[0] == "impedimento") {bloquearDiagonalSuperiorEsquerda = true}
        if (bloquearDiagonalSuperiorEsquerda != true) {
          casasControleBrancas.push(diagonalSuperiorEsquerda)
        }

        if (diagonalSuperiorDireita[0] == "impedimento") {bloquearDiagonalSuperiorDireita = true}
        if (bloquearDiagonalSuperiorDireita != true) {
          casasControleBrancas.push(diagonalSuperiorDireita)
        }

        if (diagonalInferiorEsquerda[0] == "impedimento") {bloquearDiagonalInferiorEsquerda = true}
        if (bloquearDiagonalInferiorEsquerda != true) {
          casasControleBrancas.push(diagonalInferiorEsquerda)
        }

        if (diagonalInferiorDireita[0] == "impedimento") {bloquearDiagonalInferiorDireita = true}
        if (bloquearDiagonalInferiorDireita != true) {
          casasControleBrancas.push(diagonalInferiorDireita)
        }


      }
      if(timePeca == 'pecapreta'){
        if (horizontalEsquerda[0] == "impedimento") {bloquearHorizontalEsquerda = true}
        if (bloquearHorizontalEsquerda != true) {
          casasContreolePretas.push(horizontalEsquerda)
        }
        
        if (horizontalDireita[0] == "impedimento") {bloquearHorizontalDireita = true}
        if (bloquearHorizontalDireita != true) {
          casasContreolePretas.push(horizontalDireita)
        }
        
        if (verticalCima[0] == "impedimento") {bloquearVerticalCima = true}
        if (bloquearVerticalCima != true) {
          casasContreolePretas.push(verticalCima)
        }
        
        if (verticalBaixo[0] == "impedimento") {bloquearVerticalBaixo = true}
        if (bloquearVerticalBaixo != true) {
          casasContreolePretas.push(verticalBaixo)
        }
        
        if (diagonalSuperiorEsquerda[0] == "impedimento") {bloquearDiagonalSuperiorEsquerda = true}
        if (bloquearDiagonalSuperiorEsquerda != true) {
          casasContreolePretas.push(diagonalSuperiorEsquerda)
        }
        
        if (diagonalSuperiorDireita[0] == "impedimento") {bloquearDiagonalSuperiorDireita = true}
        if (bloquearDiagonalSuperiorDireita != true) {
          casasContreolePretas.push(diagonalSuperiorDireita)
        }
        
        if (diagonalInferiorEsquerda[0] == "impedimento") {bloquearDiagonalInferiorEsquerda = true}
        if (bloquearDiagonalInferiorEsquerda != true) {
          casasContreolePretas.push(diagonalInferiorEsquerda)
        }
        
        if (diagonalInferiorDireita[0] == "impedimento") {bloquearDiagonalInferiorDireita = true}
        if (bloquearDiagonalInferiorDireita != true) {
          casasContreolePretas.push(diagonalInferiorDireita)
        }
        
      }
    }
     break;
  }
 }


 //PINTAR CASAS QUE ESTAO SOBRE DOMINIO (brancas ou pretas) TEMPORARIO
 for (let cor = 0; cor < casasControleBrancas.length; cor++) {
  let [letraIndex, numero] = casasControleBrancas[cor] || []; // Desestruturação segura
  let casa = document.getElementById(numeroParaLetra[letraIndex] + numero);
  if (casa) casa.style.backgroundColor = "red";
}

//"EXPORTANDO" DADOS PARA XEQUEMATE.JS
window.casasControleBrancas = casasControleBrancas
}