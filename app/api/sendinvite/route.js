import nodemailer from "nodemailer";

export async function POST(req, res) {
  const { to, subject, message } = await req.json();

  // Validate fields
  if (!to || !subject || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  // Ensure to is an array
  const recipients = Array.isArray(to) ? to : [to];

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider
      auth: {
        user: "adityajindalbti21@gmail.com", // Replace with your Gmail address
        pass: "ysutkzsiixaymsbl", // Replace with your Gmail App Password
      },
    });

    // Use comma-separated email addresses for the to field
    await transporter.sendMail({
      from: "adityajindalbti21@gmail.com", // Replace with your email address
      to: recipients.join(","), // Join recipients array into a single string
      subject, // Subject of the email
      text: message, // Email content
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}