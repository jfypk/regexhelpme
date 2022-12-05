import Image from 'next/image';
import { QueryProps } from '../data';

export default function Query(props: QueryProps) {
  const placeholderText = 
    "Tell me the regex you want me to translate or " + 
    "complete the following prompt: I want a regex that..."

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <textarea
          id="input"
          name="Input"
          placeholder={placeholderText}
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
        />
        <div className='submitContainer'>
          <div className='regexButtonContainer'>
            <input type="submit" value="To Regex" />
          </div>
          <div className='englishButtonContainer'>
            <input type="submit" value="To English" />
          </div>
          <div className='loadingContainer'>
            {props.loading && <Image className='logo' src="/loadingball.svg" alt="loading" width={50} height={50} />}
          </div>
        </div>
      </form>
    </>
  )
}
