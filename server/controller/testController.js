const testController = (req, res) => {
    res.status(200).send({
        message: "test is successfull",
        success: true
    })

};


module.exports = { testController }