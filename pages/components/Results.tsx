import Head from 'next/head';

import { useState, FormEvent } from 'react';

import styles from '../../styles/Home.module.css';
import { ResultsProps } from '../data';

export default function Results(props: ResultsProps) {
  const Message = () => {
    if (props.error) {
      return (
        <>{props.error}</>
      );
    } else if(props.engRequested) {
      return (
        <>{props.result}</>
      );
    } else {
      return (<>
        <p className='result'>I have found the following regex that might be helpful:</p>
        <div className={styles.code}>{props.result}</div>
      </>
    )}
  }

  return (
    <div className={styles.result}>
      {props.resultFound && <Message />}
    </div>
  )
}
