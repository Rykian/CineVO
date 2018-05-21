// @flow
import React from 'react'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { Card, Image, Icon, Rating } from 'semantic-ui-react'
import type { appQueryResponse } from '../__generated__/appQuery.graphql'

type Movies = $PropertyType<appQueryResponse, 'movies'>
type MovieProps = {
  movie: $ElementType<Movies, number>,
}

type ScreeningsProps = {
  screenings: $PropertyType<$PropertyType<MovieProps, 'movie'>, 'screenings'>,
}

const Screenings = ({ screenings }: ScreeningsProps) => {
  if (!screenings) return null

  const byDays = screenings.reduce((acc, curr) => {
    const day = format(curr.date, 'YYYY-MM-DD')
    acc[day] = acc[day] || []
    acc[day].push(curr.date)

    return acc
  }, {})

  const days = Object.keys(byDays)

  return (
    <table>
      <thead>
        <tr>
          {days.map(d => (
            <th key={d}>{format(d, 'ddd D MMM', { locale: frLocale })}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{ textAlign: 'center' }}>
        <tr>
          {days.map(d => (
            <td key={d}>
              <div className="ui list">
                {byDays[d].map(hours => (
                  <div key={hours} className="item center">{format(hours, 'HH:MM')}</div>
                ))}
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export const Movie = ({ movie }: MovieProps) => (
  <Card>
    <Card.Content>
      <Card.Header>{movie.title}</Card.Header>
      <Card.Meta>
        <Icon name="clock" /> {movie.runtime} minutes
        {' • '}
        <span title="Réalisateur(s)">
          <Icon name="video" /> {movie.directors.join(', ')}
        </span>
        {' • '}
        <span title="Acteur(s)">
          <Icon name="users" /> {movie.actors.join(', ')}
        </span>
      </Card.Meta>
      <Card.Description>
        <Image floated="left" rounded size="small" src={movie.poster.thumb} />
        <div>
          Presse :{' '}
          <Rating
            icon="star"
            maxRating="5"
            defaultRating={movie.press_ratings}
          />
          {' '}• Spectateurs :{' '}
          <Rating
            icon="star"
            maxRating="5"
            defaultRating={movie.user_ratings}
          />
        </div>
        <p>{movie.plot}</p>
      </Card.Description>
    </Card.Content>
    {!!movie.screenings && (
      <Card.Content extra>
        <Screenings screenings={movie.screenings} />
      </Card.Content>
    )}
  </Card>
)
