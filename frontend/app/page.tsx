import Link from 'next/link';
import React from "react";

export default function Home() {
  return (
    <div>
      <nav>
        <h1>Welcome to the Auto create Business Model Campus</h1>
        <ul>
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/persona">Persona</Link></li>
          <li><Link href="/persona-review">Persona Review</Link></li>
          <li><Link href="/interview">Interview</Link></li>
          <li><Link href="/review">Review</Link></li>
          <li><Link href="/create-bmc">Create BMC</Link></li>
        </ul>
      </nav>
    </div>
  );
}