const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (userEmail, confirmationCode) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shabanaqadar786@gmail.com", // Replace with your actual email
            pass: "kirujgoyisuqhcau", // ✅ Put your App Password inside quotes!
        },
    });

    const mailOptions = {
        from: "shabanaqadar786@gmail.com",
        to: userEmail,
        subject: "Email Confirmation Code",
        text: `Your confirmation code is: ${confirmationCode}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendConfirmationEmail };
