import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTime: false,
      minutes: 25,
      seconds: 0,
    }
    this.timerInterval = null
  }

  componentWillUnmount() {
    this.clearInterval = clearInterval(this.timerInterval)
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      const {minutes, seconds} = this.state

      if (minutes !== 0 || seconds !== 0) {
        console.log('Timer is running...')

        if (seconds === 0) {
          this.setState(prevState => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }))
        } else {
          this.setState(prevState => ({
            seconds: prevState.seconds - 1,
          }))
        }
      } else {
        clearInterval(this.timerInterval)

        console.log('Timer has reached 00:00')
      }
    }, 1000)
  }

  updateStart = () => {
    this.setState(prev => {
      const {showTime} = prev
      return {
        showTime: !showTime,
      }
    })
    this.callingTime()
  }

  callingTime = () => {
    const {showTime} = this.state
    if (showTime !== true) {
      this.startTimer()
    } else {
      clearInterval(this.timerInterval)
    }
  }

  decrementTime = () => {
    const {showTime} = this.state
    if (showTime === false) {
      this.setState(prev => ({minutes: prev.minutes - 1}))
    }
  }

  incrementTime = () => {
    const {showTime} = this.state
    if (showTime === false) {
      this.setState(prev => ({minutes: prev.minutes + 1}))
    }
  }

  resetButton = () => {
    this.setState({minutes: 25, seconds: 0})
    clearInterval(this.timerInterval)
  }

  // eslint-disable-next-line class-methods-use-this

  render() {
    const {showTime, minutes, seconds} = this.state
    const Time = `${minutes}:${seconds > 10 ? seconds : `0${seconds}`}`
    return (
      <div className="main-cont">
        <div className="content-cont">
          <h1>Digital Timer</h1>
          <div className="timer-container">
            <div className="timer-box">
              <div className="inside-timer">
                <h1 className="timer-watch">{Time}</h1>
                <p className="state-time">{showTime ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div>
              <div className="buttons-cont">
                {showTime ? (
                  <button
                    type="button"
                    className="buttons-s-r"
                    onClick={this.updateStart}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                      alt="pause icon"
                      className="timer-icons"
                    />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="buttons-s-r"
                    onClick={this.updateStart}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="timer-icons"
                    />
                    <span>Start</span>
                  </button>
                )}

                <button
                  type="button"
                  className="buttons-s-r"
                  onClick={this.resetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="timer-icons"
                  />
                  <span>Reset</span>
                </button>
              </div>
              <div>
                <p className="set-timer">set timer limit</p>
                <div className="last-box">
                  <button
                    type="button"
                    className="operators"
                    onClick={this.decrementTime}
                  >
                    -
                  </button>
                  <p className="count">{minutes}</p>
                  <button
                    type="button"
                    className="operators"
                    onClick={this.incrementTime}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
