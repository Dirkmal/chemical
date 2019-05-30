export class Alert {
  message: string;
  type = {ok: 'info', good: 'success', bad: 'warning', error: 'danger'};
  dismissible = false;

  constructor(message: string, type: any, dismissible: boolean) {
    this.message = message;
    this.type = type;
    this.dismissible = dismissible;
  }
}
