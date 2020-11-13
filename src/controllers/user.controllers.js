const User = require('../models/user.model')
const Role = require('../models/role.model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_WORD = 'difficult secret word'

//Регистрация
exports.signUp = async (req, res) => {
    let { username, email, password, role } = req.body
    if (!username || !email || !password || !role) {
        res.status(400).json('Incorrect body request. Check your: username or email or password or role')
        return false
    }
    //проверить существует данный пользователь или нет
    const isUserExist = await User.find({ $or:[ {'username': username}, {'email': email} ] })
    
    if (isUserExist.length > 0) { //если пользователь с данным email or username есть предупредить и не зарегестрировать 
        res.status(400).json({ message: 'User alredy exist' });
        return false;
    } else if (isUserExist.length === 0) {
        //найти id role чтобы добавить ссылку в объект пользователя
        await Role.find({name: role}).then(data => {
            role = data
        })
        password = await bcrypt.hash(password, 8)
        const user = new User({
            username, email, 
            password, 
            role
        })
        await user.save(user).then(data => {
            res.status(200).json({ message: 'Register success!' })
        })
    }
}

//Вход 
exports.signIn = async (req, res) => {
    const { username, password } = req.body
    const user = await User.find({ username: username })
    if (user.length === 0) { //пользователь не найден
        res.status(400).json({ message: 'Incorrect username or password', accessToken: null })
        return false
    } else { //если пользователь с данным ником найден проверяем пароль
        let checkPassword = bcrypt.compareSync(password, user[0].password)
        if (!checkPassword) {
            res.status(400).json({ message: 'Incorrect username or password', accessToken: null })
            return false
        } else {
            let token = jwt.sign({ id: user[0].id }, SECRET_WORD, {
                expiresIn: 7200 // 2h minutes
            })
            res.status(200).json({ 
                id: user[0]._id,
                username: user[0].username,
                email: user[0].email,
                accessToken: token
            })
        }
    }
}

//Проверка сессии
exports.checkSSID = async (req, res) => {
    if (!req.body.ssid) {
        res.status(400).json({ message: 'SSID empty' })
    }
    const ssid = req.body.ssid
    const id = req.body.id
    jwt.verify(ssid, SECRET_WORD, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        if (decoded.id === id) {
            res.status(200).json({message: 'true'})
        } else {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        
    })
}