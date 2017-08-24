import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getallLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: number): Leader {
    return LEADERS.filter((ldr) => (ldr.id === id))[0];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter((Leader) => (Leader.featured))[0];
  }
}