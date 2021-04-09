import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers'
import { fetchTodos, deleteTodo, Todo } from '../actions'

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)
    this.state = { fetching: false }
  }

  componentDidUpdate(prevProps: AppProps) {
    if(!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true })
  }

  onTodoClick = (id: number):void => {
    this.props.deleteTodo(id);
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div 
          key={todo.title}
          onClick={() => {this.onTodoClick(todo.id)}}
        >
          {todo.title}
        </div>
      )
    })
  }
  
  render() {
    return (
      <>
      <button onClick={this.onButtonClick}>fetch</button>
      {this.state.fetching && <div>loading</div>}
      <div>{this.renderList()}</div>
      </>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState) => {
  return { todos }
}

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App)

