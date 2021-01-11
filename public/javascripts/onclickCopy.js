//應該要載入main.js，但我一直失敗
function onclickCopy(id) {

  const element = document.getElementById(id)
  window.getSelection().selectAllChildren(element)
  document.execCommand("Copy")
  window.getSelection().removeAllRanges()
  alert('網址已複製到剪貼簿')

}