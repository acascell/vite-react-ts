import Heading from "./components/Heading"
import { Section } from "./components/Section"
import Counter from "./components/Counter"
import List from "./components/List"

import { useState, useEffect, useCallback, useMemo, useRef,
  MouseEvent, KeyboardEvent} from "react"

interface User {
  name: string,
  username: string,
}

type fibFunc = (n: number) => number

// this is just a sample, to use memoization for expensive calculations
const fib: fibFunc = (n) => {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

const myNum: number = 17

function App() {
  const [count, setCount] = useState<number>(1)
  const [users, setUsers] = useState<User[] | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  // chaining values
  console.log(inputRef?.current)
  console.log(inputRef?.current?.value)

  useEffect(() => { // work with side effect
    console.log("mounting")
    console.log('Users:', users)

    return () => {
      console.log("unmounting")
    }
  }, [users])

  // wrap the function in useCallback to prevent re-creation of the function
  const addTwo = useCallback((e: MouseEvent<HTMLButtonElement> |
    KeyboardEvent<HTMLButtonElement>): void => setCount(prev => prev + 2), [])

    // use memoize to reculalculate t result if it changes
  const result = useMemo(() => fib(myNum), [myNum])

  return (
    <>
      <Heading title="Hello!" />
      <Section title={"Different title"}>This is my section.</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={["Coffee", "Takos", "Code"]} render={(item:
      string) => <span className="gold">{item}</span>} />
      {/* call it here to prevent re-creation */}
      <button onClick={addTwo}>Add 2</button>
      {/* first time it will be calculated, then it will be memoized */}
      <h2>{result}</h2>
      <input type="text" ref={inputRef} />
    </>
  )
}

export default App
