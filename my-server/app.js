const express = require('express');
const http = require('request');
const app = express();
const port = 4000;

const meliApi = {

}


function setDefaultResponse(error, response, body) {
  if (error) {
    console.error('Error:', error);
    return {'status':response.statusCode, 'message':response.statusMessage}
  } else {
    return body || {}
  }
}

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/api/user', function (req, res) {
  var httpRequest = {
    url: 'https://api.mercadolibre.com/users/me',
    headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN },
    json: true
  };
  http.get(httpRequest, function (error, response, body) {
    res.status(response.statusCode)
      .send(!error ? {'first_name': body.first_name, 'last_name': body.last_name} : setDefaultResponse(error, response, body));
  });
});

app.listen(port, () => {
  console.info(`App is listening on http://localhost:${port}`)
})

// Construir os seguintes endpoints para serem utilizados nas telas:
// /api/items?offset=:offset&q=:query > ■ https://api.mercadolibre.com/sites/MLA/search?q=:query
// /api/items/:id > ■ https://api.mercadolibre.com/items/:id / https://api.mercadolibre.com/items/:id/description / https://api.mercadolibre.com/categories/:category_id

