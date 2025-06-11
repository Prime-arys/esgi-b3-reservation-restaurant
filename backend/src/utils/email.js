function checkEmail(email) {
  const re = /^[\w]+([\.-]?[\w]+)*([\+][\w\.-]+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
}

module.exports = {
  checkEmail,
};