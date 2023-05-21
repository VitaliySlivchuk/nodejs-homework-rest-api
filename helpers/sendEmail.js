const sgMail = require("@sendgrid/mail");
const { date } = require("joi");

//api ключ з сайту sendgrid
const { SENDGRID_API_KEY } = process.env;

//привазується api ключ
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "vitaliyslivchuk@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
