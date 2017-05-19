import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class ApiService {

  constructor(public user: UserService) { }
}
