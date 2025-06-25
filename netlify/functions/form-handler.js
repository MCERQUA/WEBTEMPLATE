exports.handler = async (event, context) => {
  // Basic form handler for Netlify Forms with Next.js runtime v5
  console.log('Form handler called with event:', event.httpMethod);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Form handler ready' }),
  };
};
