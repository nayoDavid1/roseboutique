import nodemailer from "nodemailer";

export default async (req, res) => {
  try {
  const { name, email, message, telephone } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "Rose.Boutique.Chic.2022@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: "gmail@rose.com", // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

    // email
    const emailData = {
      from: email,
      to: "Rose.Boutique.Chic.2022@gmail.com",
      subject: `Un message vous a été envoyé depuis votre site de l'adresse ${email}`,
      html: `<h1 style="color: red">Informations envoyées depuis votre site</h1><br>
        <p><strong style="color: red">Nom: </strong> ${name}</p>
        <p><strong style="color: red">Email: </strong> ${email}</p>
        <p><strong style="color: red">Téléphone: </strong> ${telephone}</p>
        <p><strong style="color: red">Message: </strong> ${message}</p>
      `
  };
    transporter.sendMail(emailData).then((data) => {
    console.log(data);
    res.json({ msg: 'Email envoyé avec succès' });
    })
  .catch((err) => {
    console.log(err);
  });
    } catch (err) {
    console.log(err);
    }
};
