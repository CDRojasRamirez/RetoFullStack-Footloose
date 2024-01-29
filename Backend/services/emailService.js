import nodemailer from 'nodemailer'

export const sendEmail = async (to, subject, html) => {
    // Configuración de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cdanielrap@gmail.com',
        pass: 'pbge isbj wgfo dyjn'
      }
    });
  
    // Detalles del correo
    const mailOptions = {
      from: 'cdanielrap@gmail.com',
      to: to,
      subject: subject,
      html: html,
    };
  
    // Envío del correo
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Correo enviado: ${info.messageId}`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };