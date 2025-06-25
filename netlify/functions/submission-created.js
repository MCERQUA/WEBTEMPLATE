exports.handler = async (event, context) => {
  // Handle form submissions for Netlify Forms with Next.js runtime v5
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Parse form data
  const formData = new URLSearchParams(event.body);
  const data = Object.fromEntries(formData);

  // Log the submission (you can replace this with your preferred notification method)
  console.log('Form submission received:', data);

  // Return success response
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Thank You</title>
          <meta http-equiv="refresh" content="3;url=/">
        </head>
        <body>
          <h1>Thank you for your message!</h1>
          <p>We'll get back to you soon. Redirecting you back to the homepage...</p>
        </body>
      </html>
    `,
  };
};
