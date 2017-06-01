$(document).ready(() => {
  getItems();
});

let itemCount;

getItems = () => {
  fetch('/api/v1/items', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
    const items = json.map(item => {
      appendItem(item.name, item.reason, item.cleanliness)
    });
  }).catch((error) => {
    error: 'cannot getItems'
  });
};

appendItem = (name, reason, cleanliness) => {
  const $itemCard = $('.item-card');
  $itemCard.prepend(
    `<h3>${name}</h3>`
  );
};

// <ul>
//   <li>Reason: ${reason}</li>
//   <li>Cleanliness: ${cleanliness}</li>
// </ul>
