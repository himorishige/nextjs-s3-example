import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [image, setImage] = useState('');
  const getImage = async (filename: string): Promise<string> => {
    const res = await fetch(`/api/get?file=${filename}`);
    const data = await res.json();
    return data.src;
  };

  useEffect(() => {
    (async () => setImage(await getImage('rn.png')))();
  }, []);

  if (!image) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <nav className={styles.link}>
        <Link href="/">Top</Link>
        <Link href="/get">PreSigned Path</Link>
        <Link href="/image">API Path</Link>
      </nav>
      <h1>Get Image</h1>
      <img src={image} alt="" width={300} height={300} />
    </div>
  );
};

export default Home;
