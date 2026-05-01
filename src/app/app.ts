import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VERSION } from "./version";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('koine-quiz');

  constructor(private meta: Meta) {

  }
  ngOnInit(): void {
    this.meta.addTag({
      name: "x-sha", 
      content: JSON.stringify(VERSION)}
    );
  }


  version = VERSION;

}
