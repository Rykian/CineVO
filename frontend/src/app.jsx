// @flow
import { h } from 'preact'
import { graphql, QueryRenderer } from 'react-relay'
import 'semantic-ui-css/semantic.min.css'
import { Container, Card } from 'semantic-ui-react'
import environment from './graphql'
import type { appQueryResponse } from './__generated__/appQuery.graphql'
import { Movie } from './components/movie/small'

type Render = { error: ?Error, props: ?appQueryResponse }

export const App = () => (
  <Container>
    <QueryRenderer
      environment={environment}
      query={graphql`
        query appQuery {
          movies {
            id
            title
            plot
            runtime
            actors
            directors
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
            <Card.Group itemsPerRow={2}>
              {props.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
            </Card.Group>
          </div>
        )
      }}
    />
  </Container>
)
