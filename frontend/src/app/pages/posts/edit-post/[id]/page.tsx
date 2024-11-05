"use client";

import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
// import { Post as PostType } from "../../../models/types";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/navigation";

export async function EditPost(context: any) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
  const post = await res.json();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/api/v1/posts", {
        title: title,
        content: content,
      });
      router.push("/");
    } catch (err) {
      alert("編集に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h1>ブログ新規投稿</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
          type="text"
          id="title"
          placeholder="タイトルを入力してください"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label className={styles.label}>本文</label>
        <textarea
          id="content"
          placeholder="本文を入力してください"
          className={styles.textarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
