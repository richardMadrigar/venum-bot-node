import axios from 'axios';

const value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbS5iciIsImlkX3RlbmFudCI6ImIzYThmMGJjLWUwNDQtNDU2Mi05NmQwLTkyYjc2ZGNmZGI3YSIsInRlbmFudF90b2tlbiI6ImRiX3Rlb2RvdG9fb2RvbnRvIiwibm9tZV9lbXByZXNhX3Rva2VuIjoiVGVvZG9ybyBPZG9udG8iLCJpZCI6MzA2OSwiaWF0IjoxNjgzNzI1ODU2LCJleHAiOjE2ODM3NTQ2NTZ9.OwqM_FlKJdw5suAi42dqsGy8MRjrRihWgsPQSsqVHOA';

export const token = `Bearer ${value}`;

export const Api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    authorization: token,
  },
  validateStatus(status) {
    return status < 500;
  },
});
