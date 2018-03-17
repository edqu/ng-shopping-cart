import { Inject, Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { BrowserStorageCartService } from '../classes/browser-storage-cart.service';
import { BrowserStorageServiceConfiguration } from '../interfaces/browser-storage-service-options';
import { CART_ITEM_CLASS } from './item-class.token';
import { CART_SERVICE_CONFIGURATION } from './service-configuration.token';

@Injectable()
export class SessionStorageCartService<T extends CartItem> extends BrowserStorageCartService<T> {
  constructor(@Inject(CART_ITEM_CLASS) itemClass,  @Inject(CART_SERVICE_CONFIGURATION) configuration: BrowserStorageServiceConfiguration) {
    super(itemClass, configuration);
    this.storage = window.sessionStorage;
    this.restore();
  }
}
