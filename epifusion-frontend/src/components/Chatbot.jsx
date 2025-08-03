import { useState } from 'react';

const ChatBox = () => {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  const ask = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, region: 'toronto' }),
    });
    const data = await res.json();
    setA(data.answer || 'error');
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Ask region-specific question"
        className="border p-2 w-full mb-2"
      />
      <button onClick={ask} className="bg-blue-600 text-white px-3 py-1 rounded">
        Ask
      </button>
      {a && <p className="mt-3 text-sm">{a}</p>}
    </div>
  );
};

export default ChatBox;
