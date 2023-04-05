import styles from "@/styles/page.module.css";
import Image from "next/image";

export default function Page({ children }) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.pic}>
          <Image
            src="/mesh-img.jpg"
            alt="Mesh"
            fill
            objectFit="cover"
            quality="100"
          />
        </div>
        {children}
        <footer align="center" className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} Tom Marini. Tous droits reversés.
          </p>
        </footer>
      </div>
    </>
  );
}
