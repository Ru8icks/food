import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import { ReviewService} from '../../services/review.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FavouritesService} from '../../services/favourites.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ingredients =  [];
  image: String;
  title: String;
  diets;
  instructions;
  instructionsBySteps;
  readyInMinutes: number;
  sourceUrl;
  metric = true;
  dishType: String;
  recipeId: number;
  reviews;
  isAddButton: boolean;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private favouritesService: FavouritesService) {
  }

  ngOnInit() {
    this.isAddButton = false;
    this.route.params.subscribe(params => {
      this.recipeService.getInstructions(params['id']).subscribe(res => {
        console.log(res[0].steps)
        this.instructionsBySteps = res[0].steps;
      });
      this.recipeService.getRecipe(params['id']).subscribe(res => {
        console.log(res);
        // @ts-ignore
        console.log(res.extendedIngredients);
        // @ts-ignore
        this.ingredients = res.extendedIngredients;
        console.log(this.ingredients);
        // @ts-ignore
        this.image = res.image;
        // @ts-ignore
        this.title = res.title;
        // @ts-ignore
        this.diets = res.diets;
        // @ts-ignore
        this.sourceUrl = res.sourceUrl;
        console.log(this.instructions);
        if (!this.instructionsBySteps) {
          // @ts-ignore
          if (res.analyzedInstructions.length == 1) {
            // @ts-ignore
            console.log(res.analyzedInstructions[0].steps);
            // @ts-ignore
            this.instructionsBySteps = res.analyzedInstructions[0].steps;
            this.instructions = ' ';
          } else {
            // @ts-ignore
            this.instructions = res.instructions;
          }
        }
        // @ts-ignore
        this.readyInMinutes = res.readyInMinutes;
        console.log(this.instructions);
        // @ts-ignore
        this.dishType = res.dishTypes;
        // @ts-ignore
        this.recipeId = res.id;
      });
    });
  }
  viewSource() {
    window.location.href = this.sourceUrl;
  }

  toggleMetric() {
    this.metric = !this.metric;
  }

  viewReviews() {
    console.log(this.recipeId)
    this.reviewService.getReviews(this.recipeId).subscribe(res => {
      console.log(res);
      this.reviews = JSON.stringify(res);
      console.log(this.reviews);
    });
  }
  test() {
    console.log(this.isAddButton);
    console.log('testy tesasdasdt');
    if (!this.isAddButton) {
      console.log('is add ', this.isAddButton)
      this.favouritesService.addFavourite(this.ingredients, this.image, this.title, this.diets, this.instructions, this.instructionsBySteps,
        this.readyInMinutes, this.sourceUrl, this.dishType, this.recipeId);
    } else {
      this.favouritesService.deleteFave(this.recipeId);
      console.log('is add da ', this.isAddButton);
    }
    this.isAddButton = !this.isAddButton;


  }
}
