import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidadas from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(validar,resultado, identificador = '') {

  

  if(validar){
    if(identificador != ''){
      console.log(
        chalk.yellow(`lista de links do arquivo: '${identificador}'`),
        chalk.black.bgGreen(),
        await listaValidadas(resultado));
    }
    else{
      console.log(
        chalk.yellow(`lista de links:`),
        chalk.black.bgGreen(),
        await listaValidadas(resultado));
      }
  }
  else{
    if(identificador != ''){
      console.log(
        chalk.yellow(`lista de links não validada do arquivo: '${identificador}'`),
        chalk.black.bgGreen(),
        await listaValidadas(resultado));
    }
    else{
      console.log(
        chalk.yellow(`lista de links não validada:`),
        chalk.black.bgGreen(),
        await listaValidadas(resultado));
      }
  }

  
}


async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] == "--valida";

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('arquivo ou diretório não existe');
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {

    const resultado = await pegaArquivo(argumentos[2]);
    imprimeLista(valida ,resultado);

  } 
  
  else if (fs.lstatSync(caminho).isDirectory()) {

    const arquivos = await fs.promises.readdir(caminho)

    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
      imprimeLista(valida,lista, nomeDeArquivo)
    })

  }

}

processaTexto(caminho);

