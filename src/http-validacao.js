import chalk from "chalk";

function extraiLinks(arrayLink){
   return arrayLink.map((objetoLink) => Object.values(objetoLink).join());
}

export default async function listaValidada(listadelinks){
    const link = extraiLinks(listadelinks);
    const statuslink = await checagemdelink(link);
    
    return link.map((objeto,indice) =>  ({
        link:objeto,
        status:statuslink[indice]
    }))  
}

async function checagemdelink (listaurl) {
    const arrStatus = await Promise
    .all(
        listaurl.map( async (url) => {
            try{
                const res = await fetch(url);
                return res.status
            }catch(erro){
               return erroslink(erro)
            }
        })
    )
    return arrStatus;
}

function erroslink(erro){
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link invalido';
    }else{
        return 'Erro desconhecido';
    }
}


// [gatinho salsicha](http://gatinhosalsicha.com.br/)