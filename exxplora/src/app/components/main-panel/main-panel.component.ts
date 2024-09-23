import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'] 
})
export class MainPanelComponent implements AfterViewInit {
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  cards = [
    { title: 'Card Title 1', description: 'Short description 1', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' },
    { title: 'Card Title 2', description: 'Short description 2', backgroundImage: '../../assets/images/domain-card.jpg' }
  ];

  ngAfterViewInit() {
    this.cardContainer.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
            event.preventDefault();
            const scrollAmount = event.deltaY > 0 ? 100 : -100; 
            this.cardContainer.nativeElement.scrollLeft += scrollAmount; 
        }
    });
}
}
