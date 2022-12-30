import { useEffect, useState } from "react"
import { readDataFromServer, readTokenProtectedDataFromServer, sendDataToServer } from "../fetchRequests"

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

const useToFetchSectionSpecificDataForAdmin = (url, appCtx) => {
    const [dataset, setDataset] = useState()
    let [getNewToken, setGetNewToken] = useState(false);

    const handleDataset = (results) => {
        if(results.products) {
            setDataset(results.products)
        } else if(results.orders) {
            setDataset(results.orders)
        } else if(results.users) {
            setDataset(results.users)
        } else if(results.product) {
            setDataset(results.product)
        } else if(results.order) {
            setDataset(results.order)
        } else if(results.user) {
            setDataset(results.user)
        } else if(results?.msg == "Authentication failed!! Invalid Token!!") {
            setGetNewToken(true)
        }
    }

    const beginFetching = () => {
        readTokenProtectedDataFromServer(url, handleDataset, appCtx.user.accessToken)
    }

    const updateUserDataWithNewToken = results => {
        appCtx.handleUserData({accessToken: results.accessToken})
        setGetNewToken(true)

        // refetching for new access token
        if(results?.accessToken) {
            readTokenProtectedDataFromServer(url, handleDataset, results.accessToken)
        }
    }

    const fetchNewAccessToken = () => {
        const endpoint = `${appCtx.baseUrl}/new-access-token`;
        sendDataToServer(endpoint, {refreshToken: appCtx.user.refreshToken}, updateUserDataWithNewToken )
    }

    useEffect(() => {
        getNewToken && fetchNewAccessToken()
    }, [getNewToken])

    useEffect(() => {
        !getNewToken && beginFetching()
    }, [url])

    return {dataset}
}

function useToCloseModalOnClickedOutside(ref, handler) {

    useEffect(() => {
        let listener = event => {
            if(!ref.current || ref.current.contains(event.target)) return
            handler(event)
        }

        document.addEventListener("mousedown", listener);

        return () => document.removeEventListener("mousedown", listener)
    }, [ref, handler])
}

export {
    useToCloseModalOnClickedOutside,
    useToFetchDataFromServer,
    useToFetchSectionSpecificDataForAdmin
}