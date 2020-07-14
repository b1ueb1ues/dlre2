
var ctx = {};

var invincible = 1;
var attack = 0;
var attack = 2000;


if(1){
hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        //console.log('** sp: '+args[1].toInt32());
        this.context.x1 = 20000;
    },
    onLeave: function(ret){
    }
});
}


if(1){  // control crit
hook(
offset.random.randomrangeint
,{  //random$$range (int)
    onEnter: function(args){
        var bt = Thread.backtrace(this.context);
        var dc_cbd = lib_base.add(
            offset.random.ret.rangeint_2_dc_cbd
        ).toString();
        var cbuf_ac  = lib_base.add(
            offset.random.ret.rangeint_2_cb_ac
        ).toString();  //characterbuff applycommon

        var caller = bt[0].toString()
        if (caller == dc_cbd) {
            this.dc_cbd = 1;
        } else if (caller == cbuf_ac){
            this.cbuf_ac = 1;
        }
        else{
            //console.log('rrii else:'+ptr(bt[0]).add(0-lib_base));
        }
    },
    onLeave: function(ret){
        if (this.dc_cbd ) {
            var replace = 65;
            console.log('rrri dc_cbd: '+r2i(ret)+'->'+replace);
            ret.replace(replace);
        }
        if (this.cbuf_ac ) {
            var replace = 35;
            console.log('rrri cb_ac: '+r2i(ret)+'->'+replace);
            ret.replace(replace);
        }
    }
});
}

if(0){
hook(
offset.random.rangefloat
,{  //random$$range float
    onEnter: function(args){
        this.spread = 0;
        var bt = Thread.backtrace(this.context)
        var dc_c = lib_base.add(
            offset.random.ret.rangefloat_2_dc_calculation
        ).toString();

        if (bt[0].toString() == dc_c) {
            var p1 = ptr(this.context.sp-128-16);
            var p2 = ptr(this.context.sp-128);
            //console.log('p1:'+p1.readFloat());
            //console.log('p2:'+p2.readFloat());
            p1.writeInt(0x3f800000);
            p2.writeInt(0x3f800000);
            console.log('replace randomfloat');
        }else{
            //console.log('rrf else:'+ptr(bt[0]).add(0-lib_base));
            //p1.writeInt(0x3f800000);
            //p2.writeInt(0x3f800000);
        }
    },
    onLeave: function(ret){
        if(0){
            console.log("dc_c");
            //for (var i in this.context) {
            //    console.log(i+":"+this.context[i]);
            //}
            var fp = ptr(this.context.fp);
            console.log("sp");
            var sp = ptr(this.context.sp-256);
            console.log(sp.readByteArray(256));
        }
    }
});
}


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


hook(
offset.maingameleavealonechecker.setleavealonetime
,{
    onEnter: function(args){
        this.tis = args[0];
        console.log('setleavealone');
    },
    onLeave: function(ret){
        tis = this.tis;
        tis.add(offset.maingameleavealonechecker.warnningtime)
            .writeFloat(100000);
        tis.add(offset.maingameleavealonechecker.exittime)
            .writeFloat(100000);
    }
});

if(invincible){
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
            var ahet = cha.add(o_cha.actionhitexectype).readInt();  // actionhitexectype
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(ret){
            if(this.ct == 0){
                if(this.ahet == 1){
                    ret.replace(1);
                }
                else if(this.ahet == 6){
                    ret.replace(1);
                }
            }
        }
    });
}

