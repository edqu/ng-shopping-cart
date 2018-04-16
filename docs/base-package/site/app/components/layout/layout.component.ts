import {Component, OnDestroy, OnInit} from '@angular/core';
import {TocService} from '../../shared/services/toc-service';
import {Subscription} from 'rxjs/Subscription';
import {RouteChangedEvent} from '../../shared/services/route-changed-event';

@Component({
  selector: 'doc-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  navbar: any[] = [];
  navbarOpen = true;
  needsSidebar = true;

  constructor(private tocService: TocService) {
  }

  ngOnInit() {
    this.navbar = this.tocService.getNavbarItems();
    const {data: current} = this.tocService.getCurrentState();
    this.updateNavbar(current);
    this.subscription = this.tocService.events.subscribe(evt => {
      if (evt instanceof RouteChangedEvent) {
        const {data} = evt;
        this.updateNavbar(data);
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  updateNavbar(data) {
    this.needsSidebar = !!data.topics;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}