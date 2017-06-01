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

$('.submit').on('click', (e) => {
  e.preventDefault();
  let $name = $('.name').val();
  let $reason = $('.reason').val();
  let $cleanliness = $('.dropdown-form').val();
  clearFields();
  addItem($name, $reason, $cleanliness);
});

addItem = (name, reason, cleanliness) => {
  fetch('/api/v1/items', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:
      JSON.stringify({ 'name': name, 'reason': reason, 'cleanliness': cleanliness })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    appendItem(json.name, json.reason, json.cleanliness);
  }).catch((error) => {
    console.error('error: ', error);
  });
};

appendItem = (name, reason, cleanliness) => {
  const $itemCard = $('.item-card');
  $itemCard.prepend(
    `<h3>${name}</h3>`
  );
};

clearFields = () => {
 $('.name').val('');
 $('.reason').val('');
 $('.dropdown-form').val('');
};
