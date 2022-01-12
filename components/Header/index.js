import Link from "next/link";
import styles from "./Header.module.css";
import { useSession, signOut} from "next-auth/client";

const Header = () => {
  const [session, loading] = useSession();
 
  const logoutHandler = () =>{
    signOut();
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <div className={styles.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
