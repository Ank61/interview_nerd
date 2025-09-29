// Log the pageview with their URL
export const pageview = (url) => {
    if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
            page_path: url,
        })
    }
}

// Log specific events happening
// Example: event({ action: 'search', params: { search_term: 'query' }})
export const event = ({ action, params }) => {
    if (window.gtag) {
        window.gtag('event', action, params)
    }
}
