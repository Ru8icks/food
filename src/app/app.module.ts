import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

import {RouterModule} from '@angular/router';
import { routes } from './app.routes';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';

import { AdunitService } from './services/adunit.service';
import { RecipeService } from './services/recipe.service';
import { FavouritesService} from './services/favourites.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import { RecipesComponent } from './components/recipes/recipes.component';

import {MatCardModule} from '@angular/material/card';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CallbackComponent } from './components/callback/callback.component';
import { WriteReviewComponent } from './components/write-review/write-review.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { ProgramComponent } from './components/exercise/program/program.component';
import { ExerciserComponent } from './components/exercise/exerciser/exerciser.component';
import { ReminderComponent } from './components/exercise/reminder/reminder.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { TimerComponent } from './components/timer/timer.component';
import { GraphComponent } from './components/graph/graph.component';


import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    RecipesComponent,
    RecipeComponent,
    CallbackComponent,
    WriteReviewComponent,
    UserReviewsComponent,
    ExerciseComponent,
    ProgramComponent,
    ExerciserComponent,
    ReminderComponent,
    ModalComponent,
    TimerComponent,
    GraphComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    ChartsModule
  ],
  providers: [
    AdunitService,
    AuthGuard,
    AuthService,
    FavouritesService,
    RecipeService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
