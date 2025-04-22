'use client'; // This tells Next.js that this component will run on the client side.

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoom() {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Hash the shared code to generate a unique Room ID
      const roomId = await generateRoomId(code);

      // Call the backend to check or create the room
      const response = await fetch(`/api/room/${roomId}`, {
        method: 'GET',
      });

      if (response.ok) {
        // Redirect to the Room Dashboard
        router.push(`/room/${roomId}`);
      } else {
        setError('Error: Could not join or create the room.');
      }
    } catch (error) {
      setError('Error: Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Generate a unique Room ID based on the shared code
  const generateRoomId = async (sharedCode: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(sharedCode);

    // Using the Web Crypto API to hash the shared code and generate a unique ID
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Return the first 16 characters of the hash as the Room ID
    return hashHex.slice(0, 16);
  };

  // Handle changes in the shared code input field
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="container">
      <main>
        <h1>Create or Join Your Private Space</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="code">Enter Your Shared Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={handleCodeChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Go to Your Room'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
    </div>
  );
}
