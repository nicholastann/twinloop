import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, optionalMessage } = body;

        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: "Name and email are required" },
                { status: 400 }
            );
        }

        // 1. File Storage Logic
        let contacts = [];
        try {
            const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
            contacts = JSON.parse(data);
        } catch (e) {
            // File likely doesn't exist or is empty, start fresh
        }

        const newContact = {
            name,
            email,
            optionalMessage,
            timestamp: new Date().toISOString()
        };

        contacts.push(newContact);

        // Ensure the data directory exists before writing
        try {
            await fs.mkdir(path.dirname(CONTACTS_FILE), { recursive: true });
        } catch (e) {
            // Ignore if exists
        }

        await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

        // 2. Email Sending Logic
        // Using nodemailer to send email to the specified address
        // This requires SMTP environment variables to be set
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER || '"Twinloop Contact" <noreply@twinloop.com>',
            to: "ndtann@proton.me",
            subject: `New Twinloop Contact: ${name}`,
            text: `You have a new contact request from the Twinloop website.\n\nName: ${name}\nEmail: ${email}\nMessage: ${optionalMessage || 'N/A'}\n\nThis contact has also been saved to your local database.`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #236a7c;">New Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong><br/>${optionalMessage || 'N/A'}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">This contact has been saved to data/contacts.json</p>
        </div>
      `,
        };

        // Attempt to send email only if configuration seems present
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully to ndtann@proton.me");
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
                // We don't fail the request if email fails, but we log it.
                // In a real app you might want to alert the user or retry.
            }
        } else {
            console.log("Skipping email send: SMTP_USER and SMTP_PASS environment variables are not set.");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in contact API:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
