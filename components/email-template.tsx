import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <p>Dear {firstName},</p>
    <p>Thank you for applying to the position with us. We appreciate your interest in joining our team. We will review your application and reach out to you as soon as possible.</p>
    <br />
    <p>Best regards,</p>
    <p>Christian</p>
  </div>
)
