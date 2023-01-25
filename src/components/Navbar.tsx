import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      ) : (
        <Link href='/login'>Sign In</Link>
      )}
    </nav>
  );
};

export default Navbar;
