import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [input, setInput] = useState('rn.png');
  const [image, setImage] = useState('rn.png');
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const imageHandler = () => {
    setImage(input);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.link}>
        <Link href="/">Top</Link>
        <Link href="/get">PreSigned Path</Link>
        <Link href="/image">API Path</Link>
      </nav>
      <h1>Get Image</h1>
      <div>
        <input type="text" value={input} onChange={inputHandler} />
        <button type="button" onClick={imageHandler}>
          button
        </button>
      </div>
      <Image src={`/api/image?file=${image}`} alt="" width={300} height={300} />
    </div>
  );
};

export default Home;
