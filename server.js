"use strict";

const fs = require ('fs');
const express = require ('express');
const multer = require ('multer');

let upload = multer({
  dest: './uploads/',
  limits: { fileSize: 2097152 /* 2MB */ }
}).single ('uploaded');
let app = express ();

app.get ('/', (req, res) => {
  let index_page = fs.readFileSync ('index.html');

  res.writeHead (200, { 'Content-Type': 'text/html' });
  res.end (index_page);
});

app.post ('/', (req, res) => {
  upload (req, res, (err) => {
    res.writeHead (200, { 'Content-Type': 'application/json' });

    if ( err )
      return res.end (JSON.stringify ({ error: err.code }));

    fs.unlinkSync (req.file.path);
    res.end (JSON.stringify ({ size: req.file.size }));
  });
});

app.listen (process.env.PORT || 8080 );
