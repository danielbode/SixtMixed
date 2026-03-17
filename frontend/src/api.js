const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchPerson = (userId) =>
  fetch(`${API_BASE}/person/${userId}`).then((res) => res.json());
