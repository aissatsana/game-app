import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh; 
`;

const InputContainer = styled.div`
  max-width: 200px;
  margin: 0 auto 1rem;
`;

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/inner-page/${username}`);
  };

  return (
    <AppContainer className="App bg-dark text-light p-5">
      <h1 className="mb-4">Страница входа</h1>
      <form>
          <InputContainer>
          <label htmlFor="username" className="form-label">
            Имя пользователя:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>
        <button type="button" className="btn btn-light" onClick={handleLogin}>
          Войти
        </button>
      </form>
    </AppContainer>
  );
}

export default Login;
export {AppContainer};
