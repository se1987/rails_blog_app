"use client";

import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);
    if (image) {
      formData.append("post[image]", image);
    }

    try {
      await axios.post("http://localhost:3001/api/v1/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
    } catch (err) {
      console.error("エラーが発生しました:", err);
      alert("投稿に失敗しました");
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
        <div>
          <label className={styles.label}>画像:</label>
          <input
            id="image"
            placeholder="画像を選択してください"
            type="file"
            className={styles.input}
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
