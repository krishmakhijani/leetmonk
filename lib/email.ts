
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  try {
    console.log('Sending email with config:', {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASSWORD,
      link: verificationLink
    });

    const info = await transporter.sendMail({
      from: `"LeetMonk" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your LeetMonk Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #772ACD;">Verify your Email</h1>
          <p>Thank you for registering with LeetMonk. Please click the link below to verify your email:</p>
          <a
            href="${verificationLink}"
            style="
              background-color: #772ACD;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
            "
          >
            Verify Email
          </a>
          <p style="color: #666;">This link will expire in 1 hour.</p>
          <p style="color: #666;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    })

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error details:', error);
    throw error;
  }
}

transporter.verify(function (error) {
  if (error) {
    console.log('Transporter verification error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});
