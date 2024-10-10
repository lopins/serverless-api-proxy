<div align="right">
   <a href="README_CN.md">中文</a> | <strong>English</strong>
</div>
<div align="center">
<h1>Serverless API Proxy</h1>
<p>Serverless API Proxy: Multi-API Proxy Gateway Based on Vercel Routes, Cloudflare Workers, and Netlify Redirects</p>
</div>

## Support

- openai
- gemini
- groq
- claude
- cohere
- huggingface.co
- Fireworks AI
- ...

## How to deploy

### Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lopins/serverless-api-proxy)

### Cloudflare

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lopins/serverless-api-proxy)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lopins/serverless-api-proxy)

## How to use

### Configure proxy address

```
# openai
https://self.domain/openai/

# gemini
https://self.domain/gemini/

# groq
https://self.domain/groq/

# claude
https://self.domain/claude/

# cohere
https://self.domain/cohere/

# huggingface
https://self.domain/huggingface/

# fireworks
https://self.domain/fireworks/
```

| Name | Original API | Proxy API | Use Example |
| :---: | :--- | :--- | :--- |
| OpenAI API | <https://api.openai.com/v1> | `/openai/v1` | `/openai/v1/chat/completions` |
| Gemini API | <https://generativelanguage.googleapis.com/v1> | `/gemini/v1` | `/gemini/v1/models/gemini-pro:generateContent?key=AIzaSyBbBDDvGwJqKjsmE6CpNheqmzp30bz9saI` |
| Gemini API | <https://generativelanguage.googleapis.com/v1beta> | `/gemini/v1beta` | `/gemini/v1beta/models/gemini-pro:generateContent?key=AIzaSyBbBDDvGwJqKjsmE6CpNheqmzp30bz9saI` |
| Groq API | <https://api.groq.com/groq/openai/v1> | `/groq/openai/v1` | `/groq/openai/v1/chat/completions` |
| Claude API | <https://api.anthropic.com/v1> | `/claude/v1` | `/claude/v1/completions` |
| Cohere API | <https://api.cohere.ai/v1> | `/cohere/v1` | `/cohere/v1/chat/completions` |
| Huggingface API | <https://api-inference.huggingface.co> | `/huggingface` | `/huggingface/models/meta-llama/Llama-3.1-70B-Instruct/v1/chat/completions` |
| Fireworks API | <https://api.fireworks.ai/v1> | `/fireworks/v1` | `/fireworks/v1/chat/completions` |


### API Usage

``` python
import random
import re

from openai import OpenAI

ApiKey = "sk-Qa7GFtgCspCVfVGqKhm43QFmEB1FxsFvkXNysVycCuwDv2rz"
BaseUrl = "https://self.domain/openai/v1"
models = [
    "gpt-3.5-turbo",
    "gpt-4o-mini"
]

def gentext():
    client = OpenAI(api_key=ApiKey, base_url=BaseUrl)
    model = random.choice(models)
    try:
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a smart and creative novelist."
                },
                {
                    "role": "user",
                    "content": "As the king of fairy tales, please write a short fairy tale, the theme of the story is to always maintain a kind heart, to stimulate children's interest and imagination in learning, and to help children better understand and accept the truth and values contained in the story. Only the story content is output, and the title and others are not required."
                }
            ],
            top_p=0.7,
            temperature=0.7
        )
        text = completion.choices[0].message.content
        print(f"{model}：{re.sub(r'\n+', '', text)}")
    except Exception as e:
        print(f"{model}：{str(e)}\n")
```

## Vercel Region List

https://vercel.com/docs/edge-network/regions#region-list