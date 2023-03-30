const bcrypt = require('bcrypt');

async function encriptarPass() {
  const myPassword = '123456pass';
  const hashedPass = '$2b$10$3J0nyxed/0ptS8vwGVdgbeE5JW0KO4q5VzqxsOOa7vedooUV.ZENa'
  //comprobamos si hacen match
  const match = await bcrypt.compare(myPassword, hashedPass);
  if (!match) {
    return respuesta = 'La contraseña no coincide'
  } else {
    return respuesta = 'Adelante'
  }
}

encriptarPass()
  .then((match) => {
    console.log(match);
  })
  .catch((error) => {
    console.error(error);
  });
