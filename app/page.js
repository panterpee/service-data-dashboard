import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className='align-center'>
      <h1>Welcome to SBnext service data.</h1>
      <Link href="/login">
        <button>Go to login page</button>
      </Link>
    </div>
  );
}