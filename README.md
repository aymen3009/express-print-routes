# NPM Print Routes

## Description

This is a simple package that prints all the routes of your express app.

## Installation

```bash
npm i @aymen3009/express-print-routes
```

## Usage

```javascript
const express = require('express');
const printRoutes = require('@aymen3009/express-print-routes');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// After all your routes add this line
printRoutes(app);
```

## License

This project is licensed under the [MIT](LICENSE) License, feel free to do whatever you want with it.
