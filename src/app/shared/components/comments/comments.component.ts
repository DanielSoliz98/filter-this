import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() user: User;
  constructor() { }

  ngOnInit() {}

}
