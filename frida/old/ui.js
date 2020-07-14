var ctx = {};



//hook(
//0x1620ACC //showdamageui
//,{
//    onEnter: function (args) {
//        var pos = this.context.x2;
//        console.log(pos);
//    }
//});

var addr;
var data;

data = Memory.alloc(0x8);
console.log(data.toString());
var tmp = new Int64(data.toString());
data.writeS64(tmp);
tmp = data.readU64();

addr = Memory.alloc(Process.pageSize);
int_addr = new Int64(addr.toString());
Memory.patchCode(addr, Process.pageSize , function (code) {
    var cw = new Arm64Writer(code, { pc: addr });
    //cw.putAddRegRegImm('x0', 'x0', data.toInt32());
    //cw.putInstruction(0xaa1f03e0); //e0 03 1f aa     mov x0,xzr
    //cw.putInstruction(0xaa1c03e0); //e0 03 1c aa     mov x0,x28
    //cw.putInstruction(0x1e260000); //00 00 26 1e     fmov w0,s0
    //cw.putInstruction(0x910003e0); //e0 03 00 91     mov x0,sp
    //cw.putInstruction(0xaa0003e1); //e1 03 00 aa     mov x1,x0
    //cw.putMovRegReg('x1', 'xzr');
    //cw.putAdrpRegAddress('x0', rdata);
    cw.putLdrRegU64('x0', tmp);
    cw.putStrRegRegOffset('x2', 'x0', 0);
    //cw.putInstruction(0xd1008000); //00 80 00 d1     sub x0,x0,#0x20
    //cw.putInstruction(0xf9000001); //01 00 00 f9     str x1,[x0]

    //cw.putInstruction(0xf9000000); //00 00 00 f9     str x0,[x0]
    //cw.putInstruction(0xf800c000); //00 0c 00 f8     str x0,[x0, #0x0]!
    //cw.putInstruction(0xf9008000); //00 08 00 f9     str x0,[x0, #0x10]
    //cw.putInstruction(0xaa1f03e0); //e0 03 1f aa     mov x0,xzr
    //cw.putInstruction(0xf9008000); //00 04 00 f9     str x0,[x0, #0x8]

    //cw.putInstruction(0xbd0013e0); //e0 13 00 bd     str s0,[sp, #0x10]
    //cw.putInstruction(0xd10043ff); //ff 43 00 d1     add sp, sp, #0x10
    //cw.putInstruction(0x1e2703e0); //e0 03 27 1e     fmov s0,wzr
    //cw.putInstruction(0x1e2c1000); //00 10 2c 1e     fmov s0,0x3f000000 //0.5

    //cw.putInstruction(0x910003e0); //e0 03 00 91     mov x0,sp

    cw.putInstruction(0x6dbb2beb); //eb 2b bb 6d     stp d11,d10,[sp, #local_50]!
    cw.putBrReg()
    //cw.putRet();
    cw.flush();
});
var test = new NativeFunction(addr, 'uint64', []);

addr = ilbase.add(0x17e5314);
Memory.patchCode(addr, Process.pageSize , function (code) {
    var cw = new Arm64Writer(code, { pc: addr });
    data.writeS64();
    cw.putLdrRegU64('x0', tmp);
    cw.putBrReg()
});


//hook(
////0x17E39CC //setup
////0x1620ACC //showdamageui
////0x017e0ba8 //df setalpha
//0x017e5314 //duc setalpha
//,{
//    onEnter: function (args) {
//        for (var i in this.context) {
//            console.log(i, ':', this.context[i])
//        }
//        var r = test();
//        console.log('ret:',ptr(r).toString());
//        console.log('x0:', this.context.x0);
//        console.log('sp:', this.context.sp);
//        //console.log(ptr(0x71d5737740).readInt());
//        //console.log(hexdump(ptr(0x71d5697740-0x100)));
//        //console.log(hexdump(ptr(0x71d5697740)));
//        console.log(hexdump(data));
//        //console.log(hexdump(ptr(this.context.sp)));
//    },
//    onLeave: function (ret) {
//    }
//});


if(1){
    // CharacterBase$$IsInvincibleOnHitCheck
    hook(offset.characterbase.isinvincibleonhitcheck, { 
        onEnter: function(args){
            var o_cb = offset.characterbase;
            var o_cha = offset.collisionhitattribute;

            var cb = args[0];          //characterbase owner
            var p_ct = cb.add(o_cb.charactertype); 
            var ct = p_ct.readInt();   //charactertype
            this.ct = ct;

            var cha = args[1];
            var ahet = cha.add(o_cha.actionhitexectype).readInt();
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(ret){
            if(this.ct == 0){
                if(this.ahet == 1){
                    ret.replace(1);
                }
            }
        }
    });
}


if(1){
    hook(
    offset.enemyctrl.setaiaction
    ,{
        onEnter: function(args){
            //console.log('onEnter:'+args[0]); //+args[0]);
            this.context.x1 = 0;
        },
        onLeave: function(ret){
        }
    });
}

