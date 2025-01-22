import { useSelector, useDispatch} from 'react-redux'

function App() {

  const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      hello world
      <div>
        <h1> counter: {count}</h1>
        <button onClick={() => { dispatch({ type: 'COUNTER_INCREMENT' }) }}>Increment</button>
        <button onClick={() => { dispatch({ type: 'COUNTER_DECREMENT' }) }}>Decrement</button>
      </div>
    </div>
  )
}

export default App
