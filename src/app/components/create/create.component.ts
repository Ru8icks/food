
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdunitService } from '../../services/adunit.service';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private adunitservice: AdunitService, private recipeService: RecipeService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      unit_name: ['', Validators.required ],
      unit_price: ['', Validators.required ]
    });
  }

  addAdUnit(unit_name, unit_price) {
    this.adunitservice.addAdUnit(unit_name, unit_price);
    this.recipeService.getIngredient('apple');
    this.createForm();
  }

  ngOnInit() {
  }

}
