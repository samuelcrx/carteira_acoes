const User = require("../models/User");
import app from "../app";

module.exports = {
  async recovery(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.json({message: 'Undefined variable email'})
    }

    const ca_usu_cripto = Math.random().toString(36).slice(-6);

    app.email.send(email, ca_usu_cripto)
    
    const updated = await User.update({ ca_usu_cripto }, { where: { ca_usu_login: email } })

    return res.json({ message: 'Updated', updated });
  }
}