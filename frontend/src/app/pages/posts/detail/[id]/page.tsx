import React from "react";
import Image from "next/image";
import { Post as PostType } from "../../../../models/types";
import styles from "../../../../styles/Post.module.css";

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
  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>{post.created_at}</div>
      {post.image_url && (
        <Image
          src={post.image_url}
          alt={post.title}
          width={550} // 適切な幅を指定
          height={450} // 適切な高さを指定
        />
      )}
      <p className={styles.content}>{post.content}</p>
    </div>
  );
}
