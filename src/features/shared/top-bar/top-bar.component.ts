import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'symo-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  @Input() title?: string;
  @Input() showBack = true;

  constructor(private router: Router, private location: Location) {}

  get isRoot(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  back(): void {
    if (this.isRoot) return;
    this.location.back();
  }
}