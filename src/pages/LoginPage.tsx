import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(name, email); // ✅ this already sends the POST and sets state
      navigate('/search');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your info and try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <h1>Welcome to Fetch Dog Matcher 🐶</h1>
      <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#888' }}>
        "Every dog has its day. Let's find yours." 🦴
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Sniffing out your account...' : 'Sniff In! 🐾'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
