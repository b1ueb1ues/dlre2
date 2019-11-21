var tfloat = [0x66,0x6c,0x6f,0x61,0x74];
function follow(p,offset){
    p = p.add(offset);
    p = p.readPointer();
    return p
}


var ilbase = Module.findBaseAddress('libil2cpp.so');
console.log('processid: '+Process.id);
console.log('ilbase: '+ilbase);



var gl = {};

if(1){
np = ilbase.add(0x01236578);  // AttackHitFormatter$$Serialize
Interceptor.attach(np, {
    onEnter: function(args){
            this.pb = args[1];
            this.offset = args[2];
            this.attackhit = args[3];
         console.log('ahf$serialized called from:\n' +
                Thread.backtrace(this.context, Backtracer.FUZZY));
    },
    onLeave: function(retval){
            console.log('buffer:');
            var ba = this.pb.readPointer().readByteArray(retval.toInt32()+this.offset.toInt32());
            console.log(hexdump(ba));
    }
});
}

