import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe(data => {
      this.content = data;
    }, error => {
      this.content = JSON.parse(error.error).message;
    });
  }

}
