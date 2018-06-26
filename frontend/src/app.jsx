// @flow
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { graphql, QueryRenderer } from 'react-relay'
import 'semantic-ui-css/semantic.min.css'
import { Container, Segment, Card } from 'semantic-ui-react'
import environment from './graphql'
import type { appQueryResponse } from './__generated__/appQuery.graphql'
import { Movie } from './components/movie'
import { Hero } from './components/hero'
import Unsubscribe from './components/unsubscribe'

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
      {props.movies.length < 1 ? (
        <div>Pas de films cette semaine, revenez mercredi prochain !</div>
      ) : (
        <Card.Group itemsPerRow={2}>
          {props.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
        </Card.Group>
      )}
    </div>
  )
}

export const App = () => (
  <Router>
    <React.Fragment>
      <Route exact path="/unsubscribe/:id" component={Unsubscribe} />
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
    </React.Fragment>
  </Router>
)
