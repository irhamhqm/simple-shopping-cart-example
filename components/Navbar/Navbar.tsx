
import styles from './Navbar.module.css';

type NavbarProps = {
  text: string
}

export default function Navbar({ text }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>{text}</div>
    </nav>
  )
}