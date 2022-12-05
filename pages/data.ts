import { FormEventHandler } from 'react'

export declare interface QueryProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  setInput: Function;
  input: string;
  loading: boolean;
};

export declare interface ResultsProps {
  engRequested: boolean;
  resultFound: boolean;
  result: string;
  error: string;
}
