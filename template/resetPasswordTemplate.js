/* eslint-disable no-tabs */
const resetPassword = ({ name, token }) => `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Forgot Password</title>
	<style type="text/css">
		body {
			background-color: #f2f2f2;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 16px;
			line-height: 1.5;
			margin: 0;
			padding: 0;
			text-align: center;
		}

		.container {
			background-color: #fff;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			margin: 50px auto;
			max-width: 600px;
			padding: 20px;
		}

		h1 {
			color: #333;
			font-size: 28px;
			margin-bottom: 30px;
		}

		p {
			color: #666;
			margin-bottom: 20px;
		}

		.btn {
			background-color: #007bff;
			border-radius: 5px;
			color: #fff;
			display: inline-block;
			font-size: 16px;
			margin-top: 30px;
			padding: 10px 20px;
			text-decoration: none;
			transition: background-color 0.3s ease;
		}

		.btn:hover {
			background-color: #0062cc;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Forgot Password</h1>
		<p>We received a request to reset your password. To reset your password, click the button below.</p>
		<a href="http://localhost:3000/users/reset?token=${token}" class="btn">Reset Password</a>
		<p>If you did not request a password reset, please ignore this email.</p>
	</div>
</body>
</html>
`;

module.exports = resetPassword;
