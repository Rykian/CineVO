// @flow
import React from 'react'
import { graphql, commitMutation } from 'react-relay'
import { Confirm } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import environment from '../graphql'

const mutation = graphql`
  mutation unsubscribeMutation($id: ID!) {
    unsubscribe(id: $id)
  }
`

const unsubscribe = (id: string, history: History) =>
  commitMutation(environment, {
    mutation,
    variables: { id },
    onCompleted: () => {
      history.push('/')
    },
  })

export default withRouter(({ history, match }) => (
  <Confirm
    open
    content="Êtes-vous sûr de vouloir vous désinscrire ?"
    cancelButton="Non"
    confirmButton="Oui"
    style={{
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    onCancel={() => history.push('/')}
    onConfirm={() => unsubscribe(match.params.id, history)}
  />
))
