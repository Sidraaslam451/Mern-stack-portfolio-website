import nodemailer from "nodemailer";
import { Contact } from "../models/index.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Sab fields fill karo!",
      });
    }
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
    });
    const transporter = createTransporter();

    const mailToOwner = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📩 New Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Portfolio Contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 10px;">${subject}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
              <td style="padding: 10px;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Received: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    const mailToSender = {
      from: `"Your Name Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Shukriya! Aapka message mil gaya 🙏",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Shukriya ${name}!</h2>
          <p>Aapka message mil gaya. Main jald hi reply karunga.</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <strong>Aapka message:</strong><br>
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p>Best Regards,<br><strong>Your Name</strong></p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToSender),
    ]);

    res.status(200).json({
      success: true,
      message: "Message bhej diya! Jald reply milega. 📧",
      data: { id: contact._id },
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Message nahi bheja ja saka. Dobara try karo!",
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      unread: contacts.filter((c) => !c.isRead).length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ success: true, message: "Read mark ho gaya!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
