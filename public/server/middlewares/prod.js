const path = require('path')
const express = require('express')
const compression = require('compression')

const clientBuildPath = path.resolve(__dirname, '..', '..', 'client')

module.exports = function setup(app) {
  app.use(compression())
  app.use('/', express.static(clientBuildPath))

  app.get('*', (req, res) => res.sendFile(path.resolve(clientBuildPath, 'index-template.html')))
}
