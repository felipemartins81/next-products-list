const express = require('express');
const http = require('request');
const app = express();
const port = 4000;
const apiMockHost = 'https://felipemartins81.github.io/json-mocks/meli';

app.get('/api/user', function (req, res) {
  var httpRequest = {
    url: 'https://api.mercadolibre.com/users/me',
    headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN },
    json: true
  };
  http.get(httpRequest, function (error, response, body) {
    res.status(response.statusCode)
      .send(!error ? { 'first_name': body.first_name, 'last_name': body.last_name } : setDefaultResponse(error, response, body));
  });
});

app.get('/api/items', function (req, res) {
  const httpRequest = {
    // FIXME: erro 403 ao fazer a requisição no endpoint do Mercado Livre
    // url: `https://api.mercadolibre.com/sites/MLA/search?q=${q}&offset=${offset}`,
    url: `${apiMockHost}/search-MLA.json`,
    json: true
  };
  http.get(httpRequest, function (error, response, body) {
    const products = {
      categories: [], // TODO: mock não tem 'filters' conforme documentado
      items: []
    };
    try {
      body.results.forEach(item => {
        products.items.push({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: 2,
            regular_amount: item.original_price
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping?.free_shipping || false,
          installments: item.installments?.quantity.toString() || '',
        })
      })
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    res.status(response.statusCode)
      .send(!error ? products : setDefaultResponse(error, response, body));
  });
});

app.get('/api/item/:id', function (req, res) {
  const httpRequest = {
    url: `${apiMockHost}/item-${req.params.id}.json`,
    json: true
  };
  http.get(httpRequest, async function (error, response, body) {
    const item = {};
    try {
      item.id = body.id;
      item.title = body.title;
      item.price = {
        currency: body.currency_id,
        amount: body.price,
        decimals: 2,
        regular_amount: body.original_price
      };
      item.picture = body.pictures[0].url;
      item.condition = body.condition;
      item.free_shipping = body.shipping?.free_shipping || false;
      item.sold_quantity = 0, // TODO: mock não tem 'sold_quantity' conforme documentado
      item.installments = '', // TODO: mock não tem 'installments' conforme documentado
      item.description = await fetchItemAditionalData(req.params.id, 'description')
        .then((description) => description.plain_text),
      item.attributes = body.attributes?.map(attribute => {
        return {
          id: attribute.id,
          name: attribute.name,
          value_name: attribute.value_name
        }
      }),
      item.category_path_from_root = await fetchItemAditionalData(req.params.id, 'category')
        .then((category) => category.path_from_root)
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    res.status(response.statusCode)
      .send(!error ? item : setDefaultResponse(error, response, body));
  });
});

function fetchItemAditionalData(itemId, dataType) {
  return new Promise((resolve, reject) => {
    const httpRequest = {
      url: `${apiMockHost}/item-${itemId}-${dataType}.json`,
      json: true
    };
    http.get(httpRequest, function (error, response, body) {
      error ? reject(error) : resolve(body);
    });
  })
}

function setDefaultResponse(error, response, body) {
  if (error) {
    console.error('Error:', error);
    return { 'status': response.statusCode, 'message': response.statusMessage }
  } else {
    return body || {}
  }
}

app.listen(port, () => {
  console.info(`App is listening on http://localhost:${port}`)
})
