const db = require("./db");
async function registrarUsuario(nick) {
    return await db.isertOne("usuario",{"nick": nick});
}

module.exports = {registrarUsuario};

let bsucarUsuario = async (idUser)=>{
    let user = await db.findOne("usuarios", idUser);
    return user;
}

let alterarUsuario = async (user) =>{
    return await db.updateOne("usuarios", user,{_id:user._id});
}

