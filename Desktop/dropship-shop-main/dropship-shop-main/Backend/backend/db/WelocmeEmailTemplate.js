const welcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Ecomm Bazar</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif; color: #ffffff;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; padding: 20px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="color: #ffffff; margin: 0;">Welcome to Ecomm Bazar</h1>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td style="font-size: 16px; line-height: 24px; color: #ffffff;">
              <p>Hello!</p>
              <p>
                We're thrilled to have you join our online store. From top deals to premium collections, your shopping journey starts here.
              </p>
              <p>
                Explore thousands of products just a click away!
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding: 30px 0;">
              <a href="https://www.ecommbazar.com" 
                 style="background-color: #ffffff; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold;">
                Visit Store
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="font-size: 12px; color: #888888; padding-top: 20px;">
              <p>&copy; 2025 Ecomm Bazar. All rights reserved.</p>
              <p><a href="#" style="color: #888888; text-decoration: underline;">Unsubscribe</a></p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

module.exports = welcomeEmailTemplate;
