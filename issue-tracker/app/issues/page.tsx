'use client'
import {  Button } from '@radix-ui/themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const IssuesPages = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/api/issues');
        setIssues(response.data);
      } catch (error) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div>

<div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <strong>{issue.title}</strong>
            <p>{issue.description}</p>
          </li>
        ))}
      </ul>
    </div>

       <Button><Link href='/issues/new'>New Issue</Link></Button>
    </div>
  )
}

export default IssuesPages