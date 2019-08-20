import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  labels = ["Tema", "Titulo", "Descrição", "Imagem", "Link", " Gerenciar"];
  totalNews;
  displayNews = [];
  filteredNews = [];
  currentPage = 1;

  isModalOpen;
  modalTitle;
  modalNew;
  backupState;


  ngOnInit() {
    this.isModalOpen = false;
    this.listNews();
  }

  // ------------------------ search filter section ----------------------------------

  listNews() {
    this.newsService.listNews().subscribe(resp => {
      this.totalNews = resp;
      this.filteredNews = this.totalNews;
      this.setVisibleRows();
    })
  }

  setVisibleRows() {
    const start = 0;
    let end;

    if (this.currentPage * 10 <= this.filteredNews.length) {
      end = this.currentPage * 10
    } else {
      end = this.filteredNews.length;
    }

    this.displayNews = this.filteredNews.slice(start, end);
  }

  filterBy(event) {
    this.currentPage = 1;
    const input = (<HTMLInputElement>document.getElementById("search-btn")).value.toLowerCase();

    if (event.type == "click" || event.keyCode == 13) {

      if (input == "") {
        this.filteredNews = this.totalNews;

      } else if (event.type == "click" || event.keyCode == 13) {

        this.filteredNews = this.totalNews.filter(value => {
          const title = value.title.toLowerCase();
          return title === input || title.includes(input)
        });

      }
    }

    this.showLess();
  }

  showLess() {
    this.currentPage = 1;
    this.setVisibleRows();
  }

  showMore() {
    if (this.displayNews.length != this.filteredNews.length) {
      this.currentPage += 1;
      this.setVisibleRows();
    }
  }

  handleRemoveRow(event) {
    this.newsService.removeNew(event).subscribe(() => {
      this.totalNews = this.totalNews.filter(news => { return news._id != event._id });
      this.filteredNews = this.filteredNews.filter(news => { return news._id != event._id });
      this.setVisibleRows();
    })
  }

  // ------------------------ Modal behavior section ----------------------------------------

  openEditModal(event) {
    this.modalTitle = "Editar notícia";
    this.modalNew = event;
    this.isModalOpen = true;
  }

  openCreateModal() {
    this.modalTitle = "Adicionar notícia";
    this.clearFields();
    this.isModalOpen = true;
  }

  closeModal(values) {
    
    if (values) {
      if (values._id) {
        this.newsService.updateNew(values).subscribe(() => {
          this.isModalOpen = false;
        })

      } else {
        this.newsService.saveNew(values).subscribe(() => {
          this.listNews();
          this.isModalOpen = false;
        })
      }
    } else {
      this.isModalOpen = false;
    }
  }

  clearFields() {
    this.modalNew = {
      "title": "",
      "image": "",
      "description": "",
      "link": "",
      "topic": "esportes"
    };
  }


}
