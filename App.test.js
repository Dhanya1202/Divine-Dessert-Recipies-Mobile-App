


import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native'; // Import act from react-test-renderer
import App from './App';

describe('<App />', () => {
  test('renders HomeScreen', () => {
    const { getByText } = render(<App />);
    const homeScreenText = getByText('Divine Desserts');
    expect(homeScreenText).toBeDefined();
  });

  test('navigates to LoginScreen on button press', () => {
    const { getByTestId, getByText } = render(<App />);
    const loginButton = getByTestId('login-button');
    act(() => {
      fireEvent.press(loginButton);
    });
    const loginScreenText = getByTestId('login-screen-text');
    expect(loginScreenText).toBeDefined();
  });
  test('navigates to RegisterScreen on button press', () => {
    const { getByTestId, getByText } = render(<App />);
    const registerButton = getByTestId('register-button');
    act(() => {
        fireEvent.press(registerButton);
      });
    const registerScreenText = getByTestId('register-screen-text');
    expect(registerScreenText).toBeDefined();
      });
});
