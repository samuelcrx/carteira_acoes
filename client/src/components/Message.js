import React, { Component } from 'react'
import { connect } from 'react-redux'
import { messageActions } from '../redux/actions'
import Snackbar from '@material-ui/core/Snackbar'

class Message extends Component {
  render() {
    const { message, clearMessage, messageDuration = 5000, anchorOrigin = {} } = this.props
    const { vertical = 'top' } = anchorOrigin
    const { horizontal = 'right' } = anchorOrigin
    clearTimeout(window.manoleMessage)
    window.manoleMessage = setTimeout(() => {
      clearMessage()
    }, messageDuration)
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={!!message}
        onClose={() => {}}
        ContentProps={{
          'aria-describedby': 'snack-bar-message'
        }}
        message={<span id="snack-bar-message">{message}</span>}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.message.message,
    messageDuration: state.message.messageDuration,
    anchorOrigin: state.message.anchorOrigin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => {
      dispatch(messageActions.clearMessage())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)