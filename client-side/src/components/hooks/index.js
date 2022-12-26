import { useEffect, useState } from "react"

const useToFetchListOfDataFromServer = (endpoint) => {
    let [data, setData] = useState([])

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

const useToFetchSpecificItemFromServer = endpoint => {
    let [data, setData] = useState({})

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
    useToFetchListOfDataFromServer,
    useToFetchSpecificItemFromServer
}