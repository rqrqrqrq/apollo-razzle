import React from 'react';

const items = [
  { id: 1, name: 'test' },
  { id: 2, name: 'another test' },
  { id: 3, name: 'yoba' },
];

const Store = () => (
  <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
);

export default Store;
