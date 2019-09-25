import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import htmlToImage from 'html-to-image';

@Component({
  selector: 'app-contant',
  templateUrl: './contant.component.html',
  styleUrls: ['./contant.component.css']
})
export class ContantComponent implements OnInit {
  currentData: Object = {};
  currentIndex: number = 0;
  imgUrl: String[] = [];
  dataSet = [{
    "title": "Test text 12312312312312231231321",
    "text": "Herer is a tedsthgjkvaksdhjvskvhsbjvbhjsvdbahvbbjhjcsakcdhjscdhjscsak jkasdcbnakjsdc kjcasdckjlasdc klasjdc"
  }

  ]
  constructor(private ref: ChangeDetectorRef) {
    this.currentData = this.dataSet[this.currentIndex];
  }

  ngOnInit() {
    setTimeout(() => {
      this.setData(this.currentData)
    }, 500)

  }


  // for updating current slide changes 
  setData(obj) {
    let index = this.dataSet.findIndex((o) => o.title == obj['title'])
    this.dataSet[index].text = obj.text
    this.dataSet[index].title = obj.title
    this.createImage()

  }

  // create thumbnail for each new slipe or update current one
  createImage() {
    htmlToImage.toPng(document.querySelector("#pic-test"))
      .then((dataUrl) => {
        var img = new Image();
        img.src = dataUrl;
        this.imgUrl[this.currentIndex] = img.src;
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

// add new slide and create image thumbnail for slide 
  newSlideAdd() {
    this.dataSet.push({ title: '', text: '' });
    this.currentIndex = this.dataSet.length - 1
    this.currentData = this.dataSet[this.currentIndex]
    setTimeout(() => {
      this.createImage()
    }, 0);
  }

  // work on slide thumbnail click
  changeSlide(ind) {
    this.currentIndex = ind
    this.currentData = this.dataSet[this.currentIndex]
  }
}
