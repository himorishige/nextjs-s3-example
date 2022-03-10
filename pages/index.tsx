import type { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  // 画像をアップロードする関数
  const uploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // フォームに登録された画像名をAPIへ送信
      const file = e.target.files[0];
      const filename = encodeURIComponent(file.name);
      const res = await fetch(`/api/upload?file=${filename}`);

      // APIから署名付きURLを受け取る
      const { url, fields }: { url: string; fields: Record<string, unknown> } =
        await res.json();

      // APIから受け取ったURLへフォームに登録された画像ファイルを送信する
      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (upload.ok) {
        alert('Uploaded successfully!');
      } else {
        console.error('Upload failed.');
      }
      e.target.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.link}>
        <Link href="/">Top</Link>
        <Link href="/get">PreSigned Path</Link>
        <Link href="/image">API Path</Link>
      </nav>
      <h1>Upload a .png or .jpg image (max 1MB)</h1>
      <p>
        <input
          onChange={uploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
        />
      </p>
    </div>
  );
};

export default Home;
