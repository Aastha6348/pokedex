import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services';
import * as CanvasJS from './../../../assets/canvasjs.min';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokeMonInfoComponent implements OnInit {
  selectedPokeMonId = '';
  pokeMonImage = '';
  pokeMonData = {};

  constructor(
    private router: ActivatedRoute,
    private appService: AppService,
    private route: Router
  ) { }

  /*
    This function does two things At the time of loading this component:
    1.  Fetching the Selected pokemonId
    2.  Loading the selected Pokemon info
  */
  ngOnInit() {
    this.router.queryParams
      .subscribe(params => {
        this.selectedPokeMonId = params.id;
        this.getPokeMonData();
      });
  }

  /*
  this function fetches pokemon information
  */
  getPokeMonData() {
    let statsData = [];
    this.appService.getPokeMonInfo(this.selectedPokeMonId).subscribe((res) => {
      this.pokeMonData = res;
      this.pokeMonImage = this.getPokemonImage();
      for(let val in this.pokeMonData['stats']) {
          statsData.push({ y: this.pokeMonData['stats'][val]['base_stat'], label: this.pokeMonData['stats'][val]['stat']['name'] })
      }
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: "#D5D8DC",
      title: {
        text: "Pokemon Statistics"
      },
      axisY:{
        gridThickness: 0
      },
      axisX:{
        gridThickness: 0
      },

      data: [{
        type: "column",
        dataPoints: statsData
      }]
    });
    chart.render();
  });
  }

   /*
  This function is used to fetch pokemonImage from the pokemon data
  */
  getPokemonImage() {
    const image = '';
    for(let val in this.pokeMonData['sprites']) {
      if(this.pokeMonData['sprites'][val] !== null) {
        return this.pokeMonData['sprites'][val];
      }
    }
  }

  /*
  This functions handles back event to route to dashboard component
  */
  navigate() {
    this.route.navigate(['dashboard']);
  }
}
