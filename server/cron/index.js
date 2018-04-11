import { CronJob } from 'cron';
import implementSurcharge from './implementSurcharge';
import chargeSubscription from './monthlySubscription';

export const setCron = props => new CronJob(props);

/** @description starts method for surcharge
   *
   * @returns {*} null
   */
export const startSurcharge = () => {
  setCron({
    cronTime: '00 00 09 * * 1-7',
    onTick: implementSurcharge,
    timeZone: 'Africa/Lagos',
    start: true
  });
};

/** @description starts method for subscription
   *
   * @returns {*} null
   */
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

