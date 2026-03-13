const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendBookingEmail = async (appointment) => {
    try {
        const { patientId, doctorId, date, timeSlot, paymentAmount, paymentId } = appointment;
        const patientName = patientId.name;
        const patientEmail = patientId.email;
        const doctorName = doctorId.userId.name;
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const mailOptions = {
            from: `"ABHI SK HOSPITAL" <${process.env.EMAIL_USER}>`,
            to: patientEmail,
            subject: 'Appointment Confirmation - ABHI SK HOSPITAL',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Booking Confirmed!</h1>
                        <p style="margin-top: 10px; opacity: 0.9;">Hello ${patientName}, your appointment has been scheduled.</p>
                    </div>
                    
                    <div style="padding: 30px; color: #1e293b;">
                        <h2 style="font-size: 18px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Appointment Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Doctor:</td>
                                <td style="padding: 10px 0; font-weight: 600;">Dr. ${doctorName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Date:</td>
                                <td style="padding: 10px 0; font-weight: 600;">${formattedDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Time:</td>
                                <td style="padding: 10px 0; font-weight: 600;">${timeSlot}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Location:</td>
                                <td style="padding: 10px 0; font-weight: 600;">ABHI SK HOSPITAL, Gobichettipalayam</td>
                            </tr>
                        </table>

                        <h2 style="font-size: 18px; margin: 30px 0 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Payment Invoice</h2>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="color: #64748b;">Transaction ID:</td>
                                    <td style="text-align: right; font-family: monospace;">${paymentId || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style="color: #64748b; padding-top: 10px;">Amount Paid:</td>
                                    <td style="text-align: right; font-weight: 700; font-size: 18px; color: #10b981; padding-top: 10px;">₹${paymentAmount}</td>
                                </tr>
                                <tr>
                                    <td style="color: #64748b; padding-top: 5px;">Status:</td>
                                    <td style="text-align: right; color: #059669; font-weight: 600; padding-top: 5px;">Paid</td>
                                </tr>
                            </table>
                        </div>

                        <div style="margin-top: 30px; padding: 20px; border-left: 4px solid #10b981; background: #f0fdf4; font-size: 14px; color: #15803d;">
                            <strong>Note:</strong> Please arrive 15 minutes before your scheduled time. If you need to reschedule, please visit our portal.
                        </div>
                    </div>

                    <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                        <p>© ${new Date().getFullYear()} ABHI SK HOSPITAL - 153, Sathy Main Road, Gobichettipalayam</p>
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};

const sendSuccessfulAppointmentEmail = async (appointment) => {
    try {
        const { patientId, doctorId, diagnosis, prescription } = appointment;
        const patientName = patientId.name;
        const patientEmail = patientId.email;
        const doctorName = doctorId.userId.name;

        const mailOptions = {
            from: `"ABHI SK HOSPITAL" <${process.env.EMAIL_USER}>`,
            to: patientEmail,
            subject: 'Your Appointment was Successful - ABHI SK HOSPITAL',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Appointment Successful!</h1>
                        <p style="margin-top: 10px; opacity: 0.9;">Hello ${patientName}, your visit with Dr. ${doctorName} is complete.</p>
                    </div>
                    
                    <div style="padding: 30px; color: #1e293b;">
                        <p style="font-size: 16px; line-height: 1.6;">We hope you had a good experience at ABHI SK HOSPITAL. Below are the details from your consultation:</p>
                        
                        ${diagnosis ? `
                        <div style="margin: 20px 0; padding: 20px; background: #fefce8; border-left: 4px solid #eab308; border-radius: 4px;">
                            <h3 style="margin: 0 0 10px; color: #854d0e; font-size: 14px; text-transform: uppercase;">Diagnosis</h3>
                            <p style="margin: 0; color: #713f12;">${diagnosis}</p>
                        </div>
                        ` : ''}

                        ${prescription ? `
                        <div style="margin: 20px 0; padding: 20px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                            <h3 style="margin: 0 0 10px; color: #1e40af; font-size: 14px; text-transform: uppercase;">Prescription</h3>
                            <p style="margin: 0; color: #1e3a8a; white-space: pre-wrap;">${prescription}</p>
                        </div>
                        ` : ''}

                        <div style="text-align: center; margin-top: 40px;">
                            <p style="color: #64748b; font-size: 14px;">If you have any questions, please contact us.</p>
                            <a href="${process.env.CLIENT_URL}" style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 10px;">Visit Patient Portal</a>
                        </div>
                    </div>

                    <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                        <p>© ${new Date().getFullYear()} ABHI SK HOSPITAL - Gobichettipalayam</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Completion email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending completion email:', error);
        throw error;
    }
};

module.exports = { sendBookingEmail, sendSuccessfulAppointmentEmail };

