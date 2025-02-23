var alfabeto = {1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h"};
var eixo_x = {a: 1, b: 2, c:3, d:4, e:5, f:6, g:7, h:8}
var eixo_y = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function ValidarJogadapeao(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero, peaoSelecionado) {
  const proximaPosicaoEmNumeroPeao = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroPeao = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  const peao = document.getElementById(peaoSelecionado)
  var peaoPrimeiraJogada = peao.getAttribute('primeiraJogada')
  var corPeao = peao.name

  var direcao = corPeao == 'pecabranca' ? 1 : -1;
  var moverUmaCasa = posicaoAtualEmNumeroPeao[1] + direcao;
  var moverDuasCasas = posicaoAtualEmNumeroPeao[1] + (2 * direcao);
  var mesmaColuna = posicaoAtualEmNumeroPeao[0] == proximaPosicaoEmNumeroPeao[0];

  if (peaoPrimeiraJogada == 'true') {
    peao.setAttribute('primeiraJogada', false);
    return (mesmaColuna && (moverUmaCasa == proximaPosicaoEmNumeroPeao[1] || moverDuasCasas == proximaPosicaoEmNumeroPeao[1])) 
    ? 'JogadaPossivel' 
    : 'JogadaImpossivel';
  }
  if(peaoPrimeiraJogada == 'false') {
    console.log('esta cainda aqui dentro')
    return (mesmaColuna && moverUmaCasa == proximaPosicaoEmNumeroPeao[1]) 
    ? 'JogadaPossivel' 
    : 'JogadaImpossivel';
  }

}

function ValidarJogadatorre(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const proximaPosicaoEmNumeroTorre = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroTorre = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  
  const colunaIgual = Math.abs(posicaoAtualEmNumeroTorre[0]) == Math.abs(proximaPosicaoEmNumeroTorre[0])
  const linhaIgual = Math.abs(posicaoAtualEmNumeroTorre[1]) == Math.abs(proximaPosicaoEmNumeroTorre[1])
  return ((colunaIgual == true || linhaIgual == true) && VerificarObstaculosTorre(proximaPosicaoEmNumeroTorre, posicaoAtualEmNumeroTorre) == false) ? 'JogadaPossivel' : 'JogadaImpossivel'
}

function ValidarJogadacavalo(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  var letra_localizacaoclick = localizacaoclick.id.slice(0, 1)
  var converterParaNumero = eixo_x[letra_localizacaoclick]
  var PosicaoSelecionadaEmNumero = [converterParaNumero, parseInt(localizacaoclick.id.slice(-1)) ]

    var subir_casa = numerocasa + 2
    var descer_casa = numerocasa - 2
    var subir_lado = numerocasa + 1
    var descer_lado = numerocasa - 1
    var horizontal_esquerda = eixo_x_casaatual_numero - 2
    var horizontal_direita = eixo_x_casaatual_numero + 2
    
    var movimentar_lado_direita = eixo_x_casaatual_numero + 1
    var movimentar_lado_esquerdo = eixo_x_casaatual_numero - 1
    
    var JogadasPossiveis = [
        [horizontal_direita, subir_lado],
        [horizontal_direita, descer_lado],
        [horizontal_esquerda, subir_lado],
        [horizontal_esquerda, descer_lado],
        [movimentar_lado_direita, subir_casa],
        [movimentar_lado_direita, descer_casa],
        [movimentar_lado_esquerdo, subir_casa],
        [movimentar_lado_esquerdo, descer_casa]
  ];
  for (var q = 0; q < 8; q++){
    if(JSON.stringify(JogadasPossiveis[q]) == JSON.stringify(PosicaoSelecionadaEmNumero)){
      return 'JogadaPossivel'
    }
  }
  return "JogadaImpossivel";
}

function ValidarJogadabispo(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const posicaoAtualEmNumero = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  const proximaPosicaoEmNumero = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]


  const v1 = Math.abs(posicaoAtualEmNumero[0] - proximaPosicaoEmNumero[0])
  const v2 = Math.abs(posicaoAtualEmNumero[1] - proximaPosicaoEmNumero[1])
  const result = v1 == v2 ? true : false
 if(result == false){
  return 'JogadaImpossivel'
 }else{
  return "JogadaPossivel";
 }
}

function ValidarJogadarainha(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const proximaPosicaoEmNumeroRainha = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroRainha = [eixo_x[casaAtual.slice(0, 1)], numerocasa]

  const colunaIgual = Math.abs(posicaoAtualEmNumeroRainha[0]) == Math.abs(proximaPosicaoEmNumeroRainha[0])
  const linhaIgual = Math.abs(posicaoAtualEmNumeroRainha[1]) == Math.abs(proximaPosicaoEmNumeroRainha[1])

  const v1 = Math.abs(posicaoAtualEmNumeroRainha[0] - proximaPosicaoEmNumeroRainha[0])
  const v2 = Math.abs(posicaoAtualEmNumeroRainha[1] - proximaPosicaoEmNumeroRainha[1])

  return (colunaIgual == true || linhaIgual == true || v1 == v2) ? 'JogadaPossivel' : 'JogadaImpossivel'

}

function ValidarJogadarei(localizacaoclick, casaAtual, numerocasa, eixo_x_casaatual_numero) {
  const proximaPosicaoEmNumeroRei = [eixo_x[localizacaoclick.id.slice(0, 1)], parseInt(localizacaoclick.id.slice(1))]
  const posicaoAtualEmNumeroRei = [eixo_x[casaAtual.slice(0, 1)], numerocasa]
  //grade 3 por 3 começando pelo canto superior esquerdo
  var PossibilidadesJogada = [
    [Math.abs(posicaoAtualEmNumeroRei[0]) - 1, Math.abs(posicaoAtualEmNumeroRei[1]) + 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]), Math.abs(posicaoAtualEmNumeroRei[1]) + 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]) + 1, Math.abs(posicaoAtualEmNumeroRei[1]) + 1],

    [Math.abs(posicaoAtualEmNumeroRei[0]) - 1, Math.abs(posicaoAtualEmNumeroRei[1])],
    [Math.abs(posicaoAtualEmNumeroRei[0]) + 1, Math.abs(posicaoAtualEmNumeroRei[1])],

    [Math.abs(posicaoAtualEmNumeroRei[0]) - 1, Math.abs(posicaoAtualEmNumeroRei[1]) - 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]), Math.abs(posicaoAtualEmNumeroRei[1]) - 1],
    [Math.abs(posicaoAtualEmNumeroRei[0]) + 1, Math.abs(posicaoAtualEmNumeroRei[1]) - 1],
  ]

  for (var v = 0; v < 8; v++){
    if(JSON.stringify(PossibilidadesJogada[v]) == JSON.stringify(proximaPosicaoEmNumeroRei)){
      return 'JogadaPossivel'
    }
  }
  return 'JogadaImpossivel'
}