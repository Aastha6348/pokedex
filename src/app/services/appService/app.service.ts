import { Injectable } from '@angular/core';
import { RestService } from '../restService/rest.service';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private restService: RestService) { }

  getPokeMon() {
    return this.restService.get(encodeURI('https://pokeapi.co/api/v2/pokemon/'));
  }

  getPageData(pageUrl) {
    return this.restService.get(encodeURI(pageUrl));
  }

  // getFilteredBooks(search_keyword) {
  //   if(search_keyword) {
  //   return this.restService.get(encodeURI('http://skunkworks.ignitesol.com:8000/books/?mime_type=image&search='+search_keyword));
  // } 
  // return EMPTY;


  getPokeMonInfo(id) {
    return this.restService.get(encodeURI('https://pokeapi.co/api/v2/pokemon/'+id+'/'));
  }

}
