import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { email, firstName, jobId } = requestBody;
    const emailContent = `
      <div>
        <p>Dear ${firstName},</p>
        <p>Thank you for applying to the position with us at Hrai. We appreciate your interest in joining our team. We will review your application and reach out to you as soon as possible.</p>
        <br />
        <p>In the meantime, we would love for you to chat with our AI Hiring Assistant, so we can learn a little more about you.</p>
        <p>You can use this link here to get started: https://hrai69.vercel.app/chat/${jobId}</p>
        <br />
        <p>Best regards,</p>
        <p>Christian</p>
      </div>
    `;
    const { data, error } = await resend.emails.send({
      from: 'Hrai <onboarding@resend.dev>',
      to: [email],
      subject: "Hello world",
      html: emailContent
    });

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow_Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
