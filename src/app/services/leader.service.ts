import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getallLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((ldr) => (ldr.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((Leader) => (Leader.featured))[0]);
  }
}