// @flow
import { h } from 'preact'
import { graphql, QueryRenderer } from 'react-relay'
import environment from './graphql'
import type { appQueryResponse } from './__generated__/appQuery.graphql'

type Render = { error: ?Error, props: ?appQueryResponse }

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
      }
    `}
    variables={{}}
    render={({ error, props }: Render) => {
      if (error) return <div>Error!</div>
      if (!props) return <div>Loading...</div>

      return (
        <div>
          <h1>Liste des films</h1>
          <ul>
            {props.movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
          </ul>
        </div>
      )
    }}
  />
)
