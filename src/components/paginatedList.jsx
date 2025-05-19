import React, { useEffect, useState } from 'react';

// Simulated API
const fakeData = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
const PAGE_SIZE = 10;

function fetchItems(cursor = 'start') {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = cursor === 'start' ? 0 : parseInt(cursor, 10);
      const items = fakeData.slice(startIndex, startIndex + PAGE_SIZE);
      const nextCursor = startIndex + PAGE_SIZE < fakeData.length ? `${startIndex + PAGE_SIZE}` : null;
      resolve({ items, nextCursor });
    }, 500);
  });
}

export default function App() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState('start'); // required even for first request
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    if (!cursor) return; // No more data
    setLoading(true);
    const { items: newItems, nextCursor } = await fetchItems(cursor);
    setItems((prev) => [...prev, ...newItems]);
    setCursor(nextCursor);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Paginated List</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx} style={{ margin: '8px 0' }}>{item}</li>
        ))}
      </ul>
      {cursor && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
      {!cursor && <p>No more items to load.</p>}
    </div>
  );
}
