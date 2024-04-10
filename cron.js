const cron = require('node-cron');
const User = require('./user.model');
const { Op } = require('sequelize');
const sendDailyUserReport = require('./email.service');

// Run the cron job at 00:00 (midnight) every day
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Cron job started: Fetching users created in the last 24 hours');

    // Fetch users created in the last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const newUsers = await User.findAll({
      where: {
        created_at: {
          [Op.gte]: yesterday
        }
      }
    });

    console.log(`Found ${newUsers.length} new users created in the last 24 hours`);

    // Send the daily user report
    await sendDailyUserReport(newUsers);
    console.log('Daily user report sent successfully');
  } catch (error) {
    console.error('Error in cron job:', error);
    console.error('Error stack:', error.stack);
  }
});

console.log('Cron job initialized');