import React, { useEffect } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'


function QuoteDetail() {

    const { status, sendRequest, data: loadedQuote, error } = useHttp(getSingleQuote, true)

    const match = useRouteMatch()
    const params = useParams()

    const { quoteId } = params

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className='centered focused'>
                {error}
            </div>
        )
    }

    if (!loadedQuote.text) {
        return <p>No quotes are found</p>
    }

    return (
        <>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}comments`}>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    )
}

export default QuoteDetail