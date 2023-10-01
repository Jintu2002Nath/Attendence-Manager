exports.successMessage = (name) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://attendance-manager-system.vercel.app/"><img class="logo"
                    src="https://www.iaspaper.net/storage/2019/10/JEC-ASsam.jpg" alt="Logo"></a>
            <div class="message"> Password Update Successfully</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>We update your password.Now you can log in with your new password
                </p>

                
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
           
        </div>
    </body>
    
    </html>`;
};
