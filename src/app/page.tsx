import Image from 'next/image';
import Link from 'next/link';  // Import the Link component

export default function Home() {
  return (
    <div className="container">
      <main>
        <h1 className="title">Welcome to LoveVault!</h1>
        <h2 className="subtitle">Developed by Hemant Soni</h2>
        <div>
          <Image
            src="/images/cover.png"
            alt="LoveVault logo"
            width={500}
            height={400}
          />
        </div>

        {/* Link to Signup/Login (Create/Join room page) */}
        <div>
          <Link href="/create" className="signup-link">
            Create or Join Your Private Space
          </Link>
        </div>
      </main>
    </div>
  );
}