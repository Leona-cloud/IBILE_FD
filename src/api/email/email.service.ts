import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {
  private readonly apiKey = process.env.secret;
  private readonly apiUrl = 'https://api.brevo.com/v3/smtp/email';

  async sendMail(
    to: string,
    subject: string,
    textContent: string,
    htmlContent: string,
  ) {
    const emailData = {
      sender: { email: 'frontdesk@ibileholdings.com', name: 'IBILE FrontDesk' },
      to: [{ email: to }],
      subject,
      textContent,
      htmlContent,
    };

    try {
      const response = await axios.post(this.apiUrl, emailData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
      });

      console.log('Email sent successfully', response.data);
    } catch (error) {
      console.error(
        'Error in email sending',
        error.response?.data || error.message,
      );
      throw new Error('Failed to send email');
    }
  }
}
