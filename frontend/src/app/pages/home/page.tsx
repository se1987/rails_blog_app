"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/Home.module.css";
import { Post } from "../../models/types";
import axios from "axios";

type HomeProps = {
  posts: Post[];
};

export default function HomeClient({ posts }: HomeProps) {
  const router = useRouter();

  // 更新ボタンの処理
  const handleUpdate = (post: Post) => {
    router.push(`/pages/posts/edit-post/${post.id}`);
  };

  // 削除ボタンの処理
  const handleDelete = async (id: Post["id"]) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${id}`);
      router.refresh(); // reload()より効率的な方法
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました");
    }
  };

  return (
    <div>
      <main>
        <div className={styles.homeContainer}>
          <h1>Rails & Next.js Blog</h1>
          <Link href="/pages/posts/create-post" className={styles.createButton}>
            Create new Post
          </Link>

          <div>
            {posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <Link
                  href={`/pages/posts/detail/${post.id}`}
                  className={styles.postCardBox}
                >
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.content}</p>
                <button
                  className={styles.editButton}
                  onClick={() => handleUpdate(post)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
