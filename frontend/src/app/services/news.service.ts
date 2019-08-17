import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news = [];
  // baseUrl = 'http://localhost:3800'
  private baseUrl = "https://casperbotapii.herokuapp.com/";

  constructor(private http: HttpClient) { }

  listNews(){
    return this.http.get(`${this.baseUrl}/news`); 
  }

  listMocado(){
    return this.news;
  }

  saveNew(news){
    return this.http.post(`${this.baseUrl}/news`, news);  
  }

   updateNew(news){
       const { _id } =  news;
       
       if(!_id){
          return this.saveNew(news);
       }
       
       return this.http.post(`${this.baseUrl}/news/${_id}`, news);    
  }

  removeNew(news){
    const { _id } = news;    
    return this.http.delete<void>(`${this.baseUrl}/news/${_id}`);  
  }
}
