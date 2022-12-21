import Header from '../../components/header';
import { getAllPosts } from '../../lib/api';
import Head from 'next/head';
import type PostType from '../../interfaces/post';
import style from '../../styles/blog.module.css';
import poststyle from '../../styles/blogpost.module.css';
import PostPreview from '../../components/post-preview';
import { useState } from 'react';
import MobileMenu from '../../components/mobile-menu';

type Props = {
  allPosts: [PostType];
};

export default function Blog({ allPosts }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  return (
    <>
      <Header />
      <Head>
        <title>Blog | joinemm.dev</title>
      </Head>
      <article className={style.main}>
        <h1 className={style.maintitle}>Blog.</h1>
        <ul className={poststyle.tags}>
          {allPosts
            .map((post) => post.tags)
            .flat(1)
            .map((tag) => (
              <li key={tag}>
                <a
                  className={`${poststyle.tagButton} ${
                    activeTags.includes(tag) ? poststyle.active : ''
                  }`}
                  onClick={() => {
                    if (activeTags.includes(tag)) {
                      setActiveTags(activeTags.filter((t) => t != tag));
                    } else {
                      setActiveTags(activeTags.concat(tag));
                    }
                  }}
                >
                  #{tag}
                </a>
              </li>
            ))}
        </ul>
        {allPosts
          .filter(
            (post) => activeTags.length == 0 || activeTags.every((t) => post.tags.includes(t)),
          )
          .map((post) => (
            <PostPreview post={post} key={post.slug} />
          ))}
      </article>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'excerpt', 'tags']);

  return {
    props: { allPosts },
  };
};
