import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'your name is required',
      'minlength': 'Minimum length is 2'
    },

    'comment': {
      'required': 'comment is required'
    }
  };

  dishCommentForm: FormGroup;
  dishComment: Comment;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder) { this.createForm(); }

  ngOnInit() {

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  createForm(): void {
    this.dishCommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 0,
      comment: ['', Validators.required]
    });

    this.dishCommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.dishCommentForm) { return };
    const form = this.dishCommentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field)
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in this.dishCommentForm.get(field).errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  };
  onSubmit() {
    this.dishComment = this.dishCommentForm.value;
    console.log(this.dishComment);
    this.dishCommentForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

}
