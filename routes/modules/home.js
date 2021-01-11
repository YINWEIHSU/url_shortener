const express = require('express')
const router = express.Router()
const generateLastKeyword = require('../../keyword_generator')
const Url = require('../../models/url')


router.get('/', (req, res) => {

  res.render('index')

})

router.post('/', (req, res) => {
  const website = req.headers.referer
  let pairUrl = generateLastKeyword(5)
  const inputUrl = req.body.inputUrl

  //確認轉換之網址是否重複
  Url.exists({ inputUrl: `${inputUrl}` }, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (doc) {
      //若重複則撈出一樣的短網址
      Url.findOne({ inputUrl: `${inputUrl}` }).lean()
        .then((item) => {
          pairUrl = item.pairUrl
          res.render('index', { pairUrl, website })
        })
        .catch(error => console.log(error))
    } else {
      //若不重複則給出短網址
      return Url.create({ inputUrl, pairUrl })
        .then(() => res.render('index', { pairUrl, website }))
        .catch(error => console.log(error))
    }
  })

})

//若輸入短網址，則導向目標網址
router.get('/:pairUrl', (req, res) => {
  const pairUrl = req.params.pairUrl
  Url.findOne({ pairUrl: `${pairUrl}` }).lean()
    .then(item => res.redirect(`${item.inputUrl}`))
    .catch(error => console.log(error))
})


module.exports = router