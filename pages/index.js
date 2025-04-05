import React, { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      setAnswer('질문을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) {
        throw new Error('서버 응답이 원활하지 않아요.');
      }
      const data = await res.json();
      setAnswer(data.reply);
    } catch (error) {
      console.error('Error fetching chat API:', error);
      setAnswer('죄송해요, 서버 오류가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>과학자 챗봇</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="과학자에게 질문해 보세요"
        style={{ width: '100%', padding: 10 }}
      />
      <button onClick={askQuestion} style={{ marginTop: 10 }}>
        {loading ? '처리 중...' : '질문하기'}
      </button>
      <div style={{ marginTop: 20 }}>
        <strong>답변:</strong>
        <p>{answer}</p>
      </div>
    </div>
  );
}
