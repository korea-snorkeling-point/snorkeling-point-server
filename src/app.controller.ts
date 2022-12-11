import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // Health check (on k8s ingress / vm instance lb)
  @Get('/')
  getHello() {
    return 'Hi!👋 Welcome to Snorkeling Point Server! 🤿';
  }
}
