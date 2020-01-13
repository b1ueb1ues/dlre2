var ctx = {};




//hook(0xb1be04,{  // CollisionHitAttribute$$get_DamageAdjustment
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//            console.log('dmgcoef: '+p2f(retval));
//    }
//});
//
//hook(0x00b1be2c,{  // CollisionHitAttribute$$get_ToBreakDmgRate
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//            console.log('toOdRate: '+p2f(retval));
//    }
//});

//747  980  0.1 2147  0.5 1400 0.7 1187 0.8 1120 0.9 1080  1.0 1067 
//0       2401
//0.01    2374
//0.025   2335
//0.05    2270
//0.1     2147
//0.2     1920
//0.3     1720
//0.4     1547
//0.5     1400
//0.6     1280
//0.7     1187
//0.8     1120
//0.9     1080
//1.0     1067
//
//hook(0xace650,{  // get_hprate
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        hprate = 1.0;
//        hprate = 0.5;
//        hprate = 1.0;
//        hprate = 0.1;
//        hprate = 0.7;
//        hprate = 0.5;
//        hprate = 0.4;
//        hprate = 0.0;
//        retval.replace(f2i(hprate));
//    }
//});

//hook(0x00cfec0c,{  // get_chainnum
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        hits = 30;
//        //console.log('get_chainnum:'+retval+'->'+hits)
//        retval.replace(hits);
//    }
//});

////CollisionChecker$$ExecHit
//hook(0x00b15544,{  
//    onEnter: function(args){
//        ctx.cc_eh = 1;
//    },
//    onLeave: function(retval){
//        ctx.cc_eh = 0;
//    }
//});
//
////CollisionChecker$$ExecutionCharacterHit
//hook(0x00b1988c,{  
//    onEnter: function(args){
//        ctx.cc_ech = 1;
//    },
//    onLeave: function(retval){
//        ctx.cc_ech = 0;
//    }
//});




if(1){
hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        console.log('** sp: '+args[1].toInt32());
        this.context.x1 = 20000;
    },
    onLeave: function(retval){
    }
});
}


if(0){
hook(
offset.random.rangeint
,{  //random$$range int
    onEnter: function(args){
    },
    onLeave: function(retval){
        if(ctx.a){
            var rp = 101;
            console.log('randomint int : '+retval.toInt32()+'->'+rp);
            retval.replace(rp);
        }
    }
});
}

if(1){
hook(
offset.random.randomrangeint
,{  //random$$randomrangeint int
    onEnter: function(args){
    },
    onLeave: function(retval){
        //if(ctx.cc_eh){
        //    rp = 34;
        //    console.log('range int : '+retval.toInt32()+'->'+rp);
        //    retval.replace(rp);
        //}
        if(ctx.cc_ech){
            var rp = 14;
            console.log('range int : '+retval.toInt32()+'->'+rp);
            if(retval.toInt32() > rp ){
                retval.replace(rp);
            }
        }
    }
});
}

//var mmin = ilbase.add(0x03612630); //0.95
//var mmax = ilbase.add(0x0360f040); //1.05
//console.log(mmin.toString());
//console.log(mmin.readByteArray(4));
//console.log(mmax.toString());
//console.log(mmax.readByteArray(8));
//mmin.writeFloat(1.0);
//mmax.writeFloat(1.0);
//7f703c757c

//var s0 = ilbase.add(0x017dfd40);
//var s1 = ilbase.add(0x017dfd44);
//console.log(s0.readByteArray(32));
//console.log(s1.readByteArray(32));
//var s0writer = new Arm64Writer(s0);
//var s1writer = new Arm64Writer(s1);
//s0writer.putInstruction(0x1e2e1000);
//s1writer.putInstruction(0x1e2e1001);


function spread() {
    var impl = Memory.alloc(Process.pageSize);
    Memory.patchCode(impl, Process.pageSize, function (code) {
        var arm64Writer = new Arm64Writer(code, { pc: impl });
        arm64Writer.putInstruction(0x1e2e1000);
        arm64Writer.putInstruction(0x1e2e1001);
        arm64Writer.putInstruction(0xaa1f03e1);
        arm64Writer.putInstruction(0xd65f03c0);
    });
    var f = new NativeFunction(impl, 'void', []);
    f();

}

if(0){
hook(
0x02ad02b8
,{  //random$$range (int)
    onEnter: function(args){

        var bt = Thread.backtrace(this.context);
        var dc_cbd = ilbase.add(0x017e0eb4).toString();
        if (bt[0].toString() == dc_cbd) {
            this.dc_cbd = 1;
            console.log('->->->->');
            console.log('//////rangeint in calculatebasedamage');
            console.log(args[0]);
            console.log(args[1]);
        }
    },
    onLeave: function(ret){
        if (this.dc_cbd ) {
            console.log('ret: '+ret);
        }
    }
});
}

if(1){
hook(
offset.random.rangefloat
,{  //random$$range float
    onEnter: function(args){
        this.spread = 0;
        var bt = Thread.backtrace(this.context)
        var dc_c = ilbase.add(
            offset.random.ret.rangefloat_2_dc_calculation
        ).toString();
        if (bt[0].toString() == dc_c) {
            var p1 = ptr(this.context.sp-128-16);
            var p2 = ptr(this.context.sp-128);
            //console.log('p1:'+p1.readFloat());
            //console.log('p2:'+p2.readFloat());
            p1.writeInt(0x3f800000);
            p2.writeInt(0x3f800000);

          //  console.log("dc_c");
          //  //for (var i in this.context) {
          //  //    console.log(i+":"+this.context[i]);
          //  //}
          //  console.log("sp");
          //  var sp = ptr(this.context.sp-128-16);
          //  var fp = ptr(this.context.fp);
          //  console.log(sp.readByteArray(256));


        }
    },
    onLeave: function(retval){
    }
});
}


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
        onLeave: function(retval){
            if(this.ct == 0){
                if(this.ahet == 1){
                    retval.replace(1);
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
