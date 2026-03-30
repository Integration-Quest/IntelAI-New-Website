const nodemailer = require('nodemailer');

const serviceNames = {
  'erp': 'ERP & Marketplace Integrations',
  'data': 'Data Pipelines & Cloud BI',
  'finance': 'Financial Reconciliation',
  'products': 'Product Listings & Optimization',
  'netsuite': 'NetSuite Accounting & Reporting',
  'ai': 'Forecasting & Recommendations',
  'inventory': 'Inventory Management',
  'order': 'Order Management',
  'fulfillment': 'Multi-Channel Fulfillment',
  'purchase': 'Purchase Orders',
  'repricing': 'Repricing Engine',
  'warehouse': 'Warehouse Management',
  'dropshipping': 'Dropshipping',
  'multiple': 'Multiple Services',
  '': 'Not specified'
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  console.log('API called with:', req.method, req.body);

  try {
    const { name, company, email, phone, services, date, time, timezone, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email required' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return res.status(500).json({ 
        success: false, 
        error: 'Email service not configured' 
      });
    }

    const serviceDisplayName = serviceNames[services] || 'Not specified';
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const supportEmail = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New Consultation: ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${serviceDisplayName}</p>
        <p><strong>Date:</strong> ${date || 'Not specified'}</p>
        <p><strong>Time:</strong> ${time || 'Not specified'}</p>
        <p><strong>Timezone:</strong> ${timezone || 'Not specified'}</p>
        <p><strong>Message:</strong><br>${message || 'No message'}</p>
      `,
      replyTo: email
    };

    // FIXED: Only ONE userEmail declaration
    const userEmail = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you - IntelAI Analytics',
      html: `
        <h2>Thank you ${name}!</h2>
        <p>We received your consultation request for <strong>${serviceDisplayName}</strong>.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Requested Schedule:</h3>
          <p><strong>📅 Date:</strong> ${date || 'Not specified'}</p>
          <p><strong>🕐 Time:</strong> ${time || 'Not specified'}</p>
          <p><strong>🌍 Timezone:</strong> ${timezone || 'Not specified'}</p>
        </div>
        
        <p>We'll contact you shortly to confirm and schedule your meeting at your preferred time.</p>
        <p>If you need to make any changes to your preferred schedule, simply reply to this email.</p>
        
        <p>Best regards,<br>
        <strong>The IntelAI Analytics Team</strong></p>
      `
    };

    await transporter.sendMail(supportEmail);
    await transporter.sendMail(userEmail);

    return res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message 
    });
  }
};
