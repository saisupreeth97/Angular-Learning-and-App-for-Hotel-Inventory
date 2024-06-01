import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Comments } from './comments';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments$ = this.commentService.getComments();

  comment$ = this.activatedRoute.data.pipe(pluck('comments'));

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe((data) => {
    //   console.log(data);
    // });
  }

}
