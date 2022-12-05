import styles from '../../styles/Home.module.css';

export default function Header() {
  return (
    <>
      <h1 className={styles.title}>
        Ugh regex... help me! 😕
      </h1>
      <div className={styles.description}>
        <span>This AI translates your regex into plain English and vice versa.</span>
      </div>
    </>
  )
}
