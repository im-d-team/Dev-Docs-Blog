import * as React from "react";
import {useStaticQuery, graphql, Link} from "gatsby";

export default function IndexPage() {
  const data = useStaticQuery(
    graphql`
        query PostListQuery {
            allMdx(sort: {order: ASC, fields: frontmatter___date}) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            tags
                            date(fromNow: true)
                            path
                            category
                        }
                        excerpt(pruneLength: 150, truncate: true)
                        timeToRead
                    }
                }
                totalCount
            }
        }
    `
  );

  console.log(data.allMdx)

  return (
    <div>
      total: {data.allMdx.totalCount}

      {
        data.allMdx.edges.map(({node}) => {
          return <Link key={data.allMdx.id} to={node.frontmatter.path}><div>{node.frontmatter.title}</div></Link>
        })
      }
    </div>
  );
}
