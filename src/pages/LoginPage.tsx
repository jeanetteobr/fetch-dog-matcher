import { useState } from 'react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <h1>Welcome to Fetch Dog Matcher 🐶</h1>
      <p>Start by logging in to find your furry soulmate.</p>
      <form>
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
        <button type="submit">Login</button>
      </form>
    </>
  );
}
