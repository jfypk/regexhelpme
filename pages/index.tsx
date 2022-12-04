import Head from 'next/head';
import Image from 'next/image';

import { useState, FormEvent } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [regex, setRegex] = useState('');
  const [result, setResult] = useState();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ regex: regex }),
    })

    const data = await response.json();
    setResult(data.result);
    setRegex('');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Regex, Help me!</title>
        <meta name="description" content="A GPT-powered regex tutor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ugh regex... help me!
        </h1>

        <h2>
          I'm your friendly regex tutor. I'll help translate regex into plain English and show you how to write your expression in non-regex code.
        </h2>

        <div className={styles.grid}>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="regex"
              name="regex"
              placeholder="Enter your regex here"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className={styles.result}>
          result:
          {result}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
