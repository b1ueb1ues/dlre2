
var tfloat = [0x66,0x6c,0x6f,0x61,0x74];
function follow(p,offset){
    p = p.add(offset);
    p = p.readPointer();
    return p
}

var myp=0;
myp = Memory.alloc(4);
function p2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function f2i(r){
    myp.writeFloat(r);
    return myp.readInt();
}



var ilbase = Module.findBaseAddress('a.out');
//console.log('processid: '+Process.id);
//console.log('ilbase: '+ilbase);
send('processid: '+Process.id);
send('ilbase: '+ilbase);

np = ilbase.add(0x7be);
Interceptor.attach(np, {
    onEnter: function(args){
        eax = this.context.rax;
        console.log('eax'+eax);
        //console.log('args[0]: '+args[0]);
       // console.log('timer: '+sfdt+'('+gsr+')');
    }
});



if(1){

'use strict';

var appModule = Process.enumerateModulesSync()[0];
var appStart = appModule.base;
var appEnd = appStart.add(appModule.size);

//var appStart = ilbase
//var appEnd = ilbase.add(0x900);

np = ilbase.add(0x7f1);
console.log(np);
console.log('threadid',Process.getCurrentThreadId());
console.log('processid',Process.id);
Stalker.follow(Process.getCurrentThreadId(), {
   // events: {
   //     call: true, // CALL instructions: yes please

   //     // Other events:
   //     ret: true, // RET instructions
   //     exec: false, // all instructions: not recommended as it's
   //                  //                   a lot of data
   //     block: true, // block executed: coarse execution trace
   //     compile: true // block compiled: useful for coverage
   // },
  ////onCallSummary: function (summary) {
  ////    console.log('test');
  ////},
   // onReceive: function (events) {
   //     console.log(Stalker.parse(events, {
   //           annotate: true, // to display the type of event
   //           stringify: true
   //             // to format pointer values as strings instead of `NativePointer`
   //             // values, i.e. less overhead if you're just going to `send()` the 
   //             // thing not actually parse the data agent-side
   //         }));
   // },

  
   //Advanced users: This is how you can plug in your own
   //                StalkerTransformer, where the provided
   //                function is called synchronously
   //                whenever Stalker wants to recompile
   //                a basic block of the code that's about
   //                to be executed by the stalked thread.
  
  transform: function (iterator) {
    var instruction = iterator.next();
  
    var startAddress = instruction.address;
    var isAppCode = startAddress.compare(appStart) >= 0 &&
        startAddress.compare(appEnd) === -1;
  
    do {
      if (isAppCode && instruction.mnemonic === 'call') {
        iterator.putCmpRegI32('eax', 0);
        iterator.putJccShortLabel('jb', 'nope', 'no-hint');
  
        iterator.putCmpRegI32('eax', 2);
        iterator.putJccShortLabel('ja', 'nope', 'no-hint');
  
        iterator.putCallout(onMatch);
  
        iterator.putLabel('nope');
      }
  
      iterator.keep();
    } while ((instruction = iterator.next()) !== null);
  }

});

function onMatch (context) {
  console.log('Match! pc=' + context.pc +
      ' rax=' + context.rax.toInt32());
}

}
