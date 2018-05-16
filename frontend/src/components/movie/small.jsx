// @flow
import { h } from 'preact'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { Card } from 'semantic-ui-react'
import type { appQueryResponse } from '../../__generated__/appQuery.graphql'

type Movies = $PropertyType<appQueryResponse, 'movies'>
type Props = {
  movie: $ElementType<Movies, number>
}

export const Movie = ({ movie }: Props) => (
  <Card>
    <Card.Content>
      <Card.Header>{movie.title}</Card.Header>
      <Card.Meta>
        Durée : {movie.runtime} minutes
      </Card.Meta>
      <Card.Description>
        <p>De {movie.directors.join(', ')}</p>
        <p>Avec {movie.actors.join(', ')}</p>

        <blockquote>{movie.plot}</blockquote>
      </Card.Description>
    </Card.Content>
    {!!movie.screenings &&
      <Card.Content extra>
        <ul>
          {movie.screenings.map(screening => (
            <li>{format(screening.date, 'ddd D MMMM, HH:MM', { locale: frLocale })}</li>
          ))}
        </ul>
      </Card.Content>
    }
  </Card>
)
