module.exports = (error, request, response, next) => {

    //console.log(error)

    if(error.code === 'ER_WRONG_VALUE'){

        response.status(400).send({error: 'date used is invalid'})

    } else{

        response.status(500).end()

    }

}
