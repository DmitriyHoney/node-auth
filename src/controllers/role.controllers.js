const Role = require('../models/role.model')

exports.create = async (req, res) => {
    let { name } = req.body
    if (!name) {
        res.status(400).json('Incorrect body request. Check your: name')
    }
    const role = new Role({ name })
    await role.save(role).then(data => {
        res.status(200).json({ message: data })
    })
}