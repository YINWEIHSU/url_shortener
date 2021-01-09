const express = require('express')
const router = express.Router()
const generateLastKeyword = require('../../keyword_generator')


router.get('/', (req, res) => {

  res.render('index')

})

router.post('/', (req, res) => {
  let lastKeyword = generateLastKeyword(5)

  res.render('index', { lastKeyword })

})

module.exports = router