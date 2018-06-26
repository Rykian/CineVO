// @flow
import React from 'react'
import { graphql, commitMutation } from 'react-relay'
import { Segment, Header, Form, Message } from 'semantic-ui-react'
import classnames from 'classnames'
import environment from '../graphql'
import $ from './hero.css'

type State = { email: string, inProgress: boolean, success: ?boolean }

const mutation = graphql`
  mutation heroMutation($email: String!) {
    subscribe(email: $email)
  }
`

export class Hero extends React.Component<{}, State> {
  constructor() {
    super()
    this.state = { email: '', inProgress: false, success: null }
  }

  updateEmail = ({ target }: Event) => {
    if (target instanceof HTMLInputElement) {
      this.setState({ email: target.value, success: null })
    }
  }

  submit = () => {
    this.setState({ inProgress: true })
    commitMutation(environment, {
      mutation,
      variables: { email: this.state.email },
      onCompleted: (response, error) => {
        if (error) console.log(error)
        this.setState({
          inProgress: false,
          success: response.subscribe,
          email: '',
        })
      },
    })
  }

  render = () => (
    <Segment
      className={classnames('basic', $.root)}
      color="red"
      textAlign="center"
    >
      <Header as="h1">CineVO</Header>
      <p>
        Pour être tenu au courant des prochains films en VO par email au
        Cinéville de Laval, inscrivez vous ici
      </p>

      <Form
        className={$.form}
        onSubmit={this.submit}
        error={this.state.success === false}
      >
        <Form.Input
          inline
          type="email"
          placeholder="Adresse email"
          onInput={this.updateEmail}
          value={this.state.email}
          error={this.state.success === false}
        />
        <Form.Button primary disabled={this.state.inProgress}>
          S&apos;inscrire
        </Form.Button>
      </Form>
      {this.state.success === false && (
        <Message
          error
          content="Votre email est déjà présent dans notre base de donnée"
        />
      )}
      {this.state.success === true && (
        <Message
          success
          content="Vous êtes désormais inscrit à la newsletter. Félicitations !"
        />
      )}
    </Segment>
  )
}
