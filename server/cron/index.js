import { CronJob } from 'cron';
import implementSurcharge from './implementSurcharge';
import chargeSubscription from './monthlySubscription';

export const setCron = props => new CronJob(props);

export const startSurcharge = () => {
  setCron({
    cronTime: '00 00 06 * * 1-7',
    onTick: implementSurcharge,
    timeZone: 'Africa/Lagos',
    start: true
  });
};

export const startSubscriptionCharge = () => {
  setCron({
    cronTime: '00 00 06 24 * *',
    onTick: chargeSubscription,
    timeZone: 'Africa/Lagos',
    start: true
  });
};

if (require.main === module) {
  startSurcharge();
  startSubscriptionCharge();
}

