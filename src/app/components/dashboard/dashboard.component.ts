import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AppService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pokeMonList: any[] = [];
  nextPage = null;
  prevPage = null;
  searchText;
  heroes: any[] = [];
  disablePrevious = true;
  disableNext = false;

  constructor(private router: Router,
    private appService: AppService
    ) {}

  ngOnInit() {

    // this function fetches the pokemon list data on component load
    this.appService.getPokeMon().subscribe((res: any) => {
      this.pokeMonList = res.results;
      this.nextPage = res.next;
      this.prevPage = res.previous;
      if (this.prevPage && this.prevPage != null) {
        this.disablePrevious = false;
      } else {
        this.disablePrevious = true;
      }
      if (this.nextPage && this.nextPage != null) {
        this.disableNext = false;
      } else {
        this.disableNext = true;
      }
    });
  }

  /*
  This function is used to routye Pokemon-info component based on selected pokemonid
  */
  getDetailsPokeMon(pokeMon) {
    const pokeMonId = pokeMon.url.split('/')[6];
    this.router.navigate(['pokemon-info'], { queryParams: { id: pokeMonId } });
  }

  /*
  this function is used to get the previous/next page pokemon list
  */
  getPage(buttonId) {
    if(this.prevPage !== null && buttonId == 0) {
      // fetching previous page pokemon list
    this.appService.getPageData(this.prevPage).subscribe((res: any) => {
      this.pokeMonList = res.results;
      this.nextPage = res.next;
      this.prevPage = res.previous;
      // Enabling or disabling previous button if the value is null
      if (this.prevPage && this.prevPage != null) {
        this.disablePrevious = false;
      } else {
        this.disablePrevious = true;
      }
      if (this.nextPage && this.nextPage != null) {
        this.disableNext = false;
      } else {
        this.disableNext = true;
      }
    });
    }
    if(this.nextPage !== null && buttonId == 1) {
      // fetching next page pokemon list
      this.appService.getPageData(this.nextPage).subscribe((res: any) => {
        this.pokeMonList = res.results;
        this.nextPage = res.next;
        this.prevPage = res.previous;
        // Enabling or disabling next button if the value is null
        if (this.prevPage && this.prevPage != null) {
          this.disablePrevious = false;
        } else {
          this.disablePrevious = true;
        }
        if (this.nextPage && this.nextPage != null) {
          this.disableNext = false;
        } else {
          this.disableNext = true;
        }
      })
    }
  }
}
