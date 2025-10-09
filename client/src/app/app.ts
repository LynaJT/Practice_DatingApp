import { Component, inject, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],    //RouterOutlet
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient);
  protected readonly title = 'Dating App';
  //protected members: any;
  protected members = signal<any>([])  
  //signal allow angular to do fine grained change detection 
  //(when the value of the signal changes, anything that's using the signal will be notified)

  async ngOnInit() {
/*     this.http.get('https://localhost:5001/api/members').subscribe( 
      {
        next: response => this.members.set(response),
        //next: response => this.members = response,
        error: error => console.log(error),
        complete: () => console.log('Completed the http request')  
      }
   npm install tailwindcss @tailwindcss/postcss ) */

    this.members.set(await this.getMembers())
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
