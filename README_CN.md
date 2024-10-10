<div align="right">
   <strong>中文</strong> | <a href="README.md">English</a>
</div>
<div align="center">
<h1>Serverless API Proxy</h1>
<p>Serverless API Proxy: 基于Vercel Routes、Cloudflare Worker、Netlify Redirects的多API代理网关</p>
</div>

## 支持服务

- openai
- gemini
- groq
- claude
- cohere
- huggingface.co
- Fireworks AI
- 其他服务

## 怎么部署

### Vercel 部署

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lopins/serverless-api-proxy)

### Cloudflare 部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lopins/serverless-api-proxy)

### Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lopins/serverless-api-proxy)

## 如何使用

### API地址

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

| API | 官方API | 代理API | API使用 |
| :---: | :--- | :--- | :--- |
| OpenAI API | <https://api.openai.com/v1> | `/openai/v1` | `/openai/v1/chat/completions` |
| Gemini API | <https://generativelanguage.googleapis.com/v1> | `/gemini/v1` | `/gemini/v1/models/gemini-pro:generateContent?key=AIzaSyBbBDDvGwJqKjsmE6CpNheqmzp30bz9saI` |
| Gemini API | <https://generativelanguage.googleapis.com/v1beta> | `/gemini/v1beta` | `/gemini/v1beta/models/gemini-pro:generateContent?key=AIzaSyBbBDDvGwJqKjsmE6CpNheqmzp30bz9saI` |
| Groq API | <https://api.groq.com/groq/openai/v1> | `/groq/openai/v1` | `/groq/openai/v1/chat/completions` |
| Claude API | <https://api.anthropic.com/v1> | `/claude/v1` | `/claude/v1/completions` |
| Cohere API | <https://api.cohere.ai/v1> | `/cohere/v1` | `/cohere/v1/chat/completions` |
| Huggingface API | <https://api-inference.huggingface.co> | `/huggingface` | `/huggingface/models/meta-llama/Llama-3.1-70B-Instruct/v1/chat/completions` |
| Fireworks API | <https://api.fireworks.ai/v1> | `/fireworks/v1` | `/fireworks/v1/chat/completions` |

### API使用

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
                    "content": "你是一个聪明且富有创造力的小说作家。"
                },
                {
                    "role": "user",
                    "content": "请你作为童话故事大王，写一篇短篇童话故事，故事的主题是要永远保持一颗善良的心，要能够激发儿童的学习兴趣和想象力，同时也能够帮助儿童更好地理解和接受故事中所蕴含的道理和价值观。只输出故事内容不需要标题和其他。"
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

## Vercel区域

https://vercel.com/docs/edge-network/regions#region-list