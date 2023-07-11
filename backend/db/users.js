const bcrypt = require('bcrypt');

const users = [
    {
        name: "Admin User",
        email: 'admin@email.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: 'johndoe@email.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false
    },
    {
        name: "Jane Smith",
        email: "janesmith@email.com",
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false
    },
    {
        name: "Michael Johnson",
        email: "michaeljohnson@email.com",
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false
    },
    {
        name: "Sarah Williams",
        email: "sarahwilliams@email.com",
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false
    }
]

module.exports = users;