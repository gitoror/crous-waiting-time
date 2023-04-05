import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiArrowUpRight } from "react-icons/fi";
import { GiClockwork } from "react-icons/gi";

function LinkItem({ href, path, children }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={router.asPath === href ? styles.link_active : ""}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <h1 className={styles.logo}>
            <Link href="/">
              <span>
                <GiClockwork size={40} />
                <p>Crous WT</p>
              </span>
            </Link>
          </h1>
          <ul>
            <li>
              <LinkItem href="/apropos">À propos</LinkItem>
            </li>
            <li className={styles.faq}>
              <LinkItem href="/faq">
                FAQ
                <FiArrowUpRight
                  size={23}
                  style={{
                    "padding-left": "3px",
                    "padding-top": "auto",
                    "padding-bottom": "auto",
                  }}
                />
              </LinkItem>
            </li>
          </ul>
          <div className={styles.github}>
            <a href="" target="_blank">
              <span>
                <Image
                  src="/github-mark.png"
                  alt="Logo"
                  width={18}
                  height={18}
                />
                <p>Source</p>
              </span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
