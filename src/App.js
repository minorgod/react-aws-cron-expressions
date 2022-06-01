import awsCronParser from 'aws-cron-parser'
import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import classNames from 'classnames/bind'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} type="button">Try again</button>
    </div>
  )
}
const defaultExpression = '30 * * * ? *'

function AppComponent() {
  // first we need to parse the cron expression

  const [state, setState] = useState({
    expression: defaultExpression,
    description: awsCronParser.getScheduleDescription(awsCronParser.parse(defaultExpression)),
    occurrence: new Date(),
    valid: true
  })


  useEffect(() => {
    console.log('state.expression: %o', state.expression.split(' '))
    try {
      if (state.expression.trim()
        .split(' ').length === 6) {
        // Update the document title using the browser API
        const cron = awsCronParser.parse(state.expression)

        // to get the first occurrence from now
        const occurrence = awsCronParser.next(cron, new Date())
        const description = awsCronParser.getScheduleDescription(cron)
        setState({
          ...state,
          occurrence,
          description,
          valid: true
        })
      }
    } catch (e) {
      setState({
        ...state,
        valid: false
      })
      console.warn('state.expression: %o', state.expression.split(' '))
    }

  }, [state.expression])


  return (
    <div className="App">
      <header className="App-header">
        <h1>AWS Cron Expression Parser</h1>
      </header>
      <div className="App-content" style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{
          display: 'flex', flexDirection: 'row', justifyItems: 'space-around', alignItems: 'center', alignContent: 'center'
        }}
        >
          <img src={logo} className="App-logo" alt="logo" style={{width: 200}} />
          <table style={{fontSize: 10}}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Values</th>
                <th>Wildcards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minutes</td>
                <td>0-59</td>
                <td>, - * /</td>
              </tr>
              <tr>
                <td>Hours</td>
                <td>0-23</td>
                <td>, - * /</td>
              </tr>
              <tr>
                <td>Day-of-month</td>
                <td>1-31</td>
                <td>, - * ? / L W</td>
              </tr>
              <tr>
                <td>Month</td>
                <td>1-12 or JAN-DEC</td>
                <td>, - * /</td>
              </tr>
              <tr>
                <td>Day-of-week</td>
                <td>1-7 or SUN-SAT</td>
                <td>, - * ? L #</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>1970-2199</td>
                <td>, - * /</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions" target="_blank" rel="noreferrer">Full Documentation</a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', justifyItems: 'space-around', alignItems: 'center', alignContent: 'center'
        }}
        >
          <div style={{
            display: 'flex', justifyItems: 'space-around', alignItems: 'center', alignContent: 'center'
          }}
          >
            <label htmlFor="expression-source" style={{ fontSize: 12 }}>
              Expression:
              <input
                onChange={event => {
                  if (event.target.value.split(' ').length === 6) {
                    setState({
                      ...state,
                      expression: event.target.value
                    })
                  }
                }}
                value={state.expression}
                type="text"
                id="expression-source"
                size={20}
                style={{
                  padding: 10,
                  fontSize: 24,
                  verticalAlign: 'center',
                  marginLeft: 5
                }}
                className={classNames({ invalid: !state.valid})}
              />
            </label>
          </div>

          <div style={{ fontSize: 14, padding: 8 }}>
            Schedule:&nbsp;
            {state.description}
          </div>

          <div style={{ fontSize: 14, padding: 8 }}>
            Next Run:&nbsp;
            {state.occurrence.toLocaleString('en-US', {
              hour: 'numeric', minute: 'numeric', hour12: true
            })}
          </div>
        </div>
      </div>


    </div>
  )
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <AppComponent />
    </ErrorBoundary>
  )
}

export default App
