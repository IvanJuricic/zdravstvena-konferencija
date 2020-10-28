const sgMail = require("@sendgrid/mail");
const config = require("config");
const jwt = require("jsonwebtoken");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (user) => {
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
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
