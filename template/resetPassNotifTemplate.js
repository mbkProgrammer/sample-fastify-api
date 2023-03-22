/* eslint-disable no-tabs */
const resetPassNotif = ({ name }) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Password Change Notification</title>
</head>
<body style="background-color: #f5f5f5; font-family: Arial, sans-serif;">
	<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
		<h1 style="text-align: center; color: #007bff;">Password Change Notification</h1>
		<p style="font-size: 16px; color: #444444;">Dear ${name},</p>
		<p style="font-size: 16px; color: #444444;">This email is to inform you that your password has been changed successfully.</p>
		<p style="font-size: 16px; color: #444444;">If you did not make this change or have any concerns, please contact us immediately.</p>
		<p style="font-size: 16px; color: #444444;">Thank you for choosing our service.</p>
		<p style="font-size: 16px; color: #444444;">Best regards,</p>
		<p style="font-size: 16px; color: #444444;">mbk Shop</p>
	</div>
</body>
</html>
`;

module.exports = resetPassNotif;
