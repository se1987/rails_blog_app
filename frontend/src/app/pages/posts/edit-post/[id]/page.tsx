"use client";

import React, { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../../../../styles/Home.module.css";
import { Post as PostType } from "../../../../models/types";
import { useRouter } from "next/navigation";

type EditPostProps = {
  params: Promise<{ id: string }>; // URLパラメータから `id` を取得しPromiseとして定義
};

const EditPost = ({ params }: EditPostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // 画像ファイルを保持
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null); // 現在の画像URL
  const [id, setId] = useState<string | null>(null); // 解決済みのIDを保存
  const router = useRouter();

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params; // params を解決
      setId(resolvedParams.id);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
      const post: PostType = await res.json();
      setTitle(post.title);
      setContent(post.content);
      setCurrentImageUrl(post.image_url || null);
    };
    fetchPost();
  }, [id]);

  // 更新ボタンの処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      await axios.put(`http://localhost:3001/api/v1/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // マルチパート形式で送信
        },
      });
      router.push("/");
    } catch (err) {
      console.error("エラーが発生しました:", err);
      alert("編集に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h1>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="タイトルを入力してください"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label className={styles.label}>現在の画像:</label>
        {currentImageUrl ? (
          <div>
            <Image
              src={currentImageUrl}
              alt={title}
              width={300} // 適切な幅を指定
              height={300} // 適切な高さを指定
            />
          </div>
        ) : (
          <p>画像は設定されていません。</p>
        )}
        <div>
          <label className={styles.label}>画像を変更:</label>
          <input
            id="image"
            placeholder="画像を選択してください"
            type="file"
            className={styles.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <label className={styles.label}>本文</label>
        <textarea
          id="content"
          value={content}
          placeholder="本文を入力してください"
          className={styles.textarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <button className={styles.button} type="submit">
          編集
        </button>
      </form>
    </div>
  );
};

export default EditPost;
