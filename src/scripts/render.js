export function render() {
  const user = JSON.parse(localStorage.getItem('user'));
  const repos = JSON.parse(localStorage.getItem('repos'));

  const headerContainer = document.querySelector('.header__container');
  const mainList = document.querySelector('.main__container--list');

  headerContainer.innerHTML = '';
  mainList.innerHTML = '';

  const profileContainer = document.createElement('div');
  const profileFigure = document.createElement('figure');
  const profileImage = document.createElement('img');
  const userName = document.createElement('h1');
  const changeUserBtn = document.createElement('a');

  profileContainer.classList = 'header__profileContainer';
  profileImage.classList = 'header__profileContainer--icon';
  userName.classList = 'header__profileContainer--userName';
  changeUserBtn.classList = 'header__container--button';
  changeUserBtn.href = '../../index.html';

  profileImage.src = user.avatar_url;
  profileImage.alt = 'GitHub User Avatar';

  if (user.name == null) {
    userName.innerText = user.login;
  } else {
    userName.innerText = user.name;
  }

  changeUserBtn.innerText = 'Trocar de usuário';

  profileFigure.appendChild(profileImage);
  profileContainer.append(profileFigure, userName);
  headerContainer.append(profileContainer, changeUserBtn);

  repos.forEach(repo => {
    const card = createCard(repo);

    mainList.appendChild(card);
  });
}

function createCard(element) {
  const cardContainer = document.createElement('li');
  const cardTitle = document.createElement('h2');
  const cardDescription = document.createElement('p');
  const cardButton = document.createElement('a');

  cardContainer.classList = 'list__container--card';
  cardTitle.classList = 'card__container--title';
  cardDescription.classList = 'card__container--description';
  cardButton.classList = 'card__container--button';

  cardTitle.innerText = element.name;

  if (element.description && element.description.length > 85) {
    cardDescription.innerText = `${element.description.substring(0, 85)}...`;
  } else if (element.description) {
    cardDescription.innerText = element.description;
  }

  cardButton.innerText = 'Repositório';
  cardButton.setAttribute('target', '_blank');
  cardButton.href = element.html_url;

  cardContainer.append(cardTitle, cardDescription, cardButton);

  return cardContainer;
}
