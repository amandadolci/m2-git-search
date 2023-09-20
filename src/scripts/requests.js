const baseURL = 'https://api.github.com/users/';

export function searchUser() {
  const input = document.querySelector('.search__container--input');
  const button = document.querySelector('.search__container--button');

  button.addEventListener('click', async () => {
    const userName = input.value;
    const user = await fetch(`${baseURL}${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          localStorage.clear();
          window.location.replace('./src/pages/error.html');
        }
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res));
      });
    const repos = await fetch(`${baseURL}${userName}/repos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        localStorage.setItem('repos', JSON.stringify(res));
        window.location.replace('./src/pages/profile.html');
      });
  });
}
