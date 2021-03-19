/*
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();


function getCities (event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json()) 
    .then(cities => {

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

//na arrow function podemos abstrair os parenteses, chaves e return quando é uma palavra só

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)
*/
// Itens de ecoleta
// pegar todos os li's
const itemsToCollectTypes = document.querySelectorAll("#types li");

const itemsToCollectRegions = document.querySelectorAll("#regions li");

const collectedTypes = document.querySelector("input[name=types]");

const collectedRegions = document.querySelector("input[name=regions]");

let selectedTypes = [];
let selectedRegions = [];

for (const item of itemsToCollectTypes) {
  item.addEventListener("click", (e) => handleSelectedItem(e, collectedTypes, selectedTypes));
}

for (const item of itemsToCollectRegions) {
  item.addEventListener("click", (e) => handleSelectedItem(e, collectedRegions, selectedRegions));
}


function handleSelectedItem(event, collectedItems, selectedItems) {
  const itemLi = event.target;

  //add ou rem uma classe com js
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  //verificar se existem itens selecionados, se sim
  //pegar os itens selecionados

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId; //verificando de é true or false
    return itemFound;
  });

  //se ja estiver selecionado,
  if (alreadySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId; //false
      return itemIsDifferent;
    });

    selectedItems = filteredItems;
  } else {
    //se não estiver selecionado, adicionar à seleção
    selectedItems.push(itemId);
  }

  //atualizar o campo input escondido com os itens selecionados

  collectedItems.value = selectedItems;
}
