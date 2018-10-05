import Link from "next/link";
import { getHomePageAPI, getBlogPostsAPI } from "../api";
import { linkResolver, PRISMIC, NEXT } from "../helpers";
import DefaultLayout from "../layouts";
import Posts from "../components/posts";

const Index = ({ home, posts = [] }) => (
  <DefaultLayout>
    <h1>{home.data.title[0].text}</h1>

    <Posts posts={posts} />
  </DefaultLayout>
);

Index.getInitialProps = async () => {
  const homePageResponse = await getHomePageAPI();
  const blogPostsResponse = await getBlogPostsAPI({ pageSize: 5 });

  return {
    home: homePageResponse,
    posts: blogPostsResponse.results
  };
};

export default Index;
