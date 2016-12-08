"use strict";

const fs = require ('fs');
const express = require ('express');

let app = express ();

app.get ('*', (req, res) => {
  let index_page = fs.readFileSync ('index.html');

  res.writeHead (200, { 'Content-Type': 'text/html' });
  res.end (index_page);
});

app.listen (process.env.PORT || 8080 );
