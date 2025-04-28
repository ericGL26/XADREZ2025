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
  CalcularDominioPecas(pecasTabuleiro)
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
//CALCULAR DOMINIO DE CADA PEÇA

function CalcularImpedimentoNoDominioTorre(){

}

function calcularDominiosLinearesEDiagonaisTorre(x1, y1) {
  const dominios = [];
  for (let repetidor = 1; repetidor < 9; repetidor++) {
    let movimentos = [
      [x1 - repetidor, parseInt(y1)],
      [x1 + repetidor, parseInt(y1)],
      [x1, parseInt(y1) + repetidor],
      [x1, parseInt(y1) - repetidor]
    ];
    //filtrar casas que ultrapassam limites do tabuleiro
    movimentos.forEach(([x, y]) => {
      if (x > 0 && x <= 8 && y > 0 && y <= 8) {
        console.log(x, y)
        dominios.push([x, y]);
      }
    });
  }

  return dominios;
}

function CalcularDominioPecas(pecasTabuleiro){
  //SOMENTE PARA PINTAR AS CASAS SOBRE DOMINIO(TEMPORARIO)
  for (let cor = 1; cor < 9; cor++) {
    for (let cordois = 1; cordois < 9; cordois++) { // Agora cordois está sendo corretamente incrementado
        let casa = document.getElementById(numeroParaLetra[cor] + cordois);
        //console.log('casas', casa)
        casa.style.backgroundColor = "gray";
    }
}


  const todasPecasTabuleiro = pecasTabuleiro
  var casasControleBrancas = []
  var casasControlePretas = []

  for(let contador = 0; contador < todasPecasTabuleiro.length; contador++){
    var pecaVez = todasPecasTabuleiro[contador][1]
    var [x1, y1] = [transformarLetraEmNumero[todasPecasTabuleiro[contador][0][0]], todasPecasTabuleiro[contador][0][1]];

    switch (pecaVez) {
      case 'peao':
        // Lógica para o peão
        break;
    
      case 'torre':
        // Lógica para a torre
        var dominios = calcularDominiosLinearesEDiagonaisTorre(x1, y1)
        var buscarPeca = document.getElementById(todasPecasTabuleiro[contador][0])
        var timePeca = buscarPeca.querySelector('img')?.name || "semPeca"
        if(timePeca == 'pecabranca'){
          casasControleBrancas.push(...dominios)
        }
        if(timePeca == 'pecapreta'){
          casasControlePretas.push(...dominios)
        }
        break;
    
      case 'cavalo':
        // Lógica para o cavalo
        break;
    
      case 'bispo':
        // Lógica para o bispo
        break;
    
      case 'rainha':
        // Lógica para a rainha
        break;
    
      case 'rei':
        // Lógica para o rei
        break;
    }
  }











//SOMENTE PARA PINTAR AS CASAS SOBRE DOMINIO DE VERMELHO (TEMPORARIO)

  for (let cor = 0; cor < casasControleBrancas.length; cor++) {
    let [letraIndex, numero] = casasControleBrancas[cor] || []; // Desestruturação segura
    let casa = document.getElementById(numeroParaLetra[letraIndex] + numero);

    if (casa) casa.style.backgroundColor = "red";
}
}