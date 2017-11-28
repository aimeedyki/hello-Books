import { History, User, Book } from '../models';
import { transporter, mailOptions } from '../nodeMailer/mailer';

const implementSurcharge = () => (History.findAll({
  where: {
    $and: [{
      returned: false,
      expectedDate: {
        $lt: Date.now()
      }
    }]
  },
  include: [{
    model: Book,
    as: 'book',
    attributes: ['title'],
    paranoid: false
  },
  {
    model: User,
    as: 'user',
    attributes: ['name', 'surcharge', 'email']
  }]
}).then((overdueBooks) => {
  overdueBooks.forEach((book) => {
    const email = book.user.email;
    const name = book.user.name;
    const expectedDate = book.expectedDate;
    const surcharge = book.user.surcharge;
    const bookTitle = book.book.title;
    const userId = book.userId;

    User.findById(userId).then((user) => {
      user.update({ surcharge: user.surcharge + 100 });
    });
    const to = email;
    const bcc = null;
    const subject = 'Overdue Book';
    const html = `
    <p>Hello ${name},</p>
    <p>Just checking in to inform you that you have exceeded the rent period for
    <b>${bookTitle}</b>, Which was due on ${expectedDate}.</p>
    <p>This attracts a daily fine of ₦100 till it is returned. 
    Your previous outstanding balance is ₦${surcharge}.</p>
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
})
  .catch((error) => {
    process.stdout.write(error.stack);
    process.exit(0);
  })
);

export default implementSurcharge;
