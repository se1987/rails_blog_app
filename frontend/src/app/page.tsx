import HomeClient from "./pages/home/page";

export default async function Home() {
  const res = await fetch("http://localhost:3001/api/v1/posts", {
    next: { revalidate: 60 * 60 * 24 }, // ISRの代替オプション
  });
  const posts = await res.json();

  return <HomeClient posts={posts} />;
}
