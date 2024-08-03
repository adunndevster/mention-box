import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';
import { worker } from './mocks/browser';

const startWorker = async () => {
  if (isDevMode()) {
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};

startWorker().then(() =>
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  )
);
