import { useEffect } from 'react';
import { useParams, useRouteMatch} from 'react-router-dom'

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/my-api';


const QuoteDetail = () => {
    const {sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote, true);
    const match = useRouteMatch();
    const {quoteId} = useParams();
    console.log(match);
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status==='pending') {
        return <div className='centered'><LoadingSpinner/></div>
    }

    if (error) {
        return <p className='centered'>{error}</p>
    }

    if (!loadedQuote.text || !loadedQuote.author) {
        <p className='centered'>No quote found!</p>
    }
    return <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text}/>
}

export default QuoteDetail; 