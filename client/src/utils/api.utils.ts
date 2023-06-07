export const getContentType = ():object => ({
    'Content-Type': 'application/json'
})

export const errCatch = (err:any):string => {
    if (err.response) return err.response.data;
    if (typeof err.response === 'object') {
        return err.response.data.message[0]
    } else {
        return err.response.data.message
    }

}