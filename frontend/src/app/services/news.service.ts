import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news = [];
  
  private baseUrl = "https://casperbotapii.herokuapp.com";
  // private baseUrl = "http://localhost:3800";
  
  private headers =  { headers: {
    'authorization': localStorage.getItem('app_token')}
   }

  constructor(private http: HttpClient) { }

  listNews(){    
    return this.http.get(`${this.baseUrl}/news`, this.headers)
  }

  saveNew(news){
    return this.http.post(`${this.baseUrl}/news`, news, this.headers);
  }

   updateNew(news){
       const { _id } =  news;
       
       if(!_id){
          return this.saveNew(news);
       }
       
       return this.http.put(`${this.baseUrl}/news/${_id}`, news, this.headers);    
  }

  removeNew(news){
    const { _id } = news;    
    return this.http.delete<void>(`${this.baseUrl}/news/${_id}`, this.headers);  
  }

}
