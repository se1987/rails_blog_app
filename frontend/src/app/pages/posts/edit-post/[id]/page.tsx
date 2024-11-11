"use client";

import React, { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
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
    };
    fetchPost();
  }, [id]);

  // 更新ボタンの処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/v1/posts/${id}`, {
        title: title,
        content: content,
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
