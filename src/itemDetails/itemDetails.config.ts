import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './itemDetails.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp(
      {"projectId":"bworks-dev",
        "appId":"1:345880488388:web:20a23f10751200da545c91",
        "databaseURL":"https://bworks-dev-default-rtdb.firebaseio.com",
        "storageBucket":"bworks-dev.appspot.com",
        "apiKey":"AIzaSyDpDqVmgzXKpdeBR0VdSC1zaKPrwXq42UE",
        "authDomain":"bworks-dev.firebaseapp.com","messagingSenderId":"345880488388",
        "measurementId":"G-L9KET866SG"})), 
        provideAuth(() => getAuth()), 
        provideAnalytics(() => getAnalytics()), 
        ScreenTrackingService, 
        UserTrackingService, 
        provideFirestore(() => getFirestore()), 
        provideDatabase(() => getDatabase()), 
        provideFunctions(() => getFunctions()), 
        provideMessaging(() => getMessaging()), 
        providePerformance(() => getPerformance()), 
        provideStorage(() => getStorage()), 
        provideRemoteConfig(() => getRemoteConfig()), 
        provideVertexAI(() => getVertexAI())]
};
