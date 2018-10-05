import Link from "next/link";
import { linkResolver, PRISMIC, NEXT } from "../helpers";

const Posts = (props) => (
    <ul>
      {props.posts.map((post, index) => (
        <li key={index}>
          <Link
            as={linkResolver(post, PRISMIC)}
            href={linkResolver(post, NEXT)}
            passHref
          >
            <a>{post.data.title[0].text}</a>
          </Link>
        </li>
      ))}
    </ul>
);

export default Posts;
