import { Before } from '@cucumber/cucumber';

Before(async function () {
  await this.init();
});
