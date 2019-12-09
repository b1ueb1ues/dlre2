var tfloat = [0x66,0x6c,0x6f,0x61,0x74];
var tstderr = [0x73,0x74,0x64,0x65,0x72,0x72];
function follow(p,offset){
    p = p.add(offset);
    p = p.readPointer();
    return p
}
function arrow(p,offset){
    p = p.add(offset);
    p = p.readPointer();
    return p
}
function arrowint(p,offset){
    p = p.add(offset);
    p = p.readInt();
    return p
}
function arrowfloat(p,offset){
    p = p.add(offset);
    p = p.readFloat();
    return p
}
function star(p){
    return p.readPointer()
}


var myp=0;
var mypp=0;
myp = Memory.alloc(4);
mypp = Memory.alloc(8);
function r2i(r){
    return r.toInt32();
}
function r2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function p2i(r){
    return r.toInt32();
}
function p2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function p2d(r){
    mypp.writeInt(r.toInt32());
    return mypp.readDouble();
}

function i2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function f2i(r){
    myp.writeFloat(r);
    return myp.readInt();
}

function i2d(r){
    mypp.writeInt(r.toInt32());
    return mypp.readDouble();
}



var ilbase = Module.findBaseAddress('libil2cpp.so');
if(0){
    console.log('processid: '+Process.id);
    console.log('ilbase: '+ilbase);
}else{
    send('processid: '+Process.id, tstderr);
    send('ilbase: '+ilbase, tstderr);
}

function hook(address, process){
    Interceptor.attach( ilbase.add(address) , process);
}


function bt(t){
    var b = Thread.backtrace(t.context);
    console.log('bt');
    for (var i in b) {
        console.log(ptr(b[i]).add(0-ilbase));
    }
}
