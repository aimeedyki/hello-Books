import { User, Level } from '../models';
import { transporter, mailOptions } from '../nodeMailer/mailer';

const chargeSubscription = () => (User.findAll({
  where: {
    levelId: { $gt: 1 }
  },
  include: [{
    model: Level,
    as: 'level',
    attributes: ['type', 'subscription'],
    paranoid: false
  }]
}).then((users) => {
  users.forEach((user) => {
    user.update({
      outstandingSubscription:
        user.outstandingSubscription + user.level.subscription
    });
    const to = user.email;
    const bcc = null;
    const subject = 'Monthly Subscription';
    const html = `
    <p>Hello ${user.name},</p>
    <p>This is to inform you that you will be charged the monthly subscription 
    fee of <b>₦${user.level.subscription}</b> for <b>${user.level.type} 
    membership</b>, today.</p>
    <p>You can pay to our account BOOKSVILLE 11111888888, GTBANK,
    and upload for confirmation in app.</p>
    <p>Thank you for your patronage.</p><br/>
    <p>Have a pleasant day!</p><br/><br/>
    <p>Regards,</p>
    <p>The Bookville team</p>`;

    transporter.sendMail(mailOptions(to, bcc, subject, html), (error, info) => {
      if (error) {
        process.stdout.write(error.stack);
      } else {
        process.exit(0);
      }
    });
  });
}).catch((error) => {
  process.stdout.write(error.stack);
  process.exit(0);
})
);

export default chargeSubscription;
