const sendDataToServer = (endpoint, data, dataUpdater) => {
    // console.log(data, "data>><<")
    fetch(endpoint, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
    .catch(err => {
        dataUpdater({error: "request error!!"})
        console.log("request error!!", err)
    })
    .then(dataset => {
        dataUpdater(dataset)
    }).catch(err => {
        dataUpdater({error: "response error!!"})
        console.log("response error!!", err)
    })
}

const readTokenProtectedDataFromServer = (endpoint, dataUpdater, accessToken) => {
    fetch(endpoint,
        {
            method: "GET",
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true
            }
        }
    )
        .then(resp => resp.json())
        .catch(err => {
            console.log(err, "request error!!")
            dataUpdater({ msg: "request error!!" })
        }).then(dataset => {
            dataUpdater(dataset)
        }).catch(err => {
            console.log(err, "response error!!")
            dataUpdater({ msg: "response error!!" })
        })
}

const readDataFromServer = (endpoint, dataUpdater) => {
    fetch(endpoint)
        .then(resp => resp.json())
        .catch(err => {
            console.log(err, "request error!!")
            dataUpdater({msg: "request error!!"})
        }).then(dataset => {
            dataUpdater(dataset)
        }).catch(err => {
            console.log(err, "response error!!")
            dataUpdater({msg: "response error!!"})
        })
}

const deleteDataFromServer = (endpoint, dataUpdater) => {
    // console.log(data, "data>><<")
    fetch(endpoint, {
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then(resp => resp.json())
    .catch(err => {
        dataUpdater({error: "request error!!"})
        console.log("request error!!", err)
    })
    .then(dataset => {
        dataUpdater(dataset)
    }).catch(err => {
        dataUpdater({error: "response error!!"})
        console.log("response error!!", err)
    })
}

export {
    sendDataToServer,
    readTokenProtectedDataFromServer,
    readDataFromServer,
    deleteDataFromServer
}