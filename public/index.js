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
    itemCount = json.length
    appendCount(itemCount)

    let sparkling = 0;
    let dusty = 0;
    let rancid = 0;

    const items = json.forEach(item => {
      appendItem(item.name, item.reason, item.cleanliness, item.id)


      if (item.cleanliness === 'sparkling') {
        // sparkling.push(item.cleanliness)
        sparkling++

      } else if (item.cleanliness === 'dusty') {
        dusty++

      } else if (item.cleanliness === 'rancid') {
        rancid++
      }

    });
    console.log('helllllo')
    appendNumbers(sparkling, dusty, rancid)
  }).catch((error) => {
    error: 'cannot getItems'
  });
};

getOrderAsc = () => {
  fetch('/api/v1/asc', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
    const items = json.map(item => {
      appendItem(item.name, item.reason, item.cleanliness, item.id)
    });
  }).catch((error) => {
    error: 'cannot order items'
  });
};

getOrderDes = () => {
  fetch('/api/v1/desc', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
    const items = json.map(item => {
      appendItem(item.name, item.reason, item.cleanliness, item.id)
    });
  }).catch((error) => {
    error: 'cannot order items'
  });
};

const grabItem = (id) => {
  fetch(`/api/v1/items/${id}`)
  .then(response => response.json())
  .then(items => {
    items.map((item) => {
      appendOneItem(item.name, item.reason, item.cleanliness)
    })
  })
}

postItem = (name, reason, cleanliness) => {
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

// patchItem = (cleanliness) => {
//   fetch('/api/v1/items/:id/edit', {
//     method: 'PATCH',
//     headers: {'Content-Type': 'application/json'},
//     body:
//       JSON.stringify({ 'cleanliness': cleanliness })
//   }).then((response) => {
//     return response.json()
//   }).then((json) => {
//     console.log(json)
//   })
// }

getCount = () => {
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

appendNumbers = (sparkling, dusty) => {
  console.log(sparkling, dusty, rancid)
  
}

appendCount = (number) => {
  const $spanNumber = $('.item-number');
  $spanNumber.html(
    `<span class='item-number'>${number}</span>`
  );
};

appendItem = (name, reason, cleanliness, id) => {
  const $itemCard = $('ul');
  $itemCard.prepend(
    `<li data-id='${id}' class='garage-list-item ${cleanliness}'>${name}</li>`
  );
  getCount();
};

appendOneItem = (name, reason, cleanliness) => {
  const $itemInfo = $('.item-info');
  $($itemInfo).empty().append(
    `<h2>${name}</h2>
    <h4>Reason for having: ${reason}</h4>
    <select id="dropdown-solo form-field" placeholder="Cleanliness Level">
      <option class="cleanliness" value="" disabled selected>${cleanliness}</option>
      <option class='drop' value='sparkling'>Sparkling</option>
      <option class='drop' value='dusty'>Dusty</option>
      <option class='drop' value='rancid'>Rancid</option>
    </select>`
  );
};

$('.submit').on('click', (e) => {
  e.preventDefault();
  let $name = $('.name').val();
  let $reason = $('.reason').val();
  let $cleanliness = $('.dropdown-form').val();
  clearFields();
  postItem($name, $reason, $cleanliness);
});

$('.order').on('click', (e) => {
  e.preventDefault();
  $('ul').empty()
  getOrderAsc();
})

$('.order-des').on('click', (e) => {
  e.preventDefault();
  $('ul').empty()
  getOrderDes();
})

// $('select').on('click', '.drop', (e) => {
//   const cleanliness = e.target.value;
//   console.log(cleanliness)
//   console.log('hello')
//   patchItem(cleanliness);
// });

$('ul').on('click', 'li', (e) => {
  const id = e.target.dataset.id;
  grabItem(id);
});

clearFields = () => {
 $('.name').val('');
 $('.reason').val('');
 $('.dropdown-form').val('');
};

$(".remote").click(function() {
  $(this).toggleClass('on');
  $(".door").toggleClass("shut");
});
