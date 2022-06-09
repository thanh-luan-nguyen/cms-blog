import { request, gql } from 'graphql-request'

// làm thế này để solve lỗi undefined|string cannot be assigned to string
let graphqlAPI: string
if (process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) {
  graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
} else {
  throw new Error('GraphQL API endpoint not defined')
}

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const results = await request(graphqlAPI, query)
  return results.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last:3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          AND: { slug_not: $slug, categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)
  return result.categories
}
