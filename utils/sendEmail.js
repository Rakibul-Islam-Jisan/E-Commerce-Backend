const nodemailer = require('nodemailer');

const sendEmail = async ({ to, type, token, categoryName, subCategoryName, productTitle }) => {
    let subject = '';
    let title = '';
    let description = '';
    let buttonText = '';
    let link = '';

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (type === 'VERIFY_EMAIL') {
        subject = 'Verify Your Email Address';
        title = 'Welcome Aboard!';
        description = 'Click the button below to verify your email address and complete your registration.';
        buttonText = 'Verify Email';
        link = `${frontendUrl}/verify-email/${token}`;

    } else if (type === 'RESET_PASSWORD') {
        subject = 'Password Reset Request';
        title = 'Reset Your Password';
        description = 'Click the button below to proceed. This link will expire shortly.';
        buttonText = 'Reset Password';
        link = `${frontendUrl}/reset-password/${token}`;

    } else if (type === 'NEW_CATEGORY') {
        subject = 'New Category Created';
        title = 'New Category Alert!';
        description = `A new category named "${categoryName}" has been successfully added to the system.`;
        buttonText = 'View Categories';
        link = `${frontendUrl}/admin/categories`;

    } else if (type === 'DELETE_CATEGORY') {
        subject = 'Category Deleted';
        title = 'Category Deletion Alert!';
        description = `The category named "${categoryName}" has been deleted from the system.`;
        buttonText = 'View Categories';
        link = `${frontendUrl}/admin/categories`;

    } else if (type === 'NEW_SUBCATEGORY') {
        subject = 'New Subcategory Created';
        title = 'New Subcategory Alert!';
        description = `A new subcategory named "${subCategoryName}" has been successfully added to the system.`;
        buttonText = 'View Subcategories';
        link = `${frontendUrl}/admin/subcategories`;

    } else if (type === 'DELETE_SUBCATEGORY') {
        subject = 'Subcategory Deleted';
        title = 'Subcategory Deletion Alert!';
        description = `The subcategory named "${subCategoryName}" has been deleted from the system.`;
        buttonText = 'View Subcategories';
        link = `${frontendUrl}/admin/subcategories`;

    } else if (type === 'NEW_PRODUCT') {
        subject = 'New Product Created';
        title = 'New Product Alert!';
        description = `A new product titled "${productTitle}" has been successfully added to the platform.`;
        buttonText = 'View Products';
        link = `${frontendUrl}/admin/products`;

    } else if (type === 'DELETE_PRODUCT') {
        subject = 'Product Deleted';
        title = 'Product Deletion Alert!';
        description = `The product titled "${productTitle}" has been removed from the platform.`;
        buttonText = 'View Products';
        link = `${frontendUrl}/admin/products`;
    }

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">${title}</h2>
          <p style="color: #334155; line-height: 1.5;">${description}</p>
          <div style="margin: 24px 0;">
            <a href="${link}" style="background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">${buttonText}</a>
          </div>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Or copy this link: <a href="${link}">${link}</a></p>
        </div>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    return await transporter.sendMail({
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
    });
};

module.exports = sendEmail;