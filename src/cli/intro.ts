let figlet = require('figlet');
let chalk = require('chalk');

interface IIntro {
    show(msg:string, cb:any): boolean;
}
 
class Intro implements IIntro {

    show(msg:string, cb:any):boolean {

        figlet(msg, (err:string, data:string) => {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk.yellow(data));
            cb();
        });
    
        return true;

    }

}

export {Intro};
