import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/persona">Persona</Link></li>
          <li><Link href="/persona-review">Persona Review</Link></li>
          <li><Link href="/interview">Interview</Link></li>
          <li><Link href="/review">Review</Link></li>
          <li><Link href="/create-bmc">Create BMC</Link></li>
        </ul>
      </nav>
      <h1>Welcome to the App</h1>
    </div>
  );
}