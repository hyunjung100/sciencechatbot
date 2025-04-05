import React, { useState } from 'react';

export default function Home() {
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      setConversation(prev => [...prev, { role: 'bot', text: '질문을 입력해주세요.' }]);
      return;
    }
    // 사용자 질문 추가
    setConversation(prev => [...prev, { role: 'user', text: question }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error('서버 응답이 원활하지 않아요.');
      const data = await res.json();
      setConversation(prev => [...prev, { role: 'bot', text: data.reply }]);
      setQuestion('');
    } catch (error) {
      console.error('Error fetching chat API:', error);
      setConversation(prev => [...prev, { role: 'bot', text: '서버 오류가 발생했어요.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '20px',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{ textAlign: 'center' }}>과학자 챗봇</h1>
        <div style={{
          marginBottom: '20px',
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px'
        }}>
          {conversation.map((msg, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>{msg.role === 'user' ? '나' : '과학자'}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="과학자에게 질문해 보세요"
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={askQuestion}
            style={{
              marginLeft: '10px',
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {loading ? '처리 중...' : '질문하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
