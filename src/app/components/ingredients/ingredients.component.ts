
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AdunitService } from '../../services/adunit.service';
import { FavouritesService } from '../../services/favourites.service';
import { RecipeService } from '../../services/recipe.service';

import { AuthService } from '../../services/auth.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {ArrayLikeObservable} from 'rxjs-compat/observable/ArrayLikeObservable';
import {BehaviorSubject} from 'rxjs';
import {ReviewService} from '../../services/review.service';


@Component({
  selector: 'app-create',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  angForm: FormGroup;
  searchTerm: FormControl = new FormControl(Validators.required);
  ingredients: String[] = [];
  searchResult;
  recipesResults;
  cookbook;
  profile;
  rank = 0;
  public searchForm: FormGroup;



  constructor(private adunitservice: AdunitService,
              private recipeService: RecipeService,
              private auth: AuthService,
              private fb: FormBuilder,
              private favouritesService: FavouritesService) {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log('if ', this.profile);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile, 'else');
      });
    }
  }



  ngOnInit() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', [Validators.required]),

    });
    this.searchForm.get('searchTerm').valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.recipeService.getIngredient(data).subscribe(response => {
          console.log(response);
          this.searchResult = response;
        });
      });
  }
  public hasError(controlName: string, errorName: string) {
    return this.searchForm.controls[controlName].hasError(errorName);
  }

  addIngredient() {
    this.ingredients.push(this.searchForm.get('searchTerm').value.trim());
    this.searchForm.get('searchTerm').setValue('');
    return;
  }
  removeIngredient(ingredient) {
    console.log(ingredient);
    this.ingredients = this.ingredients.filter(item => item !== ingredient);
    console.log(this.ingredients);
  }

  searchForRecipes(ingredients) {
    const search = this.createSearchString(ingredients);
    this.recipeService.searchForRecipes(search, this.rank).subscribe(response => {
      this.recipesResults = response;
    });
  }

  private  createSearchString(ingredients ) {
    let searchString = '';
    for (const i of ingredients) {
      const searchItem = i.replace(' ', '+');
      searchString += searchItem + '%2C';
    }
    return searchString;
  }
  getCookBook() {
    if (this.cookbook) {
      this.cookbook = null;
      console.log(this.cookbook);
    } else {
      this.favouritesService.getFavourites(this.profile.nickname).subscribe(response => {
        this.cookbook = response;
      });
    }
  }
}
