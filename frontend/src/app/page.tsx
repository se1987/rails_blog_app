import Link from "next/link";
import styles from "./styles/Home.module.css";
import { Post } from "./models/types";

export default async function Home() {
  const res = await fetch("http://localhost:3001/api/v1/posts", {
    next: { revalidate: 60 * 60 * 24 }, // ISRの代替オプション
  });
  const posts = await res.json();

  console.log(posts);

  return (
    <div>
      <main>
        <div className={styles.homeContainer}>
          <h1>Rails & Next.js Blog</h1>
          <Link href="/create-post" className={styles.createButton}>
            Create new Post
          </Link>

          <div>
            {posts.map((post: Post) => (
              <div key={post.id} className={styles.postCard}>
                <Link
                  href={`pages/posts/${post.id}`}
                  className={styles.postCardBox}
                >
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.content}</p>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
