$(document).ready(() => {
  getItems();
});

let itemCount;

appendCount = (number) => {
  const $spanNumber = $('.item-number');
  $spanNumber.html(
    `<span class='item-number'>${number}</span>`);
};

getItems = () => {
  fetch('/api/v1/items', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
    itemCount = json.length
    appendCount(itemCount)
    const items = json.map(item => {
      appendItem(item.name, item.cleanliness, item.id)
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
    error: 'cannot add that item';
  });
};

updateCount = () => {
  fetch('/api/v1/items', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
    itemCount = json.length
    appendCount(itemCount)
  }).catch((error) => {
    error: 'cannot getItems'
  });
};

appendItem = (name, cleanliness, id) => {
  const $itemCard = $('ul');
  $itemCard.prepend(
    `<li data-id='${id}' class='garage-list-item'>${name}</li>`
  );
  updateCount()
};

clearFields = () => {
 $('.name').val('');
 $('.reason').val('');
 $('.dropdown-form').val('');
};

$('ul').on('click', 'li', (e) => {
  const id = e.target.dataset.id
  grabItem(id);
});


const grabItem = (id) => {
  fetch(`/api/v1/items/${id}`)
  .then(response => response.json())
  .then(items => {
    items.map((item) => {
      showItem(item.name, item.reason, item.cleanliness)
    })
  })
}

oneItem = (id) => {
  fetch('/api/v1/items/${id}', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
      showItem(json.name, json.reason, json.cleanliness)
  }).catch((error) => {
    error: 'cannot get that item'
  });
};

showItem = (name, reason, cleanliness) => {
  const $itemInfo = $('.item-info');
  $($itemInfo).empty().append(
    `<h3>${name}</h3>
    <h4>${reason}</h4>
    <h4>${cleanliness}</h4>
    <h5>Change Cleanliness</h5>
    <select class="dropdown-form form-field" placeholder="Cleanliness Level">
      <option class="cleanliness" value="" disabled selected>${cleanliness}</option>
      <option class='drop-item' value='sparkling'>Sparkling</option>
      <option class='drop-item' value='dusty'>Dusty</option>
      <option class='drop-item' value='rancid'>Rancid</option>
    </select>`
  );
};
