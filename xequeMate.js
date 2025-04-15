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
      // Flags que controlam o push de casas livres ou impedidas; ao encontrar um impedimento, param a adição sem precisar de vários ifs ou loops. false = nao bloqueia
      var bloqueiaEsquerda = false
      var bloqueiaDireita = false
      var bloqueiaCima = false
      var bloqueiaBaixo = false

      //tenho que lembrar que isso roda 4 vezes printado as 4 vezes separadamente mas no console ficam juntas oque pode gerar confusao
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

        }
      }
      break;
    case 'cavalo':
      break;
    case 'bispo':
      break;
    case 'rainha':
      break;
    case 'rei':
      break;
  }
 }

 //PINTAR CASAS QUE ESTAO SOBRE DOMINIO (brancas ou pretas) TEMPORARIO
 for (let cor = 0; cor < casasControleBrancas.length; cor++) {
  let [letraIndex, numero] = casasControleBrancas[cor] || []; // Desestruturação segura
  let casa = document.getElementById(numeroParaLetra[letraIndex] + numero);
  if (casa) casa.style.backgroundColor = "red";
}

}