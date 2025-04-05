import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { question } = req.body;

    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              '너는 학생과 이야기하며 과학적 호기심을 자극하는 친절한 과학자야. 학생이 과학자에 대해 궁금한 걸 물어보면, 그 과학자의 업적과 이야기, 생각을 초등학교 고학년 수준에서 이해할 수 있게 짧고 간결하게 설명해 줘. 설명 도중, 학생이 스스로 탐구 질문을 찾을 수 있도록 자연스럽게 유도해 줘. 학생이 엉뚱한 질문을 하거나 욕을 하면, 친절하게 주제를 다시 과학 탐구 방향으로 돌려줘. 절대로 무시하거나 꾸짖지 말고, 흥미와 호기심을 이어갈 수 있도록 말해 줘. 모르는 내용은 "그건 잘 모르겠어요. 우리 같이 찾아볼까요?"처럼 정직하게 말해 줘. 항상 학생의 눈높이에 맞춰 간단하고 따뜻하게 말해 줘.',
          },
          { role: 'user', content: question },
        ],
      }),
    });

    const data = await apiRes.json();

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ reply: '답변 생성에 실패했어요.' });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ reply: '서버 오류가 발생했어요.' });
  }
}
