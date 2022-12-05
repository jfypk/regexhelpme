import Head from 'next/head';

import { useState, FormEvent } from 'react';

import styles from '../styles/Home.module.css';
import Header from './components/Header';
import Query from './components/Query';
import Results from './components/Results';
import { EventProps } from './data';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [engRequested, setEngRequested] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setEngRequested(false);
    setResultFound(false);
    setResult('');

    const nativeEvent = e.nativeEvent as EventProps;
    const action = nativeEvent.submitter.value;
    if(action === 'To English') {
      setEngRequested(true);
    } else {
      setEngRequested(false);
    }

    await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: input,
        action: action,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setResult(data.result)
        setResultFound(true)
      })
      .catch((err) => {
        setLoading(false)
        setResultFound(true)
        setError(err.message);
      })

  }

  return (
    <main className={styles.container}>
      <Head>
        <title>Regex-help me! - translate regex into English</title>
        <meta name="description" content="Regex Help Me is a GPT-powered regex AI tool to translate regex from plain English and vice versa." />
        <meta name="title" content="Regex, Help me! - translate regex into English" />
        <meta name='url' content='https://regexhelp.me' />
        <meta name='site_name' content='Regex - help me!' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.query}>
        <Query
          onSubmit={onSubmit}
          input={input}
          setInput={setInput}
          loading={loading}
        />
      </div>

      <div className={styles.results}>
        {!loading && (
          <Results
            engRequested ={engRequested}
            resultFound={resultFound}
            result={result}
            error={error}
          />
        )}
      </div>

      <footer className={styles.footer}>
          Disclaimer: This AI is powered by <a href="https://openai.com/" target="_blank" rel="noreferrer noopener">OpenAI</a>. 
          It is not perfect, and it is subject to return surprising results. Use at your own risk.
      </footer>
    </main>
  )
}
