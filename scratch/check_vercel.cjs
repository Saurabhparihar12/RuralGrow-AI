async function checkVercel() {
  const url = 'https://rural-grow-ai-eta.vercel.app';
  console.log('Fetching ' + url);
  const htmlRes = await fetch(url);
  const html = await htmlRes.text();
  console.log('HTML Status:', htmlRes.status);
  console.log('HTML Body Snippet:\n' + html);

  const match = html.match(/src="(\/assets\/[^"]+)"/);
  if (match) {
    const jsUrl = url + match[1];
    const jsRes = await fetch(jsUrl);
    const jsText = await jsRes.text();
    console.log('\nJS URL:', jsUrl);
    console.log('JS Status:', jsRes.status, jsRes.headers.get('content-type'));
    console.log('JS Content Length:', jsText.length);
  }
}
checkVercel();
