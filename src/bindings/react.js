import { createElement, Component } from 'react'

export const connect = (store, mapStateToProps, mapDispatchToProps) => {
  return WrappedComponent => {
    return class extends Component {
      constructor() {
        super()
        this.connection = null
        this.handleUpdate = this.handleUpdate.bind(this)
        this.state = {
          ...store.getState(mapStateToProps),
          ...store.getActions(mapDispatchToProps)
        }
      }
      componentDidMount() {
        this.connection = store.connect(mapStateToProps, mapDispatchToProps)(
          this.handleUpdate
        )
      }
      handleUpdate(state) {
        this.setState({ ...state })
      }

      componentWillUnmount() {
        this.connection && this.connection.dispose()
      }
      render() {
        return createElement(WrappedComponent, this.state)
      }
    }
  }
}