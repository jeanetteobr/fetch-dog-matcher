import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, logout, user, isAuthenticated } = useAuth();

  const handleFakeLogin = () => {
    login({ name: 'Testy McTestface', email: 'test@example.com' });
  };

  return (
    <>
      <h1>Welcome to Fetch Dog Matcher 🐶</h1>

      <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
      {user && (
        <p>
          <strong>User:</strong> {user.name} ({user.email})
        </p>
      )}

      <button onClick={handleFakeLogin}>Fake Login</button>
      <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
    </>
  );
}
