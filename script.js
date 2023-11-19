const cadastroCarros = [
    {
        id: 0,
        modelo: "Fusca",
        marca: "VW",
        ano: 1970,
        cor: "azul",
        preco: 10
    },
    {
        id: 78,
        modelo: "Polo",
        marca: "VW",
        ano: 2011,
        cor: "vermelho",
        preco: 36
    },
    {
        id: 97,
        modelo: "URUS",
        marca: "Lamborghini",
        ano: 2020,
        cor: "Amarela",
        preco: 500
    },
    {
        id: 50,
        modelo: "Cayene",
        marca: "Porsche",
        ano: 2022,
        cor: "Preta",
        preco: 700
    },
    {
        id: 60,
        modelo: "Carrera",
        marca: "Porsche",
        ano: 2020,
        cor: "Branca",
        preco: 550
    },
    {
        id: 67,
        modelo: "Cayman",
        marca: "Porsche",
        ano: 2023,
        cor: "Azul",
        preco: 350
    }
]

let menuInicial = true
while (menuInicial) {
    const opcoes = Number(prompt(`
    Bem-vindo ao sistema de CRUD de veículos:
    No momento, o sistema tem ${cadastroCarros.length} carros cadastrados
    Escolha uma das opções para interagir com o sistema:
    1 - Cadastrar veículo
    2 - Listar todos os veículos
    3 - Filtrar veículos por marca
    4 - Atualizar veículo
    5 - Remover veículo
    6 - Sair do sistema`))

    switch (opcoes) {
        case 1:
            solicitarCadastro()
            break;
        case 2:
            listarCarros()
            break;
        case 3:
            filtrarPorMarca()
            break;        
        case 4:
            editarCarro()
            break;            
        case 5:
            deletarCarro()
            break;
        case 6:
            menuInicial = false
            break
        default:
            alert("Opção inválida")
            break;
    }
}

function solicitarCadastro() {
    const modelo = prompt("Digite o MODELO do veículo")
    const marca = prompt("Digite a MARCA do veículo")
    const ano = Number(prompt("Digite o ANO do veículo"))
    const cor = prompt("Digite a COR do veículo")
    const preco = Number(prompt("Digite o PREÇO do veículo (em milhares de reais)"))
    cadastrarCarro(modelo, marca, ano, cor, preco)
    perguntarContinuar()
}

function cadastrarCarro(modelo, marca, ano, cor, preco) {
    const novoCarro = {
        id: Math.floor(Math.random() * 1000) + 1,
        modelo: modelo,
        marca: marca,
        ano: ano,
        cor: cor,
        preco: preco
    }
    cadastroCarros.push(novoCarro)    
}

function perguntarContinuar(params) {
    const continuar = Number(prompt("Digite:\n1 - Continuar cadastrando\n2 - Parar de cadastrar"))
    if (continuar === 1) {
        solicitarCadastro()
    } else {
        alert("Cadastro finalizado")    
    }
}

function listarCarros() {
    let listaDeCarros = ''
    cadastroCarros.sort(function(a, b){return a.preco - b.preco})
    cadastroCarros.forEach((carro) => {
        listaDeCarros += `ID: ${carro.id} | Modelo: ${carro.modelo} | Marca: ${carro.marca} | ${carro.ano} | Cor: ${carro.cor} | Preço: R$${carro.preco}k\n`
    })
    alert(listaDeCarros)
}

function filtrarPorMarca() {
    const marca = prompt("Digite a marca:")
    cadastroCarros.sort(function(a, b){return a.preco - b.preco})
    const filtradoPorMarca = cadastroCarros.filter(carro => carro.marca === marca)
    let listaFiltradosMarca = ''
    filtradoPorMarca.forEach((carro) => {
        listaFiltradosMarca += `ID: ${carro.id} | Modelo: ${carro.modelo} | Cor: ${carro.cor} | Preço: R$${carro.preco}k\n`
    })
    alert('Filtrados por: ' + marca + '\n' + listaFiltradosMarca)
}

function editarCarro() {
    const id = Number(prompt("Digite o ID do veículo que Atualiza/Editar"))
    function verificaID (id, array) {
        return array.some(carro => carro.id === id)
    }

    let idExiste = verificaID(id, cadastroCarros)
    
    if (idExiste) {
    const indice = cadastroCarros.findIndex(carro => carro.id === id)
    alert(cadastroCarros[indice].marca + ' ' + cadastroCarros[indice].modelo + ' encontrado!')

    const novaCor = prompt("Digite a nova COR do veículo")
    const novoPreco = Number(prompt("Digite o novo PREÇO do veículo"))

    cadastroCarros[indice] = {
        id: cadastroCarros[indice].id,
        modelo: cadastroCarros[indice].modelo,
        marca: cadastroCarros[indice].marca,
        ano: cadastroCarros[indice].ano,
        cor: novaCor,
        preco: novoPreco
    }
    } else {
        alert(`ID: ${id} NÃO encontrado na base de dados`)
    }
}

function deletarCarro() {   
    const id = Number(prompt("Digite o ID do veículo que deseja deletar"))
    function verificaID (id, array) {
        return array.some(carro => carro.id === id)
    }

    let idExiste = verificaID(id, cadastroCarros)    
    if (idExiste) {
        alert(`ID: ${id} encontrado!`)
        const filtradoPorID = cadastroCarros.findIndex(carro => carro.id === id)
        alert(cadastroCarros[filtradoPorID].marca + ' ' + cadastroCarros[filtradoPorID].modelo + ' deletado!')
        cadastroCarros.splice(filtradoPorID, 1)
    } else {
        alert(`ID: ${id} NÃO encontrado na base de dados`)
    }
}

document.write(JSON.stringify(cadastroCarros))
