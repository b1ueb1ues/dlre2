
var tfloat = [0x66,0x6c,0x6f,0x61,0x74];
function follow(p,offset){
    p = p.add(offset);
    p = p.readPointer();
    return p
}

function readfloatret(r){
    myp = Memory.alloc(4);
    myp.writeInt32(r.toInt32());
    return myp.readFloat();
}



var ilbase = Module.findBaseAddress('libil2cpp.so');
console.log('processid: '+Process.id);
console.log('ilbase: '+ilbase);


var pbuffer = 0;
var se = 0;
var offset = 0;
np = ilbase.add(0x01236578); //AttackHitFormatter$$Serialize
Interceptor.attach(np, {
    onEnter: function(args){
            pbuffer = args[1].readPointer();
            offset = args[2];
            pattackhit = args[3];
            dmg = follow(pattackhit,0x14);
            console.log('dmg:'+dmg);
            se = 1;
    },
    onLeave: function(retval){
            //console.log('buffer:'+pbuffer.readByteArray(0x20));
            len = retval.toInt32()+offset;
            console.log('buffer:\n'+hexdump(pbuffer.readByteArray(len)));
            se = 0;
    }
});


np = ilbase.add(0x01669dbc); //MessagePackBinary$$WriteInt32
var pb = 0;
Interceptor.attach(np, {
    onEnter: function(args){
            if(se){
                    pb = args[1];
                    console.log('offset:'+args[2]+' value:'+args[3]);
            }
    },
    onLeave: function(retval){
            if(se){
                    console.log('wibuffer:\n'+hexdump(pb.readPointer().readByteArray(0x100)));
            }
            se = 0;
    }
});


