import React from "react";
import { Post as PostType } from "../../../models/types";
import styles from "../../../styles/Post.module.css";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostDetail({ params }: Props) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <div>指定された投稿は削除されています</div>;
  }

  const post: PostType = await res.json();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>{post.created_at}</div>
      <p className={styles.content}>{post.content}</p>
    </div>
  );
}
