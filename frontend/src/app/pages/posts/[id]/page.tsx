import React from "react";
import { Post as PostType } from "../../../models/types";

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
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
