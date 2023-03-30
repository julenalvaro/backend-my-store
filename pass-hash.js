const bcrypt = require('bcrypt');

async function encriptarPass() {
  const myPassword = '123456pass';
  //implementamos el hash con 10 vueltas
  const hash = await bcrypt.hash(myPassword, 10);
  return hash;
}

encriptarPass()
  .then((hash) => {
    console.log(hash);
  })
  .catch((error) => {
    console.error(error);
  });
