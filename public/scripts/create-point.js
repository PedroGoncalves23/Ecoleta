 function populationUfs() {
     const ufSelect = document.querySelector("select[name=uf]")

     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then( states => {

            for( const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
 }
 
 populationUfs()

 function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = `<option value>Selecione uma cidade</option>`;
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then( cities => {
            for( const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
 }

 document.querySelector("select[name=uf]").addEventListener("change", getCities)
 
 // Itens de coleta

const itemsCollect =document.querySelectorAll(".items-grid li")

for (const item of itemsCollect) {
    item.addEventListener("click", handSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handSelectedItem(event) {
    const itemLi = event.target
    // add ou remover uma classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id;
    
    //Verificar se existe itens selecionados
    //Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId // ver se o item é o msm id do selecionado
        return itemFound
    })
    //Se já estiver  selecionado, tirar seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(function (item) {
            const itemIsDifferente = item != itemId
            return itemIsDifferente
        })

        selectedItems = filteredItems
    } else {
        //Se não estiver add a seleção
        //add a seleção
        selectedItems.push(itemId)
    }

        // atualizar o campo escondido
        collectedItems.value = selectedItems

       
}