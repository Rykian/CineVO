// @flow
import { h } from 'preact'
import { graphql, QueryRenderer } from 'react-relay'
import 'semantic-ui-css/semantic.min.css'
import { Container, Segment, Card } from 'semantic-ui-react'
import environment from './graphql'
import type { appQueryResponse } from './__generated__/appQuery.graphql'
import { Movie } from './components/movie'
import { Hero } from './components/hero'

type Render = { error: ?Error, props: ?appQueryResponse }

const movieListQuery = graphql`
query appQuery {
  movies {
    id
    title
    plot
    runtime
    actors
    directors
    poster {
      thumb
    }
    screenings {
      date
    }
    user_ratings
    press_ratings
  }
}
`

const MovieList = ({ error, props }: Render) => {
  if (error) return <div>Error!</div>
  if (!props) return <div className="ui loader">Loading...</div>

  return (
    <div>
      <h1>Liste des films</h1>
      <Card.Group itemsPerRow={2}>
        {props.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </Card.Group>
    </div>
  )
}

export const App = () => (
  <Container>
    <Hero />
    <Segment className="basic">
      <QueryRenderer
        environment={environment}
        query={movieListQuery}
        variables={{}}
        render={MovieList}
      />
    </Segment>
  </Container>
)
