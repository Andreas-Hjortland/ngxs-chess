import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngxs/store';
import { AppComponent } from './app/app.component';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { ChessState } from './app/chessboard/chessboard.state';
import { provideRouter } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter([
        {
          path: '',
          loadChildren: () => import('./app/host/routes'),
          pathMatch: 'full',
        },
        {
          path: 'join/:id',
          loadChildren: () => import('./app/client/routes'),
          pathMatch: 'full',
        },
        {
          path: '**',
          redirectTo: '/',
        },
      ]),
      provideStore(
        [ChessState],
        {
          developmentMode: !environment.production,
        },
        withNgxsReduxDevtoolsPlugin({
          disabled: environment.production,
        }),
      ),
      provideAnimations(),
    ]
})
  .catch((err) => console.error(err));
