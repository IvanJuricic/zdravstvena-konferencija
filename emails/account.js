const sgMail = require("@sendgrid/mail");
const config = require("config");
const jwt = require("jsonwebtoken");
const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = async (user) => {
  const token = await jwt.sign(
    { _id: user._id.toString() },
    config.get("jwtSecret")
  );
  const url = `http://localhost:5000/api/auth/${token}`;
  sgMail
    .send({
      to: user.email,
      from: "zdrkonf@gmail.com",
      subject: "Dobrodošli na zdravstvenu konferenciju",
      html: `<h1>Dobrodošli ${user.name}.</h1>
      <p>Za potvrdu registracije kliknite na poveznicu:</p>
      <div><a href=${url}>${url}</a></div>
      `,
    })
    .then(() => {
      console.log("Email sent!");
    })
    .catch(() => {
      console.log("Email wasnt sent");
    });
};

module.exports = {
  sendWelcomeEmail,
};
