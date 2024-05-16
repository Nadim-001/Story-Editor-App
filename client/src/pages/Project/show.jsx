import React from 'react';
import { useParams } from 'react-router-dom';

export default function show() {
  const { id } = useParams();
  return <div>project {id}</div>;
}
