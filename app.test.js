const request = require('supertest');
const app = require('./app');

describe('GET /ping', () => {
  test('should return status 200 and response "pong"', async () => {
    try {
      console.log('Sending GET /ping request...');
      const response = await request(app).get('/ping');
      console.log('GET /ping response received:', response.status, response.text);
      expect(response.status).toBe(200);
      expect(response.text).toBe('pong');
    } catch (error) {
      console.error('Error in GET /ping test:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  test('should return status 500 and a generic error message when an error is thrown in the /ping route', async () => {
    try {
      // Arrange
      const originalHandler = app.get('/ping', (req, res) => {
        throw new Error('Test error');
      });

      // Mock the console.error function to capture the log output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const response = await request(app).get('/ping');

      // Assert
      expect(response.status).toBe(500);
      expect(response.text).toBe('Internal Server Error');
      expect(consoleSpy).toHaveBeenCalledWith('Error handling /ping request:', expect.any(Error));
      expect(consoleSpy).toHaveBeenCalledWith('Error stack:', expect.any(String));

      // Restore the original console.error function
      consoleSpy.mockRestore();
    } catch (error) {
      console.error('Error in test:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });
});