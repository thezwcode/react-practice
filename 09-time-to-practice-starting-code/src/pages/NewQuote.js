import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/my-api';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const NewQuote = () => {
    const history = useHistory();
    const {sendRequest, status} = useHttp(addQuote);
    const addQuoteHandler = (quote) => {
        sendRequest(quote);
    }

    useEffect(() => {
        if (status==='completed') {
            history.push('/quotes');
        }
    }, [status,history]);
    return <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler}/>
    
}

export default NewQuote;