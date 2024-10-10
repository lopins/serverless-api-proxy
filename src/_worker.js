addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === '/' || pathname === '/index.html') {
    return new Response('service is running!', {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    });
  } 
  if(pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  const apiMapping = {
    '/gemini/v1': 'https://generativelanguage.googleapis.com/v1',
    '/gemini/v1beta': 'https://generativelanguage.googleapis.com/v1beta',
    '/openai/v1': 'https://api.openai.com/v1',
    '/groq/openai/v1': 'https://api.groq.com/openai/v1',
    '/claude/v1': 'https://api.anthropic.com/v1',
    '/cohere/v1': 'https://api.cohere.ai/v1',
    '/huggingface': 'https://api-inference.huggingface.co',
    '/together/v1': 'https://api.together.xyz/v1',
    '/novita/v3': 'https://api.novita.ai/v3',
    '/novita/v3beta': 'https://api.novita.ai/v3beta',
    '/portkey/v1': 'https://api.portkey.ai/v1',
    '/fireworks/v1': 'https://api.fireworks.ai/inference/v1',
    '/openrouter/v1': '"https://openrouter.ai/api/v1'
  }
  
  const [prefix, rest] = extractPrefixAndRest(pathname, Object.keys(apiMapping));
  if (prefix) {
    const baseApiUrl = apiMapping[prefix];
    const targetUrl = `${baseApiUrl}${rest}`;

    try {
      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: new Headers(request.headers),
        body: request.body
      });

      const response = await fetch(newRequest);
      return response;
    } catch (error) {
      console.error('Failed to fetch:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}

function extractPrefixAndRest(pathname, prefixes) {
  for (const prefix of prefixes) {
    if (pathname.startsWith(prefix)) {
      return [prefix, pathname.slice(prefix.length)];
    }
  }
  return [null, null];
}