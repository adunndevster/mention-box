import { Injectable, signal, WritableSignal } from '@angular/core';
import { Handle } from '../../models/types';
import { axiosInstance } from './api';

@Injectable({
  providedIn: 'root'
})
export class HandlesService {
  
  handles:WritableSignal<Handle[]> = signal([])

  constructor() { }

  refreshHandles = async() =>
  {
    try {
      const response = await axiosInstance.get<Handle[]>('/handles');
      if(this.handles().length === 0) this.handles.set(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }
}
