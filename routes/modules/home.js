const express = require('express')
const router = express.Router()
const generateLastKeyword = require('../../keyword_generator')
const Url = require('../../models/url')


router.get('/', (req, res) => {

  res.render('index')

})

router.post('/', (req, res) => {
  let pairUrl = generateLastKeyword(5)
  const inputUrl = req.body.inputUrl

  Url.exists({ inputUrl: `${inputUrl}` }, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (doc) {
      Url.findOne({ inputUrl: `${inputUrl}` }).lean()
        .then((item) => {
          pairUrl = item.pairUrl
          res.render('index', { pairUrl })
        })
        .catch(error => console.log(error))
    } else {
      return Url.create({ inputUrl, pairUrl })
        .then(() => res.render('index', { pairUrl }))
        .catch(error => console.log(error))
    }
  })

})

router.get('/:pairUrl', (req, res) => {
  const pairUrl = req.params.pairUrl
  Url.findOne({ pairUrl: `${pairUrl}` }).lean()
    .then(item => res.redirect(`${item.inputUrl}`))
    .catch(error => console.log(error))
})


module.exports = router