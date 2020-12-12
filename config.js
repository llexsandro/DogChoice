console.log('Start');

const api='https://api.thedogapi.com/v1'

const fetchDoggoBreeds = async () => {
  const response = await fetch(api + '/breeds');
  const dogBreeds = await response.json();
  populateDoggoSelect(dogBreeds);
}

const populateDoggoSelect = (breeds) => {
  const select = document.querySelector('.breed-select');
  const breedOptions = breeds.map(breed => {
    const option = document.createElement('option');
    option.text = breed.name;
    option.value = breed.id;
    return option;
  })

  breedOptions.forEach(breedOption => {
    select.appendChild(breedOption);
  })
}

const fillDoggoImage = (imageUrl) => {
  document.querySelector('#doggo-image').setAttribute('src', imageUrl);
}

const createDescriptionEntry = ({label, value}) => {
  const descriptionTerm = document.createElement('dt');
  descriptionTerm.textContent = label;
  const descriptionValue = document.createElement('dd');
  descriptionValue.textContent = value;
  const parentElement = document.querySelector('#doggo-description');
  parentElement.appendChild(descriptionTerm);
  parentElement.appendChild(descriptionValue);
}

const clearDoggoDescription = () => {
  const descriptionElement = document.querySelector(
    '#doggo-description'
  )
  while(descriptionElement.firstChild) {
    descriptionElement.removeChild(descriptionElement.firstChild);
  }
}

const fillDoggoDescription = ({bred_for: bredFor, breed_group: breedGroup, name, origin: origin, temperament, life_span: lifeSpan, height, weight}) => {
  clearDoggoDescription();
  createDescriptionEntry({
    label: 'Nome:',
    value: name
  })
  createDescriptionEntry({
    label: 'Criado para:',
    value: bredFor
  })
  createDescriptionEntry({
    label: 'Grupo criado:',
    value: breedGroup
  })
  createDescriptionEntry({
    label: 'Temperamento:',
    value: temperament
  })
  createDescriptionEntry({
    label: 'Tempo de Vida:',
    value: lifeSpan
  })
  createDescriptionEntry({
    label: 'Origem:',
    value: origin
  })
  createDescriptionEntry({
    label: 'Altura (cm):',
    value: height.metric
  })
  createDescriptionEntry({
    label: 'Peso (Kg):',
    value: weight.metric
  })
}

const getDogByBreed = async (breedId) => {
  const [data] = await fetch(api + '/images/search?include_breed=1&breed_id=' + breedId).then((data) => data.json())
  const {url: imageUrl, breeds} = data;
  fillDoggoImage(imageUrl);
  fillDoggoDescription(breeds[0]);
}

const changeDoggo = () => {
  console.log(event.target.value);
  getDogByBreed(event.target.value);
}

fetchDoggoBreeds();
