import fs from 'fs';
import events from 'events';

export class ConfigManager {
  data: any;
  watchfile: string;
  emitter: any;

  constructor(wf='/etc/fuku/config.json', listener=()=>{}) {
    this.data = {};
    this.watchfile = wf;
    this.emitter = new events.EventEmitter();
    this.emitter.on('fileupdate', listener);
    this.load();
    fs.watchFile(this.watchfile, () => {
      console.log('Config file changed: ' + new Date());
      this.load();
      this.emitter.emit('fileupdate');
    });
  }

  load() {
    try {
      var content = '' + fs.readFileSync(this.watchfile);
      this.data = JSON.parse(content);
    } catch (e) {
      console.log('Load error: ' + e);
    }
  }

  get(key: string) {
    return (this.data.hasOwnProperty(key) === true) ? this.data[key] : null;
  }

  getData() { return this.data; }
}
