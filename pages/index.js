import React, { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.reply);
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
      <button onClick={askQuestion} style={{ marginTop: 10 }}>질문하기</button>
      <div style={{ marginTop: 20 }}>
        <strong>답변:</strong>
        <p>{answer}</p>
      </div>
    </div>
  );
}
