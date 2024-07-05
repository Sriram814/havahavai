import {Component} from 'react'
import Loader from 'react-loader-spinner'
import WatchContext from '../../context/WatchContext'
import './index.css'

import {
  TrendingBodyContainer,
  TrendingVideosContainer,
  NoSearchResultsContainer,
  NotFoundImage,
  NotFoundHead,
  NotFoundText,
  NotFoundButton,
  LoaderContainer,
} from './styledComponents'
import Header from '../Header'
import SideBar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    todosList: [
      {
        id: 1,
        title: 'All Airports',
        country: 'Country',
        code: 'Code',
        terminals: 'Terminals',
      },
      {
        id: 2,
        title: 'Indhira Gandhi International Airport',
        country: 'India',
        code: 'DEL',
        terminals: '3',
      },
      {
        id: 3,
        title: 'Dubai International Airport',
        country: 'UAE',
        code: 'DXB',
        terminals: '5',
      },
      {
        id: 4,
        title: 'Heathrow Airport',
        country: 'England',
        code: 'LHR',
        terminals: '6',
      },
      {
        id: 5,
        title: 'Istanbul Airport',
        country: 'Turkey',
        code: 'IST',
        terminals: '3',
      },
      {
        id: 6,
        title: 'Rajiv Gandhi International Airport',
        country: 'Texas',
        code: 'DFW',
        terminals: '14',
      },
    ],
    newTodoTitle: '',
    newTodoCount: 1,
  }

  handleAddTodo = () => {
    const {newTodoTitle, newTodoCount} = this.state
    const newTodos = Array.from({length: newTodoCount}, (_, i) => ({
      id: Date.now() + i,
      title: newTodoTitle,
      completed: false,
    }))
    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      newTodoTitle: '',
      newTodoCount: 1,
    }))
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedTodoList})
  }

  toggleComplete = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  renderTrendingVideos = () => {
    const {newTodoTitle} = this.state
    return (
      <div className="container">
        <div className="inner-container">
          <div className="add-todo">
            <button className="btn" onClick={this.handleAddTodo} type="button">
              + Add new{newTodoTitle}
            </button>
          </div>
          <div className="content">
            <div className="content-header">Airports</div>
            <div className="content-table">
              <div className="content-column">
                <div className="content-column-title">All Airports</div>
                <div className="content-column-item">
                  Indra Gandhi International Airport
                </div>
                <div className="content-column-item">
                  Dubai International Airport
                </div>
                <div className="content-column-item">Heathrow Airport</div>
                <div className="content-column-item">Istanbul Airport</div>
                <div className="content-column-item">
                  Rajiv Gandhi International Airport
                </div>
              </div>
              <div className="content-column">
                <div className="content-column-title">Country</div>
                <div className="content-column-item">India</div>
                <div className="content-column-item">UAE</div>
                <div className="content-column-item">England</div>
                <div className="content-column-item">Turkey</div>
                <div className="content-column-item">Texas</div>
              </div>
              <div className="content-column">
                <div className="content-column-title">Code</div>
                <div className="content-column-item">DEL</div>
                <div className="content-column-item">DXB</div>
                <div className="content-column-item">LHR</div>
                <div className="content-column-item">IST</div>
                <div className="content-column-item">DFW</div>
              </div>
              <div className="content-column">
                <div className="content-column-title">Terminals</div>
                <div className="content-column-item">3</div>
                <div className="content-column-item">5</div>
                <div className="content-column-item">5</div>
                <div className="content-column-item">5</div>
                <div className="content-column-item">5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <NoSearchResultsContainer>
            <NotFoundImage
              src={
                darkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
            />
            <NotFoundHead darkTheme={darkTheme}>
              Oops! Something Went Wrong
            </NotFoundHead>
            <NotFoundText>
              We are having some trouble to complete your request. Please try
              again
            </NotFoundText>
            <NotFoundButton type="button" onClick={this.onClickFailureRetry}>
              Retry
            </NotFoundButton>
          </NoSearchResultsContainer>
        )
      }}
    </WatchContext.Consumer>
  )

  renderActiveTab = () => {
    const {activeTab} = this.state

    switch (activeTab) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <>
              <Header />
              <TrendingBodyContainer>
                <SideBar />
                <TrendingVideosContainer
                  darkTheme={darkTheme}
                  data-testid="trending"
                >
                  {this.renderTrendingVideos()}
                </TrendingVideosContainer>
              </TrendingBodyContainer>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Trending
