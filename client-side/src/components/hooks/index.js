import { useEffect, useState } from "react"

const useToFetchDataFromServer = (endpoint) => {
    let [data, setData] = useState(null)

    const fetchData = () => {
        fetch(endpoint)
            .then(resp => resp.json())
            .catch(err => console.log("rrequest error!!", err))
            .then(dataset => setData(dataset))
            .catch(err => console.log("response error!!", err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data }
}

export {
    useToFetchDataFromServer,
}