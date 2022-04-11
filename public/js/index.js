/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSetting } from './updateUser';

const form = document.querySelector('.login');
const logoutButton = document.querySelector('.nav__el--logout');
const signupButton = document.querySelector('.signup');
const updateUser = document.querySelector('.update-user');
const formUserSettings = document.querySelector('.form-user-settings');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}

if (signupButton) {
  signupButton.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
    window.setTimeout(() => {
      login(email, password);
    }, 1500);
  });
}

if (updateUser) {
  updateUser.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const photo = document.getElementById('photo').value;
    updateSetting({ name, email }, 'data');
  });
}

if (formUserSettings) {
  formUserSettings.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.profile-save-password').textContent =
      'Updating...';
    const password = document.getElementById('password').value;
    const passwordCurrent = document.getElementById('password-current').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSetting(
      { password, passwordCurrent, passwordConfirm },
      'password'
    );
    document.querySelector('.profile-save-password').textContent =
      'Save password';
    document.getElementById('password').value = '';
    document.getElementById('password-current').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
