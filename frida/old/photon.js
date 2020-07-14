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

if(1){  // not called
np = ilbase.add(0x01873eb4);  // LoadBalancingPeer$$OpRaiseEvent
Interceptor.attach(np, {
    onEnter: function(args){
            eventcode = args[1];
            content = args[2];
            console.log('lbp:raise');
            console.log('eventcode: '+eventcode);
            console.log(hexdump(content.readByte(0x20)));
    },
    onLeave: function(retval){
    }
});
}

if(1){  //  not called
np = ilbase.add(0x0186ccc0);  // LoadBalancingClient$$OpRaiseEvent
Interceptor.attach(np, {
    onEnter: function(args){
            eventcode = args[1];
            content = args[2];
            console.log('lbc:raise');
            console.log('eventcode: '+eventcode);
            console.log(hexdump(content.readByte(0x20)));
    },
    onLeave: function(retval){
    }
});
}

