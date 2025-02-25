const {loginOnChathub,signupOnChathub,logoutFromChathub} = require("../src/services/UserAPI");

jest.mock('react-native', () => ({
    Alert: { alert: jest.fn() },
  }));


test('test user Signup', async () => {
    await expect(signupOnChathub('testUser@test.com', 'tester1', 'TestUser')).resolves.toBe('TestUser');
});


test('test user login', async () => {
    await expect(loginOnChathub('testUser@test.com', 'tester1')).resolves.toBe('TestUser');
});


test('test user logout', async () => {
    await expect(logoutFromChathub()).resolves.toBe('Logout Successful!');
});


afterAll(() => {
    jest.clearAllMocks();
});
  