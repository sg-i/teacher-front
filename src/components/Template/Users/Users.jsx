import React, { useEffect, useState, useContext } from 'react';
import AdminService from '../../../services/admin.service';
import AuthService from '../../../services/auth.service';
import { AppContext } from '../../../context';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    role: '',
    username: '',
    password: '',
  });
  const [editUser, setEditUser] = useState(null); // Информация о редактируемом пользователе
  const [editPassword, setEditPassword] = useState(''); // Значение для редактирования пароля
  const [currentPassword, setCurrentPassword] = useState(''); // Текущий пароль для проверки

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    AdminService.getUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    setEditPassword(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const createUser = () => {
    AuthService.register(newUser.username, newUser.password, newUser.role).then(() => {
      fetchUsers();
      setNewUser({
        role: '',
        username: '',
        password: '',
      });
    });
  };

  const updateUserPassword = (userId) => {
    AuthService.changePassword(userId, editPassword, currentPassword).then(() => {
      fetchUsers();
      setEditUser(null);
      setEditPassword('');
      setCurrentPassword('');
    });
  };

  const context = useContext(AppContext);
  if (context.role === 'superadmin') {
    return (
      <div style={{ textAlign: 'left', backgroundColor: 'white', borderRadius: 14, padding: 14 }}>
        <h2>Создание пользователя</h2>
        <label>
          Роль:
          <select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="teacher">teacher</option>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </label>
        <br />
        <label>
          Имя пользователя:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={createUser}>Создать</button>

        <h2>Пользователи</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Роль: <b>{user.role}</b>, Имя: <b>{user.username}</b>
              {editUser === user.id ? (
                <div>
                  <br />
                  <input
                    type="password"
                    placeholder="Новый пароль"
                    value={editPassword}
                    onChange={handleEditInputChange}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Текущий пароль"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                  />
                  <br />
                  <button onClick={() => updateUserPassword(user.id)}>Сохранить</button>
                </div>
              ) : (
                <button onClick={() => setEditUser(user.id)}>Изменить пароль</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};
