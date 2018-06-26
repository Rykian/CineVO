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
                  <div key={hours} className="item center">
                    {format(hours, 'HH:MM')}
                  </div>
                ))}
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

const Rate = (props: { who: string, rating: number }) => (
  <React.Fragment>
    {props.who} :{' '}
    <Rating icon="star" maxRating="5" defaultRating={props.rating} disabled />
  </React.Fragment>
)

const Ratings = (props: { user_ratings: ?number, press_ratings: ?number }) => (
  <div>
    {props.user_ratings && (
      <Rate who="Spectateur" rating={props.user_ratings} />
    )}
    {props.user_ratings && props.press_ratings && ' • '}
    {props.press_ratings && <Rate who="Presse" rating={props.press_ratings} />}
  </div>
)

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
        <Ratings {...movie} />
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
