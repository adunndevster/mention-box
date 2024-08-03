import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Handle } from '../../models/types';

@Injectable({
  providedIn: 'root'
})
export class HandlesService {
  
  #http = inject(HttpClient);
  #handlesCache: Observable<Handle[]> | undefined;

  constructor() { }

  getHandles(): Observable<Handle[]>
  {
    if(this.#handlesCache) return this.#handlesCache

    this.#handlesCache = this.#http.get<Handle[]>("/api/handles");
    return this.#handlesCache;
  }
}
