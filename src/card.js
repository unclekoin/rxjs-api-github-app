export const card = (user) =>
  `<div class="card" style="max-width: 500px;">
    <div class="card-content">
      <span class="card-title">${user.login}</span>
    </div>
    <div class="card-image">
      <img src=${user.avatar_url} alt=${user.login}>
    </div>
    <div class="card-action">
      <a href=${user.html_url} target="_blank">Go to the GitHub page</a>
    </div>
  </div>
  `;
