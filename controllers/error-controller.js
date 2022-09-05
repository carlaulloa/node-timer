exports.getNotFoundErrorPage = (req, res) => {
  res.redirect('/html/error.html');
}

exports.getInternalErrorPage = (req, res) => {
  res.redirect('/html/error.html')
}