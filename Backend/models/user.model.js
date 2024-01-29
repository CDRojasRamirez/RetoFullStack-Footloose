export const addUserQuery = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)';
export const findUserByEmailQuery = 'SELECT * FROM users WHERE email = ?';