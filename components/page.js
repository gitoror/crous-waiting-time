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
        <div style={{ padding: "0px 20px 0px 20px" }}>{children}</div>
        <footer align="center" className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} ARTEM Crous Company. Tous droits
            reversés.
          </p>
        </footer>
      </div>
    </>
  );
}
