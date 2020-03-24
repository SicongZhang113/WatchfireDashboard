import axios from 'axios'

export const getList = () => {
    return axios
        .get('api/tasks', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.model, val.time, val.quantity, val.prediction])
            })
            console.log(data)
            return data
        })
}
