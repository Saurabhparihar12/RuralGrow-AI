async function testCustomQueries() {
  const baseUrl = 'https://ruralgrow-ai.onrender.com';
  const queries = [
    'How to grow Harsil apples?',
    'Tell me about organic pest control with neem oil',
    'How do I sell my shawls on Amazon and ONDC?',
    'What weather precautions should I take in winter?',
    'How to make honey jam for my shop?'
  ];
  for (const q of queries) {
    const res = await fetch(baseUrl + '/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: q })
    });
    const json = await res.json();
    console.log('Query: ' + q);
    console.log('Reply: ' + (json.replyText || '').substring(0, 110).replace(/\n/g, ' ') + '...\n');
  }
}
testCustomQueries();
