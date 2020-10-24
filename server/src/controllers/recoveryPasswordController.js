const User = require("../models/User");
import app from "../app";

module.exports = {
  async recovery(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.json({ message: "Undefined variable email" });
    }

    const ca_usu_cripto = Math.random().toString(36).slice(-6);
    const reset_password = true;

    const updated = await User.update(
      { ca_usu_cripto, reset_password },
      { where: { ca_usu_login: email } }
    );

    if (!updated) {
      return res.json({ message: "Usuario não encontrado" });
    }

    app.email.sendPassword(email, ca_usu_cripto);

    return res.json({ message: "Updated", updated });
  },
};
