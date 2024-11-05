import React from "react";
import { Post } from "../../models/types";

type Props = {
  post: Post;
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const post = await res.json();

  console.log(post);

  return {
    props: {
      post,
    },

    revalidate: 60,
  };
}

const Post = (post: Props) => {
  return <div>詳細ページです</div>;
};

export default Post;
