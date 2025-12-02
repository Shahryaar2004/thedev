const loginSuccessEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login Successful</title>
  <style>
    body {
      background-color: #000000;
      color: #ffffff;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #121212;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    h1 {
      color: #00ff99;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    a {
      color: #00ff99;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Login Successful</h1>
    <p>Hello,</p>
    <p>You have successfully logged into <strong>Ecom Bazar</strong>. We're glad to see you back!</p>
    <p>If this wasn’t you, please <a href="https://ecombazar.example.com/support">contact our support team</a> immediately.</p>
    <p>Thank you for choosing Ecom Bazar.</p>
    <div class="footer">
      &copy; 2025 Ecom Bazar. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = loginSuccessEmail;
