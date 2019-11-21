
var ctx = {};
np = ilbase.add(
0x006bb2bc
);   //calculationslip
Interceptor.attach(np, {
    onEnter: function(args){
        ctx.dc_cs = 1;
    },
    onLeave: function(retval){
        ctx.dc_cs = 0;
        console.log('calculationslip: '+readfloatret(retval) )
    }
});



np = ilbase.add(
    0x006b6b08
);   //calculationbd
Interceptor.attach(np, {
    onEnter: function(args){
        this.tis = args[0];
        this.cha = args[1];
        this.dst = args[2];
        this.ds = args[3];
    },
    onLeave: function(retval){
        type = this.ds.add(0x8).readU32();
        value = this.ds.add(0xc).readU32();
        iscrit = this.ds.add(0x10).readU8();
        ele = this.ds.add(0x14).readFloat();
        console.log('calculationbd_type: '+ type );
        //console.log('calculationbd_value: '+ value );
        console.log('calculationbd_iscrit: '+ iscrit );
        console.log('calculationbd_ele: '+ ele );
        console.log('calculationbd_ret: '+ readfloatret(retval) );
    }
});

    np = ilbase.add(offset.characterbase.get_attack);  // CharacterBase$$get_attack
    Interceptor.attach(np, {
        onEnter: function(args){
        },
        onLeave: function(retval){
            console.log('** '+retval.toInt32());
        }
    });


//np = ilbase.add(0x216fc74);  //random$$range (float)
//Interceptor.attach(np, {
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        if(ctx.dc_c){
//            rp = 1.0;
//            console.log('replace random(f,f): '+readfloatret(retval)+'->'+rp);
//            retval.replace(0x3f800000);
//        }
//        if(ctx.dc_cs){
//            rp = 1.0;
//            console.log('replace random(f,f): '+readfloatret(retval)+'->'+rp);
//            retval.replace(0x3f800000);
//        }
//    }
//});
