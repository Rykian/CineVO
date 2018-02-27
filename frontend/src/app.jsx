import { h } from 'preact'
import { graphql, QueryRenderer } from 'react-relay'
import environment from './graphql'

type Render = { error: Boolean, props: { movies: Array<Movie> }}

export const App = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
    query appQuery {
      movies {
        id
        title
        screenings {
          date
        }
      }
    }`}
    render={({ error, props }: Render) => {
      if (error) return <div>Error!</div>
      if (!props) return <div>Loading...</div>

      return <div>Movie count: {props.movies.length}</div>
    }}
  />
)
